class Movie {
  final int id;
  final String title;
  final String? posterPath;
  final String? releaseDate;

  Movie({
    required this.id,
    required this.title,
    this.posterPath,
    this.releaseDate,
  });
}
