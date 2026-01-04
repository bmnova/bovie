import 'package:freezed_annotation/freezed_annotation.dart';

part 'movie_dto.freezed.dart';
part 'movie_dto.g.dart';

/// API v2 DTO - Adapted to new API structure
/// 
/// Breaking changes from v1:
/// - id → film_id (JSON field changed, property name stays 'id')
/// - title → film_title (JSON field changed, property name stays 'title')
/// - poster_path → poster_image (JSON field changed, property name stays 'posterPath')
/// - release_date → release (JSON field changed, property name stays 'releaseDate')
/// 
/// IMPORTANT: Property names remain unchanged so mapper code doesn't need updates
@freezed
class MovieDto with _$MovieDto {
  const factory MovieDto({
    @JsonKey(name: 'film_id') required int id, // v2: film_id (was: id)
    @JsonKey(name: 'film_title') required String title, // v2: film_title (was: title)
    @JsonKey(name: 'poster_image') String? posterPath, // v2: poster_image (was: poster_path)
    @JsonKey(name: 'release') String? releaseDate, // v2: release (was: release_date)
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
