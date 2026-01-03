import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:bovie/app/config/app_config.dart';
import 'package:bovie/core/network/tmdb_api.dart';

import 'package:shared_preferences/shared_preferences.dart';

import '../../core/repository/genres_repository_impl.dart';
import '../../core/repository/movies_repository_impl.dart';
import '../../core/domain/genres_repository.dart';
import '../../core/domain/get_genres_usecase.dart';
import '../../core/domain/get_popular_movies_usecase.dart';
import '../../core/domain/movies_repository.dart';
import '../../ui/onboarding/domain/onboarding_repository.dart';
import '../../ui/onboarding/data/onboarding_repository_impl.dart';
import '../../ui/splash/presentation/splash_store.dart';
import '../../ui/paywall/presentation/paywall_store.dart';
import '../../ui/user/domain/user_id_repository.dart';
import '../../ui/user/data/user_id_repository_impl.dart';
import '../../ui/home/presentation/home_store.dart';

final getIt = GetIt.instance;

void setupDI(AppConfig config, SharedPreferences prefs) {
  getIt.registerSingleton<AppConfig>(config);
  getIt.registerSingleton<SharedPreferences>(prefs);

  final dio = Dio(
    BaseOptions(
      baseUrl: config.baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {
        'Authorization': 'Bearer ${config.tmdbToken}',
        'accept': 'application/json',
      },
    ),
  );

  if (config.logEnabled) {
    dio.interceptors.add(LogInterceptor(responseBody: true, requestBody: true));
  }

  getIt.registerSingleton<Dio>(dio);
  getIt.registerSingleton<TmdbApi>(TmdbApi(dio));

  // Onboarding
  getIt.registerLazySingleton<MoviesRepository>(() => MoviesRepositoryImpl(getIt<TmdbApi>()));
  getIt.registerLazySingleton<GetPopularMovies>(() => GetPopularMovies(getIt<MoviesRepository>()));
  
  getIt.registerLazySingleton<GenresRepository>(() => GenresRepositoryImpl(getIt<TmdbApi>()));
  getIt.registerLazySingleton<GetGenres>(() => GetGenres(getIt<GenresRepository>()));

  // Onboarding
  getIt.registerLazySingleton<OnboardingRepository>(() => OnboardingRepositoryImpl(getIt<SharedPreferences>()));

  // Splash
  getIt.registerFactory<SplashStore>(() => SplashStore(getIt<GetGenres>(), getIt<PaywallStore>(), getIt<OnboardingRepository>()));

  // Paywall
  getIt.registerLazySingleton<UserIdRepository>(() => UserIdRepositoryImpl(getIt<SharedPreferences>()));
  getIt.registerLazySingleton<PaywallStore>(() => PaywallStore(getIt<UserIdRepository>()));

  // Home
  getIt.registerFactory<HomeStore>(() => HomeStore(getIt<MoviesRepository>(), getIt<OnboardingRepository>()));
}
