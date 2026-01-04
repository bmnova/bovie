import 'package:mobx/mobx.dart';
import 'package:bovie/core/domain/genre.dart';
import 'package:bovie/core/domain/get_genres_usecase.dart';
import 'package:bovie/ui/onboarding/domain/onboarding_repository.dart';
import 'package:bovie/ui/home/presentation/home_store.dart';

part 'onboarding_genres_store.g.dart';

class OnboardingGenresStore = _OnboardingGenresStoreBase with _$OnboardingGenresStore;

abstract class _OnboardingGenresStoreBase with Store {
  final GetGenres _getGenres;
  final OnboardingRepository _onboardingRepository;
  final HomeStore _homeStore;

  _OnboardingGenresStoreBase(
    this._getGenres,
    this._onboardingRepository,
    this._homeStore,
  );

  @observable
  ObservableList<Genre> genres = ObservableList<Genre>();

  @observable
  ObservableSet<int> selectedGenreIds = ObservableSet<int>();

  @observable
  bool isLoading = false;

  @observable
  String? error;

  @observable
  bool onboardingFinished = false;

  @action
  Future<void> fetchGenres() async {
    runInAction(() {
      isLoading = true;
      error = null;
    });

    final result = await _getGenres();

    runInAction(() {
      if (result.isSuccess) {
        genres.clear();
        genres.addAll(result.dataOrNull!);
      } else {
        error = result.errorOrNull?.message ?? 'Failed to load genres';
      }
      isLoading = false;
    });
  }

  @action
  void toggleSelection(int genreId) {
    if (selectedGenreIds.contains(genreId)) {
      selectedGenreIds.remove(genreId);
    } else {
      if (selectedGenreIds.length < 2) {
        selectedGenreIds.add(genreId);
      } else {
        error = 'You can select up to 2 genres';
      }
    }
  }

  @action
  Future<void> completeOnboarding() async {
    isLoading = true;
    // Persist onboarding status and selections
    await _onboardingRepository.setOnboardingComplete(true);
    await _onboardingRepository.setSelectedGenreIds(selectedGenreIds.toList());

    // Load homepage movies and categories after onboarding is complete
    // This ensures homepage has data when user navigates from paywall
    await Future.wait([
      _homeStore.loadForYouMovies(),
      _homeStore.loadCategories(),
    ]);

    onboardingFinished = true;
    isLoading = false;
  }

  @computed
  bool get canContinue => selectedGenreIds.isNotEmpty && selectedGenreIds.length <= 2;
}
