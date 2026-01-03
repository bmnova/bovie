import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/ui/home/domain/home_store.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/domain/movie.dart';
import 'package:bovie/core/domain/genre.dart';
import 'package:mobx/mobx.dart';

import '../../../../app/theme/app_colors.dart';

import 'home_layout_constants.dart';

/// Figma constants for category section
class _FigmaConstants {
  _FigmaConstants._();

  // Category section dimensions
  // Typography: Inter, Regular (400), 20px, line-height 100%, letter-spacing 0%
  static const double categoryTitleFontSize = 20.0;
  static const String categoryTitleFontFamily = 'Inter';
  static const FontWeight categoryTitleFontWeight = FontWeight.w400; // Regular
  static const double categoryTitleLineHeight = 1.0; // 100% = 1.0
  static const double categoryTitleLetterSpacing = 0.0; // 0%

  // Movie grid
  static const double moviePosterWidth = 100.0; // From Figma: Movie Genre Container width
}

/// Category section widget displaying a genre title and movies horizontally with infinite scroll
class CategorySection extends StatelessWidget {
  final Genre genre;
  final HomeStore store;

  const CategorySection({
    super.key,
    required this.genre,
    required this.store,
  });

  @override
  Widget build(BuildContext context) => SizedBox(
      height: HomeLayoutConstants.categorySectionHeight,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Top spacing
          SizedBox(height: HomeLayoutConstants.categorySectionTopSpacing),
          // Category title
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: FigmaConstants.spacing16),
            child: SizedBox(
              height: HomeLayoutConstants.categoryTitleHeight,
              child: Text(
                genre.name,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontFamily: _FigmaConstants.categoryTitleFontFamily,
                  fontSize: _FigmaConstants.categoryTitleFontSize,
                  fontWeight: _FigmaConstants.categoryTitleFontWeight,
                  height: _FigmaConstants.categoryTitleLineHeight,
                  letterSpacing: _FigmaConstants.categoryTitleLetterSpacing,
                  color: AppColors.white,
                ),
              ),
            ),
          ),
          SizedBox(height: HomeLayoutConstants.categoryTitleBottomSpacing),
          // Movies horizontal list (3 rows) with infinite scroll
          SizedBox(
            height: HomeLayoutConstants.categoryGridHeight,
            child: Observer(
              builder: (_) {
                final movies = store.categoryMovies[genre.id] ?? ObservableList<Movie>();
                final isLoadingMore = store.isCategoryLoadingMore(genre.id);
                final hasMore = store.categoryHasMore(genre.id);
                
                return HorizontalScrollableList<Movie>(
                  items: movies,
                  itemBuilder: (context, index, movie) => MoviePosterCard(
                    imageUrl: movie.posterPath,
                    width: _FigmaConstants.moviePosterWidth,
                    height: HomeLayoutConstants.moviePosterHeight,
                    borderRadius: 8.0,
                  ),
                  itemSize: HomeLayoutConstants.moviePosterHeight,
                  itemSpacing: 21.5, // Specified spacing between containers
                  crossAxisCount: HomeLayoutConstants.categoryRowCount,
                  crossAxisSpacing: HomeLayoutConstants.movieRowSpacing,
                  childAspectRatio: HomeLayoutConstants.moviePosterHeight / 100.0, // Height / Width for horizontal grid
                  onLoadMore: hasMore ? () => store.loadMoreMoviesForCategory(genre.id) : null,
                  isLoadingMore: () => isLoadingMore,
                  padding: const EdgeInsets.symmetric(horizontal: FigmaConstants.spacing16),
                );
              },
            ),
          ),
          // Bottom spacing
          SizedBox(height: HomeLayoutConstants.categorySectionBottomSpacing),
        ],
      ),
    );
}

