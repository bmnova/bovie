import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/generated/assets.gen.dart';

import '../../utils/figma_constants.dart';
import '../../../app/theme/app_colors.dart';
import 'circular_image_item.dart';

/// Figma constants for movie genre card
class _FigmaConstants {
  // Selected state icon positioning
  static const double selectedIconRightPadding = 8.0;
  static const double selectedIconBottomPadding = 8.0;
}

/// Circular movie genre card component with selection state
class MovieGenreCard extends StatelessWidget {
  final String? imageUrl;
  final String? genreName;
  final bool isSelected;
  final VoidCallback? onTap;
  final double size;

  MovieGenreCard({
    super.key,
    this.imageUrl,
    this.genreName,
    this.isSelected = false,
    this.onTap,
    double? size,
  }) : size = size ?? FigmaConstants.genreCardSize;

  @override
  Widget build(BuildContext context) => GestureDetector(
      onTap: onTap,
      child: Stack(
        children: [
          CircularImageItem(
            imageUrl: imageUrl,
            placeholderText: genreName,
            size: size,
            backgroundColor: context.colorScheme.surface,
            borderColor: isSelected ? AppColors.redLight : null,
            borderWidth: isSelected ? FigmaConstants.borderWidth2 : null,
                            ),
          // Checkmark icon at bottom right
          if (isSelected)
            Positioned(
              right: _FigmaConstants.selectedIconRightPadding.w(context),
              bottom: _FigmaConstants.selectedIconBottomPadding.h(context),
              child: BovieAssets.icons.circleCheckIconRed.svg(
                width: FigmaConstants.iconSize32.w(context),
                height: FigmaConstants.iconSize32.h(context),
              ),
            ),
        ],
      ),
    );
}

