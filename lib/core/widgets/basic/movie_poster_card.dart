import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:bovie/core/utils/tmdb_image_url_builder.dart';
import 'package:bovie/core/utils/globals.dart';

import '../../utils/figma_constants.dart';

/// Movie poster card component with selection state
class MoviePosterCard extends StatelessWidget {
  final String? imageUrl;
  final bool isSelected;
  final VoidCallback? onTap;
  final double width;
  final double height;

  const MoviePosterCard({
    super.key,
    this.imageUrl,
    this.isSelected = false,
    this.onTap,
    this.width = FigmaConstants.moviePosterWidth,
    this.height = FigmaConstants.moviePosterHeight,
  });

  @override
  Widget build(BuildContext context) => GestureDetector(
      onTap: onTap,
      child: Stack(
        children: [
          Container(
            width: width,
            height: height,
            decoration: BoxDecoration(
              color: context.colorScheme.surface,
              borderRadius: BorderRadius.circular(8),
              border: isSelected
                   ? Border.all(
                       color: context.colorScheme.primary,
                       width: FigmaConstants.borderWidth2,
                     )
                   : null,
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: imageUrl != null
                  ? CachedNetworkImage(
                      imageUrl: TmdbImageUrlBuilder.build(imageUrl!, size: 'w500'),
                      fit: BoxFit.cover,
                      placeholder: (context, url) => Container(
                        color: context.colorScheme.surfaceContainerHighest,
                        child: Center(
                          child: Text(
                            localizations.imagePlaceholder,
                            style: context.textTheme.titleMedium?.copyWith(
                              color: context.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ),
                      ),
                      errorWidget: (context, url, error) => Container(
                        color: context.colorScheme.surfaceContainerHighest,
                        child: Center(
                          child: Text(
                            localizations.imagePlaceholder,
                            style: context.textTheme.titleMedium?.copyWith(
                              color: context.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ),
                      ),
                    )
                  : Container(
                      color: context.colorScheme.surfaceContainerHighest,
                      child: Center(
                        child: Text(
                          localizations.imagePlaceholder,
                          style: context.textTheme.titleMedium?.copyWith(
                            color: context.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ),
                    ),
            ),
          ),
          if (isSelected)
            Positioned(
              right: 8,
              bottom: 8,
              child: Container(
                width: FigmaConstants.iconSize32,
                height: FigmaConstants.iconSize32,
                decoration: BoxDecoration(
                  color: context.colorScheme.primary,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.check_circle,
                  color: context.colorScheme.onPrimary,
                  size: FigmaConstants.iconSize32,
                ),
              ),
            ),
          if (isSelected)
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  boxShadow: [
                    BoxShadow(
                      color: context.colorScheme.primary.withValues(alpha: 0.3),
                      blurRadius: 24,
                      spreadRadius: 0,
                      offset: Offset.zero,
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }


