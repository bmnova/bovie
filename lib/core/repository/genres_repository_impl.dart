import 'package:bovie/core/network/tmdb_api.dart';
import 'package:bovie/core/result/result.dart';
import 'package:bovie/core/data/dto/genre_dto.dart';
import 'package:bovie/core/domain/genre.dart';
import 'package:bovie/core/domain/genres_repository.dart';

class GenresRepositoryImpl implements GenresRepository {
  final TmdbApi _api;

  GenresRepositoryImpl(this._api);

  @override
  Future<Result<List<Genre>>> getGenres() async {
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
      return Success(domainList);
    } catch (e) {
      return Failure(AppError(type: AppErrorType.parsing, originalError: e));
    }
  }
}

