import 'package:flutter/material.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/core/domain/movie.dart';
import 'package:bovie/core/utils/tmdb_image_url_builder.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:bovie/generated/l10n.dart';

/// Figma constants specific to ForYouSection
class _FigmaConstants {
  _FigmaConstants._();

  // Border
  static const double borderWidth = 0.5;

  // Image item dimensions
  static const double imageItemSize = 80.0;

  // Default item count
  static const int defaultItemCount = 5;
}

/// "For You" section widget for home screen
/// Displays a horizontal scrollable list of recommended items
class ForYouSection extends StatelessWidget {
  final List<Movie> movies;

  const ForYouSection({
    super.key,
    required this.movies,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(
        bottom: FigmaConstants.spacing20,
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
            padding: const EdgeInsets.symmetric(
              horizontal: FigmaConstants.spacing20,
            ),
            child: Text(
              localizations.forYou,
              style: context.textTheme.headlineSmall?.copyWith(
                color: AppColors.white,
                fontSize: FigmaConstants.fontSize24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const SizedBox(height: FigmaConstants.spacing20),
          // Horizontal scrollable list
          SizedBox(
            height: _FigmaConstants.imageItemSize,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(
                horizontal: FigmaConstants.spacing20,
              ),
              itemCount: movies.isNotEmpty ? movies.length : _FigmaConstants.defaultItemCount,
              separatorBuilder: (context, index) => const SizedBox(
                width: FigmaConstants.spacing20,
              ),
              itemBuilder: (context, index) {
                if (movies.isNotEmpty && index < movies.length) {
                  return _ForYouImageItem(
                    movie: movies[index],
                  );
                }
                return const _ForYouImageItem();
              },
            ),
          ),
        ],
      ),
    );
  }
}

/// Individual image item in For You section
class _ForYouImageItem extends StatelessWidget {
  final Movie? movie;

  const _ForYouImageItem({
    this.movie,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: _FigmaConstants.imageItemSize,
      height: _FigmaConstants.imageItemSize,
      decoration: BoxDecoration(
        color: AppColors.white,
        shape: BoxShape.circle,
      ),
      child: movie?.posterPath != null
          ? ClipOval(
              child: CachedNetworkImage(
                imageUrl: TmdbImageUrlBuilder.build(movie!.posterPath!, size: 'w500'),
                fit: BoxFit.cover,
                placeholder: (context, url) => _buildPlaceholder(),
                errorWidget: (context, url, error) => _buildPlaceholder(),
              ),
            )
          : _buildPlaceholder(),
    );
  }

  Widget _buildPlaceholder() {
    return Center(
      child: Text(
        localizations.imagePlaceholder,
        style: TextStyle(
          color: AppColors.black,
          fontSize: FigmaConstants.fontSize16,
          fontWeight: FontWeight.normal,
        ),
      ),
    );
  }
}

