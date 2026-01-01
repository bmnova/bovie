class TmdbImageUrlBuilder {
  static const String _baseUrl = 'https://image.tmdb.org/t/p/';
  static const String _defaultSize = 'w500';

  static String build(String? path, {String size = _defaultSize}) {
    if (path == null || path.isEmpty) {
      return ''; // Or a placeholder URL
    }
    return '$_baseUrl$size$path';
  }
}
