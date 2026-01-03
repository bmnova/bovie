import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/generated/assets.gen.dart';

import '../../utils/figma_constants.dart';
import '../../../app/theme/app_colors.dart';

/// Figma constants for movie genre card
class _FigmaConstants {
  // Selected state icon positioning
  static const double selectedIconRightPadding = 8.0;
  static const double selectedIconBottomPadding = 8.0;
}

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
                      color: AppColors.redLight, // #CB2C2C
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
          // Checkmark icon at bottom right
          if (isSelected)
            Positioned(
              right: _FigmaConstants.selectedIconRightPadding,
              bottom: _FigmaConstants.selectedIconBottomPadding,
              child: BovieAssets.icons.circleCheckIconRed.svg(
                width: FigmaConstants.iconSize32,
                height: FigmaConstants.iconSize32,
              ),
            ),
        ],
      ),
    );
}

