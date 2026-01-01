import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/features/splash/splash_screen.dart';
import 'package:bovie/features/onboarding/onboarding_movies_screen.dart';
import 'package:bovie/features/onboarding/onboarding_genres_screen.dart';
import 'package:bovie/features/paywall/paywall_screen.dart';
import 'package:bovie/features/home/home_screen.dart';

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
      builder: (context, state) => const PaywallScreen(),
    ),
    GoRoute(
      path: AppRoutes.home,
      builder: (context, state) => const HomeScreen(),
    ),
  ],
);
