import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';

import '../../utils/figma_constants.dart';

/// Circular movie genre card component with selection state
class MovieGenreCard extends StatelessWidget {
  final String? imageUrl;
  final bool isSelected;
  final VoidCallback? onTap;
  final double size;

  const MovieGenreCard({
    super.key,
    this.imageUrl,
    this.isSelected = false,
    this.onTap,
    this.size = FigmaConstants.genreCardSize,
  });

  @override
  Widget build(BuildContext context) => GestureDetector(
      onTap: onTap,
      child: Stack(
        children: [
          Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: context.colorScheme.surface,
              shape: BoxShape.circle,
              border: isSelected
                  ? Border.all(
                      color: context.colorScheme.primary,
                      width: FigmaConstants.borderWidth2,
                    )
                  : null,
            ),
            child: ClipOval(
              child: imageUrl != null
                  ? Image.network(
                      imageUrl!,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) => Container(
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
              right: 0,
              bottom: 0,
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
        ],
      ),
    );
}

