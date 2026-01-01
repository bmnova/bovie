import 'package:bovie/core/result/result.dart';
import 'package:bovie/features/onboarding/domain/genre.dart';

abstract class GenresRepository {
  Future<Result<List<Genre>>> getGenres();
}
