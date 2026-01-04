import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/core/domain/movie.dart';
import 'package:bovie/core/widgets/widgets.dart';

/// Figma constants specific to ForYouSection
class _FigmaConstants {
  _FigmaConstants._();

  // Border
  static const double borderWidth = 0.5;

  // Image item dimensions
  static const double imageItemSize = 80.0;

  // Default item count (for placeholder when movies list is empty)
  // This should match HomeStore.maxForYouMovies
  static const int defaultItemCount = 5;
}

/// "For You" section widget for home screen
/// Displays a horizontal scrollable list of recommended items with infinite scroll
class ForYouSection extends StatelessWidget {
  final ObservableList<Movie> movies;
  final VoidCallback? onLoadMore;
  final bool Function() isLoadingMore;

  const ForYouSection({
    super.key,
    required this.movies,
    this.onLoadMore,
    required this.isLoadingMore,
  });

  @override
  Widget build(BuildContext context) => Container(
      padding: EdgeInsets.only(
        bottom: FigmaConstants.spacing20.sh(context),
      ),
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: AppColors.gray,
            width: _FigmaConstants.borderWidth,
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Title
          Padding(
            padding: EdgeInsets.symmetric(
              horizontal: FigmaConstants.spacing20.sw(context),
            ),
            child: Text(
              localizations.forYou,
              style: context.textTheme.headlineSmall?.copyWith(
                color: AppColors.white,
                fontSize: FigmaConstants.fontSize24.f(context),
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          SizedBox(height: FigmaConstants.spacing20.sh(context)),
          // Horizontal scrollable list
          HorizontalScrollableList<Movie>(
            items: movies,
            itemBuilder: (context, index, movie) => CircularImageItem(
              imageUrl: movie.posterPath,
              size: _FigmaConstants.imageItemSize.w(context),
              ),
            itemSize: _FigmaConstants.imageItemSize.w(context),
            itemSpacing: FigmaConstants.spacing20.sw(context),
            onLoadMore: onLoadMore,
            isLoadingMore: isLoadingMore,
            padding: EdgeInsets.symmetric(
              horizontal: FigmaConstants.spacing20.sw(context),
            ),
            placeholderCount: _FigmaConstants.defaultItemCount,
          ),
        ],
      ),
    );
}
