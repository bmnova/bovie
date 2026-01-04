import 'package:mobx/mobx.dart';
import 'package:bovie/core/domain/get_genres_usecase.dart';
import 'package:bovie/core/domain/get_popular_movies_usecase.dart';
import 'package:bovie/core/result/result.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/ui/paywall/presentation/paywall_store.dart';

import '../../home/presentation/home_store.dart';
import '../../onboarding/domain/onboarding_repository.dart';

part 'splash_store.g.dart';

class SplashStore = _SplashStoreBase with _$SplashStore;

abstract class _SplashStoreBase with Store {
  final GetGenres _getGenres;
  final GetPopularMovies _getPopularMovies;
  final PaywallStore _paywallStore;
  final OnboardingRepository _onboardingRepository;
  final HomeStore _homeStore;

  _SplashStoreBase(
    this._getGenres,
    this._getPopularMovies,
    this._paywallStore,
    this._onboardingRepository,
    this._homeStore,
  );

  @observable
  bool isLoading = true;

  @observable
  String? error;

  @action
  Future<void> init() async {
    try {
      isLoading = true;
      error = null;

      // 1. Prefetch Genres and first page of popular movies (for onboarding)
      final results = await Future.wait([
        _getGenres(),
        _getPopularMovies(1), // Prefetch first page for onboarding
      ]);
      
      final genresResult = results[0] as Result<List>;
      if (genresResult.isFailure) {
        error = 'Failed to load initial data';
        return;
      }

      // 2. Determine Paywall Variant (for A/B testing)
      await _paywallStore.determineVariant();

      // 3. Check Onboarding
      final isComplete = await _onboardingRepository.isOnboardingComplete();
      print("isComplete: $isComplete");
      // 4. Preload Home Screen Data (if onboarding is complete)
      if (isComplete) {
        // Load "For You" movies and categories in parallel
        await Future.wait([
          _homeStore.loadForYouMovies(),
          _homeStore.loadCategories(),
        ]);
      }
      
      // Delay for splash visibility
      await Future.delayed(const Duration(seconds: 2));

      // If onboarding is complete, go to paywall (user can skip or subscribe)
      // If onboarding is not complete, go to onboarding flow
      _nextRoute = isComplete ? AppRoutes.paywall : AppRoutes.onboardingMovies;
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

  /// Reset store state (useful when restarting the app flow)
  @action
  void reset() {
    _nextRoute = null;
    isLoading = true;
    error = null;
  }
}
