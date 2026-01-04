import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:bovie/core/utils/tmdb_image_url_builder.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/generated/assets.gen.dart';

import '../../utils/figma_constants.dart';
import '../../../app/theme/app_colors.dart';

/// Figma constants for movie poster card
class _FigmaConstants {
  // Selected state icon positioning
  static const double selectedIconRightPadding = 16.0;
  static const double selectedIconBottomPadding = 24.0;

  // Inner shadow values (CSS: box-shadow: 0px 0px 60px 24px #CB2C2C4D inset)
  static const double innerShadowSpreadRadius = 24.0;
  static const double innerShadowBlurRadius = 60.0;
  static const double innerShadowDepth = innerShadowSpreadRadius + innerShadowBlurRadius;

  // Inner shadow color alpha (#CB2C2C4D = rgba(203, 44, 44, 0.3))
  static const double innerShadowColorAlpha = 0.3;
  static const double innerShadowMidAlpha = 0.15;

  // Inner shadow gradient stops
  static const List<double> innerShadowGradientStops = [0.0, 0.3, 1.0];
}

/// Movie poster card component with selection state
class MoviePosterCard extends StatelessWidget {
  final String? imageUrl;
  final bool isSelected;
  final VoidCallback? onTap;
  final double height;
  final double width;
  final double borderRadius;

  MoviePosterCard({
    super.key,
    this.imageUrl,
    this.isSelected = false,
    this.onTap,
    double? width,
    double? height,
    this.borderRadius = 0.0,
  })  : width = width ?? FigmaConstants.moviePosterWidth,
        height = height ?? FigmaConstants.moviePosterHeight;

  @override
  Widget build(BuildContext context) => GestureDetector(
        onTap: onTap,
        child: Stack(
          children: [
            SizedBox(
              width: width,
              height: height,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(borderRadius),
                child: imageUrl != null
                    ? CachedNetworkImage(
                        imageUrl: TmdbImageUrlBuilder.build(imageUrl!, size: 'w500'),
                        fit: BoxFit.cover,
                        placeholder: (context, url) => Container(
                          color: context.colorScheme.surfaceContainerHighest,
                          child: Center(
                            child: SizedBox.shrink(),
                          ),
                        ),
                        errorWidget: (context, url, error) => Container(
                          color: context.colorScheme.surfaceContainerHighest,

                          ),
                      )
                    : Container(
                        color: context.colorScheme.surfaceContainerHighest,

                      ),
              ),
            ),
            // Inner shadow effect (inset shadow)
            if (isSelected)
              Positioned.fill(
                child: CustomPaint(
                  painter: _InnerShadowPainter(),
                ),
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

/// Custom painter for inner shadow effect
/// Simulates CSS inset shadow: 0px 0px 60px 24px #CB2C2C4D inset
/// Inner shadow: edges are darker, center is lighter (fade inward)
class _InnerShadowPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final shadowColor = AppColors.redLight.withValues(
      alpha: _FigmaConstants.innerShadowColorAlpha,
    ); // #CB2C2C4D

    // Draw inner shadow from all 4 edges (kenarlardan içe doğru)
    // Top edge - from top to bottom
    _drawEdgeShadow(
      canvas,
      Rect.fromLTWH(0, 0, size.width, _FigmaConstants.innerShadowDepth),
      Alignment.topCenter,
      Alignment.bottomCenter,
      shadowColor,
    );

    // Bottom edge - from bottom to top
    _drawEdgeShadow(
      canvas,
      Rect.fromLTWH(
        0,
        size.height - _FigmaConstants.innerShadowDepth,
        size.width,
        _FigmaConstants.innerShadowDepth,
      ),
      Alignment.bottomCenter,
      Alignment.topCenter,
      shadowColor,
    );

    // Left edge - from left to right
    _drawEdgeShadow(
      canvas,
      Rect.fromLTWH(0, 0, _FigmaConstants.innerShadowDepth, size.height),
      Alignment.centerLeft,
      Alignment.centerRight,
      shadowColor,
    );

    // Right edge - from right to left
    _drawEdgeShadow(
      canvas,
      Rect.fromLTWH(
        size.width - _FigmaConstants.innerShadowDepth,
        0,
        _FigmaConstants.innerShadowDepth,
        size.height,
      ),
      Alignment.centerRight,
      Alignment.centerLeft,
      shadowColor,
    );
  }

  void _drawEdgeShadow(
    Canvas canvas,
    Rect rect,
    Alignment begin,
    Alignment end,
    Color shadowColor,
  ) {
    final paint = Paint()
      ..shader = LinearGradient(
        begin: begin,
        end: end,
        colors: [
          shadowColor, // Edge: dark (koyu - dış taraf)
          shadowColor.withValues(alpha: _FigmaConstants.innerShadowMidAlpha), // Mid
          Colors.transparent, // Inner: transparent (açık - iç taraf)
        ],
        stops: _FigmaConstants.innerShadowGradientStops,
      ).createShader(rect);

    canvas.drawRect(rect, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
