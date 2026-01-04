import 'package:bovie/core/network/tmdb_api.dart';
import 'package:bovie/core/result/result.dart';
import 'package:bovie/core/data/dto/genre_dto.dart';
import 'package:bovie/core/domain/genre.dart';
import 'package:bovie/core/domain/genres_repository.dart';

class GenresRepositoryImpl implements GenresRepository {
  final TmdbApi _api;
  
  // In-memory cache for genres (loaded once during splash)
  List<Genre>? _cachedGenres;

  GenresRepositoryImpl(this._api);

  @override
  Future<Result<List<Genre>>> getGenres() async {
    // Return cached genres if available
    // Add small delay to ensure UI can update loading state
    if (_cachedGenres != null) {
      await Future.delayed(const Duration(milliseconds: 50));
      return Success(_cachedGenres!);
    }
    
    final result = await _api.getGenres();
    
    if (result.isFailure) {
      return Failure(result.errorOrNull!);
    }

    try {
      final dto = GenresListDto.fromJson(result.dataOrNull!);
      final domainList = dto.genres.map((e) => Genre(
        id: e.id,
        name: e.name,
      )).toList();
      
      // Cache the genres for subsequent calls
      _cachedGenres = domainList;
      
      return Success(domainList);
    } catch (e) {
      return Failure(AppError(type: AppErrorType.parsing, originalError: e));
    }
  }
}

