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
    print('[GenresRepositoryImpl] getGenres() called');
    // Return cached genres if available
    // Add small delay to ensure UI can update loading state
    if (_cachedGenres != null) {
      print('[GenresRepositoryImpl] Returning cached genres: ${_cachedGenres!.length} genres');
      print('[GenresRepositoryImpl] First cached genre: ${_cachedGenres!.first.name}');
      await Future.delayed(const Duration(milliseconds: 50));
      return Success(_cachedGenres!);
    }
    
    print('[GenresRepositoryImpl] Cache is null, fetching from API...');
    final result = await _api.getGenres();
    
    if (result.isFailure) {
      print('[GenresRepositoryImpl] API call failed: ${result.errorOrNull}');
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
      print('[GenresRepositoryImpl] Fetched from API and cached: ${domainList.length} genres');
      print('[GenresRepositoryImpl] First genre: ${domainList.first.name}');
      
      return Success(domainList);
    } catch (e) {
      print('[GenresRepositoryImpl] Parsing error: $e');
      return Failure(AppError(type: AppErrorType.parsing, originalError: e));
    }
  }
}

