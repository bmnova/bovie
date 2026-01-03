import 'package:bovie/core/utils/figma_constants.dart';

/// Constants for Home layout dimensions
class HomeLayoutConstants {
  HomeLayoutConstants._();

  // Category section dimensions
  static const double categoryTitleHeight = 20.0; // Matches font size (20px) with line-height 100%
  static const double categorySectionTopSpacing = 12.0;
  static const double categoryTitleBottomSpacing = 12.0;
  static const double categorySectionBottomSpacing = 40.0;
  static const double moviePosterHeight = 140.0;
  static const double movieRowSpacing = 12.0; // Updated from 48.0 based on user feedback
  static const int categoryRowCount = 3;

  // Total height of the movies grid (3 rows + gaps)
  // 3 * 140 + 2 * 12 = 420 + 24 = 444.0
  static const double categoryGridHeight = (moviePosterHeight * categoryRowCount) + 
      (movieRowSpacing * (categoryRowCount - 1));

  // Total section height = top padding + title height + title gap + grid height + bottom padding
  // 12 + 20 + 12 + 444 + 40 = 528.0
  static const double categorySectionHeight = categorySectionTopSpacing +
      categoryTitleHeight + 
      categoryTitleBottomSpacing + 
      categoryGridHeight + 
      categorySectionBottomSpacing;
}
