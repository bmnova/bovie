import 'package:bovie/core/result/result.dart';
import 'package:bovie/core/domain/genre.dart';

abstract class GenresRepository {
  Future<Result<List<Genre>>> getGenres();
}

