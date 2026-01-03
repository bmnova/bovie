import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/ui/splash/presentation/splash_screen.dart';
import 'package:bovie/ui/onboarding/presentation/onboarding_movies_screen.dart';
import 'package:bovie/ui/onboarding/presentation/onboarding_genres_screen.dart';
import 'package:bovie/ui/paywall/presentation/paywall_screen_a.dart';
import 'package:bovie/ui/paywall/presentation/paywall_screen_b.dart';
import 'package:bovie/core/ab_testing/ab_testing.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

import '../../ui/home/presentation/home_screen.dart';

final GlobalKey<NavigatorState> rootNavigatorKey = GlobalKey<NavigatorState>();


class AppRoutes {
  static const String splash = '/splash';
  static const String onboardingMovies = '/onboarding/movies';
  static const String onboardingGenres = '/onboarding/genres';
  static const String paywall = '/paywall';
  static const String home = '/home';
}

final router = GoRouter(
  navigatorKey: rootNavigatorKey,
  initialLocation: AppRoutes.splash,
  routes: [
    GoRoute(
      path: AppRoutes.splash,
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: AppRoutes.onboardingMovies,
      builder: (context, state) => const OnboardingMoviesScreen(),
    ),
    GoRoute(
      path: AppRoutes.onboardingGenres,
      builder: (context, state) => const OnboardingGenresScreen(),
    ),
    GoRoute(
      path: AppRoutes.paywall,
      builder: (context, state) {
        // Variant is already determined in splash screen via determineVariant()
        // which uses UserIdRepository for deterministic A/B testing
        // For testing random variants, use: paywallStore.selectRandomVariant();

        return Observer(
          builder: (_) {
            // Show appropriate screen based on variant
            switch (paywallStore.variant ?? PaywallVariant.testB) {
              case PaywallVariant.control:
              case PaywallVariant.testA:
                return const PaywallScreenA();
              case PaywallVariant.testB:
                return const PaywallScreenB();
            }
          },
        );
      },
    ),
    GoRoute(
      path: AppRoutes.home,
      builder: (context, state) => const HomeScreen(),
    ),
  ],
);

/// Extension for easy paywall navigation with random variant selection
extension PaywallNavigationExtension on BuildContext {
  /// Navigate to paywall with random variant selection (for testing)
  void pushPaywallWithRandomVariant() {
    // Select random variant for testing
    paywallStore.selectRandomVariant();
    // Wait for MobX Observer to update before navigating
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        push(AppRoutes.paywall);
      }
    });
  }
}
