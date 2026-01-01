import 'package:dio/dio.dart';
import 'package:bovie/core/result/result.dart';

class TmdbApi {
  final Dio _dio;

  TmdbApi(this._dio);

  Future<Result<T>> _safeApiCall<T>(
    Future<Response> call,
    T Function(Map<String, dynamic> json) mapper,
  ) async {
    try {
      final response = await call;
      final data = mapper(response.data as Map<String, dynamic>);
      return Success(data);
    } on DioException catch (e) {
      return Failure(_mapDioError(e));
    } catch (e) {
      return Failure(AppError(type: AppErrorType.unknown, originalError: e));
    }
  }

  AppError _mapDioError(DioException e) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return AppError(type: AppErrorType.timeout, originalError: e);
      case DioExceptionType.badResponse:
        final statusCode = e.response?.statusCode;
        if (statusCode == 401 || statusCode == 403) {
          return AppError(type: AppErrorType.unauthorized, originalError: e);
        } else if (statusCode == 404) {
          return AppError(type: AppErrorType.notFound, originalError: e);
        }
        return AppError(type: AppErrorType.network, originalError: e);
      default:
        return AppError(type: AppErrorType.network, originalError: e);
    }
  }

  Future<Result<Map<String, dynamic>>> getGenres() => _safeApiCall(
        _dio.get('/genre/movie/list'),
        (json) => json,
      );

  Future<Result<Map<String, dynamic>>> getPopularMovies({int page = 1}) => _safeApiCall(
        _dio.get('/movie/popular', queryParameters: {'page': page}),
        (json) => json,
      );

  Future<Result<Map<String, dynamic>>> discoverByGenre(int genreId, {int page = 1}) => _safeApiCall(
        _dio.get(
          '/discover/movie',
          queryParameters: {
            'with_genres': genreId,
            'page': page,
          },
        ),
        (json) => json,
      );
}
