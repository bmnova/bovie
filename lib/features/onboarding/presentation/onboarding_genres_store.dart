import 'package:mobx/mobx.dart';
import 'package:bovie/features/onboarding/domain/genre.dart';
import 'package:bovie/features/onboarding/domain/get_genres_usecase.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'onboarding_genres_store.g.dart';

class OnboardingGenresStore = _OnboardingGenresStoreBase with _$OnboardingGenresStore;

abstract class _OnboardingGenresStoreBase with Store {
  final GetGenres _getGenres;
  final SharedPreferences _prefs;

  _OnboardingGenresStoreBase(this._getGenres, this._prefs);

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
    isLoading = true;
    error = null;

    final result = await _getGenres();

    if (result.isSuccess) {
      genres.clear();
      genres.addAll(result.dataOrNull!);
    } else {
      error = result.errorOrNull?.message ?? 'Failed to load genres';
    }

    isLoading = false;
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
    await _prefs.setBool('onboarding_complete', true);
    await _prefs.setStringList('selected_genres', selectedGenreIds.map((e) => e.toString()).toList());
    
    onboardingFinished = true;
    isLoading = false;
  }

  @computed
  bool get canContinue => selectedGenreIds.isNotEmpty && selectedGenreIds.length <= 2;
}
