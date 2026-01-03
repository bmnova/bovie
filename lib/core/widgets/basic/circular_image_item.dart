import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/core/utils/tmdb_image_url_builder.dart';
import '../../../app/theme/app_colors.dart';
import '../../utils/figma_constants.dart';

/// Circular image item widget
/// 
/// A reusable circular image widget that can display network images with placeholder support.
/// Used in horizontal scrollable lists and genre cards.
class CircularImageItem extends StatelessWidget {
  final String? imageUrl;
  final String? placeholderText;
  final double size;
  final Color? backgroundColor;
  final Color? borderColor;
  final double? borderWidth;

  const CircularImageItem({
    super.key,
    this.imageUrl,
    this.placeholderText,
    required this.size,
    this.backgroundColor,
    this.borderColor,
    this.borderWidth,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: backgroundColor ?? AppColors.white,
        shape: BoxShape.circle,
        border: borderColor != null && borderWidth != null
            ? Border.all(
                color: borderColor!,
                width: borderWidth!,
              )
            : null,
      ),
      child: ClipOval(
        child: imageUrl != null
            ? CachedNetworkImage(
                imageUrl: imageUrl!.startsWith('http')
                    ? imageUrl!
                    : TmdbImageUrlBuilder.build(imageUrl!, size: 'w500'),
                fit: BoxFit.cover,
                placeholder: (context, url) => _buildPlaceholder(context),
                errorWidget: (context, url, error) => _buildPlaceholder(context),
              )
            : _buildPlaceholder(context),
      ),
    );
  }

  Widget _buildPlaceholder(BuildContext context) {
    return Container(
      color: context.colorScheme.surfaceContainerHighest,
      child: Padding(
        padding: const EdgeInsets.all(FigmaConstants.spacing32),
        child: CircularProgressIndicator(
          color: AppColors.redLight.withValues(alpha: 0.5),
          strokeWidth: 2,
        ),
      ),
    );
  }
}

