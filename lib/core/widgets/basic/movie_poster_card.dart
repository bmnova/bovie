import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:bovie/core/utils/tmdb_image_url_builder.dart';
import 'package:bovie/core/utils/globals.dart';

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
    this.width = 140,
    this.height = 196,
  });

  @override
  Widget build(BuildContext context) {

    return GestureDetector(
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
                      width: 2,
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
                            'Image',
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
                            'Image',
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
                          'Image',
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
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: context.colorScheme.primary,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.check_circle,
                  color: context.colorScheme.onPrimary,
                  size: 32,
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
                      color: context.colorScheme.primary.withOpacity(0.3),
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
}

