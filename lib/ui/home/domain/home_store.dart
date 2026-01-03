import 'dart:math';
import 'package:mobx/mobx.dart';
import 'package:bovie/core/domain/movie.dart';
import 'package:bovie/core/domain/genre.dart';
import 'package:bovie/core/domain/movies_repository.dart';
import 'package:bovie/core/domain/get_genres_usecase.dart';
import 'package:bovie/ui/onboarding/domain/onboarding_repository.dart';

part 'home_store.g.dart';

/// Source types for "For You" section recommendations
/// 
/// Controls which recommendation sources are used to populate the "For You" section.
/// Update the [_activeForYouSources] list to change which sources are active.
enum ForYouSourceType {
  /// Movies based on genres of selected movies during onboarding
  selectedMoviesGenres,
  
  /// Movies based on selected genres during onboarding
  selectedGenres,
  
  /// Movies similar to selected movies during onboarding
  similarToSelectedMovies,
}

class HomeStore = _HomeStoreBase with _$HomeStore;

abstract class _HomeStoreBase with Store {
  final MoviesRepository _moviesRepository;
  final OnboardingRepository _onboardingRepository;
  final GetGenres _getGenres;

  _HomeStoreBase(
    this._moviesRepository,
    this._onboardingRepository,
    this._getGenres,
  );

  /// Active source types for "For You" section
  /// 
  /// Update this list to change which recommendation sources are used.
  /// The movies from all active sources will be mixed together.
  static const List<ForYouSourceType> _activeForYouSources = [
    ForYouSourceType.selectedMoviesGenres,
    ForYouSourceType.selectedGenres,
    ForYouSourceType.similarToSelectedMovies,
  ];

  /// Maximum number of movies to display in "For You" section
  /// 
  /// Update this value to change how many movies are shown.
  /// The movies are shuffled and the first N movies are displayed.
  static const int maxForYouMovies = 5;

  @observable
  ObservableList<Movie> forYouMovies = ObservableList<Movie>();

  @observable
  ObservableList<Genre> categories = ObservableList<Genre>();

  @observable
  ObservableMap<int, ObservableList<Movie>> categoryMovies = ObservableMap<int, ObservableList<Movie>>();

  @observable
  int? activeCategoryId; // For scroll tracking

  @observable
  double categoryFeedBottomPadding = 0.0; // Dynamic bottom padding based on main scroll


  @observable
  bool isLoading = false;

  @observable
  bool isLoadingMore = false;

  @observable
  bool isLoadingCategories = false;

  @observable
  bool hasMore = true;

  @observable
  String? error;

  // Track current page for pagination
  int _currentPage = 1;
  
  // Store all loaded movies (before shuffle) for pagination
  final Set<int> _loadedMovieIds = {};

  // Track pagination state for each category
  final Map<int, int> _categoryPages = {}; // Current page for each category
  final Map<int, bool> _categoryHasMore = {}; // Has more movies for each category
  final Map<int, bool> _categoryLoadingMore = {}; // Is loading more for each category

  /// Reset all onboarding selections and reload movies
  @action
  Future<void> resetAllSelections() async {
    await _onboardingRepository.resetAllSelections();
    // Clear current movies and reload
    forYouMovies.clear();
    _loadedMovieIds.clear();
    _currentPage = 1;
    hasMore = true;
    await loadForYouMovies();
  }

  @action
  Future<void> loadForYouMovies() async {
    isLoading = true;
    error = null;

    try {
      final allMovies = <Movie>[];

      // Load movies from all active sources
      for (final sourceType in _activeForYouSources) {
        final movies = await _loadMoviesFromSource(sourceType);
        allMovies.addAll(movies);
      }

      if (allMovies.isEmpty) {
        // Fallback to popular movies if no recommendations found
        final result = await _moviesRepository.getPopularMovies(1);
        if (result.isSuccess) {
          allMovies.addAll(result.dataOrNull!.take(maxForYouMovies));
        } else {
          error = result.errorOrNull?.message ?? 'Failed to load movies';
        }
      }

      // Remove duplicates (by movie ID) and shuffle
      final uniqueMovies = <int, Movie>{};
      for (final movie in allMovies) {
        uniqueMovies[movie.id] = movie;
      }

      // Shuffle and add movies
      final shuffled = uniqueMovies.values.toList()..shuffle(Random());
      final moviesToShow = shuffled.take(maxForYouMovies).toList();
      
      // Use runInAction to ensure reactive updates
      runInAction(() {
        forYouMovies.clear();
        forYouMovies.addAll(moviesToShow);
        
        // Track loaded movie IDs
        _loadedMovieIds.clear();
        _loadedMovieIds.addAll(forYouMovies.map((m) => m.id));
        
        // Reset pagination
        _currentPage = 1;
        hasMore = shuffled.length >= maxForYouMovies;
      });
    } catch (e) {
      error = e.toString();
    } finally {
      isLoading = false;
    }
  }

  /// Load more movies when user scrolls to the end
  @action
  Future<void> loadMoreForYouMovies() async {
    if (isLoadingMore || !hasMore) return;

    isLoadingMore = true;
    error = null;

    try {
      _currentPage++;
      final allMovies = <Movie>[];

      // Load next page from all active sources
      for (final sourceType in _activeForYouSources) {
        final movies = await _loadMoviesFromSourceWithPage(sourceType, page: _currentPage);
        allMovies.addAll(movies);
      }

      if (allMovies.isEmpty) {
        hasMore = false;
      } else {
        // Filter out already loaded movies
        final newMovies = allMovies.where((m) => !_loadedMovieIds.contains(m.id)).toList();
        
        if (newMovies.isEmpty) {
          hasMore = false;
        } else {
          // Shuffle and add
          newMovies.shuffle(Random());
          final moviesToAdd = newMovies.take(maxForYouMovies).toList();
          
          // Use runInAction to ensure reactive updates
          runInAction(() {
            forYouMovies.addAll(moviesToAdd);
            _loadedMovieIds.addAll(moviesToAdd.map((m) => m.id));
            hasMore = newMovies.length >= maxForYouMovies;
          });
        }
      }
    } catch (e) {
      error = e.toString();
    } finally {
      isLoadingMore = false;
    }
  }

  /// Load movies from a specific source type
  Future<List<Movie>> _loadMoviesFromSource(ForYouSourceType sourceType) async => _loadMoviesFromSourceWithPage(sourceType, page: 1);

  /// Load movies from a specific source type with pagination
  Future<List<Movie>> _loadMoviesFromSourceWithPage(ForYouSourceType sourceType, {int page = 1}) async {
    switch (sourceType) {
      case ForYouSourceType.selectedMoviesGenres:
        return await _loadMoviesFromSelectedMoviesGenres(page: page);
      case ForYouSourceType.selectedGenres:
        return await _loadMoviesFromSelectedGenres(page: page);
      case ForYouSourceType.similarToSelectedMovies:
        return await _loadSimilarToSelectedMovies(page: page);
    }
  }

  /// Load movies based on genres of selected movies during onboarding
  /// 
  /// Note: Currently uses selected genres as a proxy since we don't have
  /// movie details API to get genres of selected movies.
  Future<List<Movie>> _loadMoviesFromSelectedMoviesGenres({int page = 1}) async {
    final selectedGenreIds = await _onboardingRepository.getSelectedGenreIds();
    if (selectedGenreIds.isEmpty) return [];

    // Use all selected genres combined
    final allMovies = <Movie>[];
    for (final genreId in selectedGenreIds) {
      final result = await _moviesRepository.discoverByGenre(genreId, page: page);
      if (result.isSuccess) {
        allMovies.addAll(result.dataOrNull!);
      }
    }
    return allMovies;
  }

  /// Load movies based on selected genres during onboarding
  Future<List<Movie>> _loadMoviesFromSelectedGenres({int page = 1}) async {
    final selectedGenreIds = await _onboardingRepository.getSelectedGenreIds();
    if (selectedGenreIds.isEmpty) return [];

    final allMovies = <Movie>[];
    for (final genreId in selectedGenreIds) {
      final result = await _moviesRepository.discoverByGenre(genreId, page: page);
      if (result.isSuccess) {
        allMovies.addAll(result.dataOrNull!);
      }
    }
    return allMovies;
  }

  /// Load movies similar to selected movies during onboarding
  Future<List<Movie>> _loadSimilarToSelectedMovies({int page = 1}) async {
    final selectedMovieIds = await _onboardingRepository.getSelectedMovieIds();
    if (selectedMovieIds.isEmpty) return [];

    final allMovies = <Movie>[];
    for (final movieId in selectedMovieIds) {
      final result = await _moviesRepository.getSimilarMovies(movieId, page: page);
      if (result.isSuccess) {
        allMovies.addAll(result.dataOrNull!);
      }
    }
    return allMovies;
  }

  /// Load all categories
  @action
  Future<void> loadCategories() async {
    if (isLoadingCategories) return; // Prevent multiple simultaneous loads
    
    isLoadingCategories = true;
    error = null;

    try {
      final result = await _getGenres();
      if (result.isSuccess) {
        final genresList = result.dataOrNull!;
        runInAction(() {
          categories.clear();
          categories.addAll(genresList);
          // Set first category as active by default
          if (categories.isNotEmpty && activeCategoryId == null) {
            activeCategoryId = categories.first.id;
          }
        });
        // Load movies for each category
        for (final genre in genresList) {
          await loadMoviesForCategory(genre.id);
        }
      } else {
        runInAction(() {
          error = result.errorOrNull?.message ?? 'Failed to load categories';
        });
      }
    } catch (e) {
      runInAction(() {
        error = e.toString();
      });
    } finally {
      runInAction(() {
        isLoadingCategories = false;
      });
    }
  }

  /// Load movies for a specific category (initial 9 movies as per README)
  @action
  Future<void> loadMoviesForCategory(int genreId) async {
    try {
      final result = await _moviesRepository.discoverByGenre(genreId, page: 1);
      if (result.isSuccess) {
        final allMovies = result.dataOrNull!;
        // Use all movies from the first page (usually 20) to ensure horizontal scrollability in 3-row layout
        final movies = allMovies.toList(); 
        runInAction(() {
          categoryMovies[genreId] = ObservableList<Movie>.of(movies);
          _categoryPages[genreId] = 1;
          _categoryHasMore[genreId] = allMovies.length >= 20; // TMDB default page size is 20
          _categoryLoadingMore[genreId] = false;
        });
      }
    } catch (e) {
      // Silently fail for individual category loads
    }
  }

  /// Load more movies for a specific category (infinite scroll)
  @action
  Future<void> loadMoreMoviesForCategory(int genreId) async {
    // Check if already loading or no more movies
    if (_categoryLoadingMore[genreId] == true || _categoryHasMore[genreId] == false) {
      return;
    }

    _categoryLoadingMore[genreId] = true;

    try {
      final currentPage = _categoryPages[genreId] ?? 1;
      final nextPage = currentPage + 1;
      
      final result = await _moviesRepository.discoverByGenre(genreId, page: nextPage);
      if (result.isSuccess) {
        final newMovies = result.dataOrNull!;
        
        if (newMovies.isEmpty) {
          runInAction(() {
            _categoryHasMore[genreId] = false;
            _categoryLoadingMore[genreId] = false;
          });
        } else {
          runInAction(() {
            final currentMovies = categoryMovies[genreId] ?? ObservableList<Movie>();
            currentMovies.addAll(newMovies);
            categoryMovies[genreId] = currentMovies;
            _categoryPages[genreId] = nextPage;
            _categoryHasMore[genreId] = newMovies.length >= 20; // Assume has more if full page returned
            _categoryLoadingMore[genreId] = false;
          });
        }
      } else {
        runInAction(() {
          _categoryHasMore[genreId] = false;
          _categoryLoadingMore[genreId] = false;
        });
      }
    } catch (e) {
      runInAction(() {
        _categoryHasMore[genreId] = false;
        _categoryLoadingMore[genreId] = false;
      });
    }
  }

  /// Check if more movies are being loaded for a category
  bool isCategoryLoadingMore(int genreId) => _categoryLoadingMore[genreId] ?? false;

  /// Check if category has more movies to load
  bool categoryHasMore(int genreId) => _categoryHasMore[genreId] ?? false;

  /// Set active category (for scroll tracking)
  @action
  void setActiveCategory(int? categoryId) => activeCategoryId = categoryId;

  /// Update bottom padding for Category Feed based on main scroll position
  /// 
  /// Linear interpolation: 0 when scroll is at top (0), categorySectionHeight when at max
  @action
  void updateCategoryFeedBottomPadding({
    required double scrollPosition,
    required double maxScroll,
    required double categorySectionHeight,
  }) {
    if (maxScroll > 0) {
      final progress = (scrollPosition / maxScroll).clamp(0.0, 1.0);
      categoryFeedBottomPadding = progress * categorySectionHeight;
    } else {
      categoryFeedBottomPadding = 0.0;
    }
  }

}

