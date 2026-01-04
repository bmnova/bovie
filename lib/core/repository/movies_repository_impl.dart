import 'package:bovie/core/network/tmdb_api.dart';
import 'package:bovie/core/result/result.dart';
import 'package:bovie/core/data/dto/movie_dto.dart';
import 'package:bovie/core/domain/movie.dart';
import 'package:bovie/core/domain/movies_repository.dart';

class MoviesRepositoryImpl implements MoviesRepository {
  final TmdbApi _api;
  
  // Cache for first page of popular movies (loaded during splash)
  List<Movie>? _cachedFirstPageMovies;

  MoviesRepositoryImpl(this._api);

  @override
  Future<Result<List<Movie>>> getPopularMovies(int page) async {
    // Return cached first page if available
    if (page == 1 && _cachedFirstPageMovies != null) {
      return Success(_cachedFirstPageMovies!);
    }
    
    final result = await _api.getPopularMovies(page: page);
    
    if (result.isFailure) {
      return Failure(result.errorOrNull!);
    }

    try {
      final dto = MoviesPageDto.fromJson(result.dataOrNull!);
      final domainList = dto.results.map((e) => Movie(
        id: e.id,
        title: e.title,
        posterPath: e.posterPath,
        releaseDate: e.releaseDate,
      )).toList();
      
      // Cache first page for subsequent calls
      if (page == 1) {
        _cachedFirstPageMovies = domainList;
      }
      
      return Success(domainList);
    } catch (e) {
      return Failure(AppError(type: AppErrorType.parsing, originalError: e));
    }
  }

  @override
  Future<Result<List<Movie>>> discoverByGenre(int genreId, {int page = 1}) async {
    final result = await _api.discoverByGenre(genreId, page: page);
    
    if (result.isFailure) {
      return Failure(result.errorOrNull!);
    }

    try {
      final dto = MoviesPageDto.fromJson(result.dataOrNull!);
      final domainList = dto.results.map((e) => Movie(
        id: e.id,
        title: e.title,
        posterPath: e.posterPath,
        releaseDate: e.releaseDate,
      )).toList();
      return Success(domainList);
    } catch (e) {
      return Failure(AppError(type: AppErrorType.parsing, originalError: e));
    }
  }

  @override
  Future<Result<List<Movie>>> getSimilarMovies(int movieId, {int page = 1}) async {
    final result = await _api.getSimilarMovies(movieId, page: page);
    
    if (result.isFailure) {
      return Failure(result.errorOrNull!);
    }

    try {
      final dto = MoviesPageDto.fromJson(result.dataOrNull!);
      final domainList = dto.results.map((e) => Movie(
        id: e.id,
        title: e.title,
        posterPath: e.posterPath,
        releaseDate: e.releaseDate,
      )).toList();
      return Success(domainList);
    } catch (e) {
      return Failure(AppError(type: AppErrorType.parsing, originalError: e));
    }
  }
}

