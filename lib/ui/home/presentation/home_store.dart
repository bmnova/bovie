import 'package:mobx/mobx.dart';
import 'package:bovie/core/domain/movie.dart';
import 'package:bovie/core/domain/get_popular_movies_usecase.dart';
import 'package:bovie/ui/onboarding/domain/onboarding_repository.dart';

part 'home_store.g.dart';

class HomeStore = _HomeStoreBase with _$HomeStore;

abstract class _HomeStoreBase with Store {
  final GetPopularMovies _getPopularMovies;
  final OnboardingRepository _onboardingRepository;

  _HomeStoreBase(
    this._getPopularMovies,
    this._onboardingRepository,
  );

  @observable
  ObservableList<Movie> forYouMovies = ObservableList<Movie>();

  @observable
  bool isLoading = false;

  @observable
  String? error;

  @action
  Future<void> loadForYouMovies() async {
    isLoading = true;
    error = null;

    try {
      // Get selected genre IDs from onboarding
      final selectedGenreIds = await _onboardingRepository.getSelectedGenreIds();
      
      // For now, fetch popular movies
      // TODO: Implement personalized recommendations based on selected genres/movies
      final result = await _getPopularMovies(1);

      if (result.isSuccess) {
        forYouMovies.clear();
        // Take first 5 movies for "For You" section
        forYouMovies.addAll(result.dataOrNull!.take(5));
      } else {
        error = result.errorOrNull?.message ?? 'Failed to load movies';
      }
    } catch (e) {
      error = e.toString();
    } finally {
      isLoading = false;
    }
  }
}

