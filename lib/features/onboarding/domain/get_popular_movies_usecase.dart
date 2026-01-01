import 'package:bovie/core/result/result.dart';
import 'package:bovie/features/onboarding/domain/movie.dart';
import 'package:bovie/features/onboarding/domain/movies_repository.dart';

class GetPopularMovies {
  final MoviesRepository _repository;

  GetPopularMovies(this._repository);

  Future<Result<List<Movie>>> call(int page) {
    return _repository.getPopularMovies(page);
  }
}
