import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/generated/l10n.dart';
import 'package:bovie/app/config/app_config.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/core/network/tmdb_api.dart';
import 'package:bovie/core/domain/movies_repository.dart';
import 'package:bovie/core/domain/genres_repository.dart';
import 'package:bovie/core/domain/get_popular_movies_usecase.dart';
import 'package:bovie/core/domain/get_genres_usecase.dart';
import 'package:bovie/ui/onboarding/domain/onboarding_repository.dart';
import 'package:bovie/ui/splash/presentation/splash_store.dart';
import 'package:bovie/ui/paywall/presentation/paywall_store.dart';
import 'package:flutter/material.dart';

/// Global context provider
BuildContext get currentContext => rootNavigatorKey.currentContext!;

/// Global accessors
AppConfig get config => getIt<AppConfig>();
String get appName => config.appName;
SharedPreferences get prefs => getIt<SharedPreferences>();
Dio get dio => getIt<Dio>();
TmdbApi get tmdbApi => getIt<TmdbApi>();

/// Repositories
MoviesRepository get moviesRepo => getIt<MoviesRepository>();
GenresRepository get genresRepo => getIt<GenresRepository>();
OnboardingRepository get onboardingRepository => getIt<OnboardingRepository>();

/// Usecases
GetPopularMovies get getPopularMovies => getIt<GetPopularMovies>();
GetGenres get getGenres => getIt<GetGenres>();

/// Factories
SplashStore get splashStore => getIt<SplashStore>();
PaywallStore get paywallStore => getIt<PaywallStore>();

/// Global accessors for theme and localizations
ThemeData get theme => Theme.of(currentContext);
ColorScheme get colorScheme => theme.colorScheme;
TextTheme get textTheme => theme.textTheme;
S get localizations => S.of(currentContext);

extension LocalizationExtension on BuildContext {
  S get localizations => S.of(this);
}

extension ThemeExtension on BuildContext {
  /// Get TextTheme directly from context
  TextTheme get textTheme => Theme.of(this).textTheme;
  
  /// Get ColorScheme directly from context
  ColorScheme get colorScheme => Theme.of(this).colorScheme;
  
  /// Get ThemeData directly from context
  ThemeData get theme => Theme.of(this);
}
