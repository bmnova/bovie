import 'package:mobx/mobx.dart';
import 'package:bovie/features/onboarding/domain/movie.dart';
import 'package:bovie/features/onboarding/domain/get_popular_movies_usecase.dart';

part 'onboarding_movies_store.g.dart';

class OnboardingMoviesStore = _OnboardingMoviesStoreBase with _$OnboardingMoviesStore;

abstract class _OnboardingMoviesStoreBase with Store {
  final GetPopularMovies _getPopularMovies;

  _OnboardingMoviesStoreBase(this._getPopularMovies);

  @observable
  ObservableList<Movie> movies = ObservableList<Movie>();

  @observable
  ObservableSet<int> selectedMovieIds = ObservableSet<int>();

  @observable
  bool isLoading = false;

  @observable
  String? error;

  @observable
  int currentPage = 1;

  @observable
  bool hasMore = true;

  @action
  Future<void> fetchNextPage() async {
    if (isLoading || !hasMore) return;

    isLoading = true;
    error = null;

    final result = await _getPopularMovies(currentPage);

    if (result.isSuccess) {
      final newMovies = result.dataOrNull!;
      if (newMovies.isEmpty) {
        hasMore = false;
      } else {
        movies.addAll(newMovies);
        currentPage++;
      }
    } else {
      error = result.errorOrNull?.message ?? 'Failed to load movies';
    }

    isLoading = false;
  }

  @action
  void toggleSelection(int movieId) {
    if (selectedMovieIds.contains(movieId)) {
      selectedMovieIds.remove(movieId);
    } else {
      if (selectedMovieIds.length < 3) {
        selectedMovieIds.add(movieId);
      } else {
        // Limit reached, could trigger a side effect or show a message
        error = 'You can select up to 3 movies';
      }
    }
  }

  @computed
  bool get canContinue => selectedMovieIds.length <= 3 && selectedMovieIds.isNotEmpty;
}
