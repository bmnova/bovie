import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';

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
    this.size = 140,
  });

  @override
  Widget build(BuildContext context) {

    return GestureDetector(
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
                      width: 2,
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
              right: 0,
              bottom: 0,
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
        ],
      ),
    );
  }
}

