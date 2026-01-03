import 'package:bovie/core/result/result.dart';
import 'package:bovie/core/domain/genre.dart';
import 'package:bovie/core/domain/genres_repository.dart';

class GetGenres {
  final GenresRepository _repository;

  GetGenres(this._repository);

  Future<Result<List<Genre>>> call() => _repository.getGenres();
}

