import 'package:freezed_annotation/freezed_annotation.dart';

part 'movie_dto.freezed.dart';
part 'movie_dto.g.dart';

@freezed
class MovieDto with _$MovieDto {
  const factory MovieDto({
    required int id,
    required String title,
    @JsonKey(name: 'poster_path') String? posterPath,
    @JsonKey(name: 'release_date') String? releaseDate,
  }) = _MovieDto;

  factory MovieDto.fromJson(Map<String, dynamic> json) => _$MovieDtoFromJson(json);
}

@freezed
class MoviesPageDto with _$MoviesPageDto {
  const factory MoviesPageDto({
    required int page,
    required List<MovieDto> results,
    @JsonKey(name: 'total_pages') required int totalPages,
    @JsonKey(name: 'total_results') required int totalResults,
  }) = _MoviesPageDto;

  factory MoviesPageDto.fromJson(Map<String, dynamic> json) => _$MoviesPageDtoFromJson(json);
}
