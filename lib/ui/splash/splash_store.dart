import 'package:mobx/mobx.dart';
import 'package:bovie/core/domain/get_genres_usecase.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/ui/paywall/paywall_store.dart';

import '../onboarding/domain/onboarding_repository.dart';

part 'splash_store.g.dart';

class SplashStore = _SplashStoreBase with _$SplashStore;

abstract class _SplashStoreBase with Store {
  final GetGenres _getGenres;
  final PaywallStore _paywallStore;
  final OnboardingRepository _onboardingRepository;

  _SplashStoreBase(this._getGenres, this._paywallStore, this._onboardingRepository);

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

      // 2. Determine Paywall Variant (for A/B testing)
      await _paywallStore.determineVariant();

      // 3. Check Onboarding
      final isComplete = await _onboardingRepository.isOnboardingComplete();
      
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
