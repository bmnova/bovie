import 'package:mobx/mobx.dart';
import 'package:bovie/features/onboarding/domain/get_genres_usecase.dart';
import 'package:bovie/app/router/router.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'splash_store.g.dart';

class SplashStore = _SplashStoreBase with _$SplashStore;

abstract class _SplashStoreBase with Store {
  final GetGenres _getGenres;
  final SharedPreferences _prefs;

  _SplashStoreBase(this._getGenres, this._prefs);

  @observable
  bool isLoading = true;

  @observable
  String? error;

  @action
  Future<void> init() async {
    try {
      isLoading = true;
      error = null;

      // 1. Prefetch Genres
      final genresResult = await _getGenres();
      if (genresResult.isFailure) {
        error = 'Failed to load initial data';
        return;
      }

      // 2. Check Onboarding
      final isComplete = _prefs.getBool('onboarding_complete') ?? false;
      
      // Delay for splash visibility
      await Future.delayed(const Duration(seconds: 2));

      _nextRoute = isComplete ? AppRoutes.home : AppRoutes.onboardingMovies;
    } catch (e) {
      error = e.toString();
    } finally {
      isLoading = false;
    }
  }

  @observable
  String? _nextRoute;

  @computed
  String? get nextRoute => _nextRoute;
}
