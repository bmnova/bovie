import 'package:bovie/core/result/result.dart';
import 'package:bovie/features/onboarding/domain/movie.dart';

abstract class MoviesRepository {
  Future<Result<List<Movie>>> getPopularMovies(int page);
}
