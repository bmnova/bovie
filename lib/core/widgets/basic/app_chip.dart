import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';

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
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? context.colorScheme.primary : context.colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isSelected)
              Padding(
                padding: const EdgeInsets.only(right: 8),
                child: Icon(
                  Icons.check,
                  size: 16,
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
}

