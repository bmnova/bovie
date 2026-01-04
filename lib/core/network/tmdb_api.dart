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

  /// Get popular movies - API v2 format
  /// 
  /// Simulates API v2 breaking change by transforming v1 response to v2 format
  /// This demonstrates how Data layer adapts to API changes without affecting Domain/Presentation
  Future<Result<Map<String, dynamic>>> getPopularMovies({int page = 1}) async {
    final result = await _safeApiCall(
      _dio.get('/movie/popular', queryParameters: {'page': page}),
      (json) => json,
    );
    
    if (result.isFailure) {
      return result;
    }
    
    // Transform v1 response to v2 format (simulating API v2 breaking change)
    final v1Data = result.dataOrNull!;
    final v2Data = _transformToV2Format(v1Data);
    
    return Success(v2Data);
  }
  
  /// Transforms API v1 response to v2 format
  /// This simulates the backend team changing the API structure
  Map<String, dynamic> _transformToV2Format(Map<String, dynamic> v1Data) {
    final results = (v1Data['results'] as List<dynamic>?)?.map((movie) {
      return {
        'film_id': movie['id'],
        'film_title': movie['title'],
        'poster_image': movie['poster_path'],
        'release': movie['release_date'],
      };
    }).toList() ?? [];
    
    return {
      'page': v1Data['page'],
      'results': results,
      'total_pages': v1Data['total_pages'],
      'total_results': v1Data['total_results'],
    };
  }

  /// Discover movies by genre - API v2 format
  Future<Result<Map<String, dynamic>>> discoverByGenre(int genreId, {int page = 1}) async {
    final result = await _safeApiCall(
      _dio.get(
        '/discover/movie',
        queryParameters: {
          'with_genres': genreId,
          'page': page,
        },
      ),
      (json) => json,
    );
    
    if (result.isFailure) {
      return result;
    }
    
    // Transform v1 response to v2 format
    final v1Data = result.dataOrNull!;
    final v2Data = _transformToV2Format(v1Data);
    
    return Success(v2Data);
  }

  /// Get similar movies - API v2 format
  Future<Result<Map<String, dynamic>>> getSimilarMovies(int movieId, {int page = 1}) async {
    final result = await _safeApiCall(
      _dio.get(
        '/movie/$movieId/similar',
        queryParameters: {'page': page},
      ),
      (json) => json,
    );
    
    if (result.isFailure) {
      return result;
    }
    
    // Transform v1 response to v2 format
    final v1Data = result.dataOrNull!;
    final v2Data = _transformToV2Format(v1Data);
    
    return Success(v2Data);
  }
}
