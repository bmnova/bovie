import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:bovie/app/config/app_config.dart';
import 'package:bovie/core/network/tmdb_api.dart';

import 'package:shared_preferences/shared_preferences.dart';

import '../../features/onboarding/data/genres_repository_impl.dart';
import '../../features/onboarding/data/movies_repository_impl.dart';
import '../../features/onboarding/domain/genres_repository.dart';
import '../../features/onboarding/domain/get_genres_usecase.dart';
import '../../features/onboarding/domain/get_popular_movies_usecase.dart';
import '../../features/onboarding/domain/movies_repository.dart';
import '../../features/splash/splash_store.dart';

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

  // Splash
  getIt.registerFactory<SplashStore>(() => SplashStore(getIt<GetGenres>(), getIt<SharedPreferences>()));
}
