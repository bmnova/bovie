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
    print('[OnboardingGenresStore] fetchGenres() called');
    runInAction(() {
      isLoading = true;
      error = null;
      print('[OnboardingGenresStore] isLoading set to true, genres count: ${genres.length}');
    });

    final result = await _getGenres();
    print('[OnboardingGenresStore] getGenres() result: isSuccess=${result.isSuccess}, dataOrNull length=${result.dataOrNull?.length ?? 0}');

    runInAction(() {
      if (result.isSuccess) {
        genres.clear();
        genres.addAll(result.dataOrNull!);
        print('[OnboardingGenresStore] Genres added: ${genres.length} genres');
        print('[OnboardingGenresStore] First genre: ${genres.isNotEmpty ? genres.first.name : "N/A"}');
      } else {
        error = result.errorOrNull?.message ?? 'Failed to load genres';
        print('[OnboardingGenresStore] Error: $error');
      }
      isLoading = false;
      print('[OnboardingGenresStore] isLoading set to false, genres count: ${genres.length}');
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
    print('[OnboardingGenresStore] Loading homepage movies and categories...');
    await Future.wait([
      _homeStore.loadForYouMovies(),
      _homeStore.loadCategories(),
    ]);
    print('[OnboardingGenresStore] Homepage data loaded successfully');

    onboardingFinished = true;
    isLoading = false;
  }

  @computed
  bool get canContinue => selectedGenreIds.isNotEmpty && selectedGenreIds.length <= 2;
}
