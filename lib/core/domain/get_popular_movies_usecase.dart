import 'package:bovie/core/result/result.dart';
import 'package:bovie/core/domain/movie.dart';
import 'package:bovie/core/domain/movies_repository.dart';

class GetPopularMovies {
  final MoviesRepository _repository;

  GetPopularMovies(this._repository);

  Future<Result<List<Movie>>> call(int page) => _repository.getPopularMovies(page);
}

