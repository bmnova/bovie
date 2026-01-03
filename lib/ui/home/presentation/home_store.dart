import 'dart:math';
import 'package:mobx/mobx.dart';
import 'package:bovie/core/domain/movie.dart';
import 'package:bovie/core/domain/movies_repository.dart';
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

  _HomeStoreBase(
    this._moviesRepository,
    this._onboardingRepository,
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
  bool isLoading = false;

  @observable
  bool isLoadingMore = false;

  @observable
  bool hasMore = true;

  @observable
  String? error;

  // Track current page for pagination
  int _currentPage = 1;
  
  // Store all loaded movies (before shuffle) for pagination
  final Set<int> _loadedMovieIds = {};

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
  Future<List<Movie>> _loadMoviesFromSource(ForYouSourceType sourceType) async {
    return _loadMoviesFromSourceWithPage(sourceType, page: 1);
  }

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
}

