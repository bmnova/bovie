import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';

import '../../utils/figma_constants.dart';

/// Chip component with selection state
class AppChip extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback? onTap;

  const AppChip({
    super.key,
    required this.label,
    this.isSelected = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) => GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: FigmaConstants.spacing16,
          vertical: FigmaConstants.spacing8,
        ),
        decoration: BoxDecoration(
          color: isSelected ? context.colorScheme.primary : context.colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(FigmaConstants.radius20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isSelected)
              Padding(
                padding: const EdgeInsets.only(right: FigmaConstants.spacing8),
                child: Icon(
                  Icons.check,
                  size: FigmaConstants.iconSize16,
                  color: context.colorScheme.onPrimary,
                ),
              ),
            Text(
              label,
              style: context.textTheme.bodyMedium?.copyWith(
                color: isSelected ? context.colorScheme.onPrimary : context.colorScheme.onSurface,
                fontWeight: FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
}

