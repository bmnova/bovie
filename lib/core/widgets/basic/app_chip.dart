import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/generated/assets.gen.dart';

import '../../utils/figma_constants.dart';
import '../../../app/theme/app_colors.dart';

/// Figma constants for app chip
class _FigmaConstants {
  _FigmaConstants._();

  // Chip colors from Figma
  static const Color selectedBackgroundColor = AppColors.redLight; // #CB2C2C
  static const Color unselectedBackgroundColor = AppColors.gray; // #DED5D5
  static const Color selectedTextColor = AppColors.white; // #F3E9E9
  static const Color unselectedTextColor = AppColors.black; // #0F0E0E

  // Chip dimensions
  static const double chipHeight = 32.0;
  static const double chipHorizontalPadding = 20.0;
  static const double chipVerticalPadding = 4.0;
  static const double chipBorderRadius = 16.0;
  static const double chipGap = 12.0; // Gap between chips

  // Checkmark icon
  static const double checkmarkIconSize = 15.0;
  static const double checkmarkIconGap = 4.0;
}

/// Chip component with selection state
/// Matches Figma design: selected (red #CB2C2C), unselected (gray #DED5D5)
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
        height: _FigmaConstants.chipHeight,
        padding: const EdgeInsets.symmetric(
          horizontal: _FigmaConstants.chipHorizontalPadding,
          vertical: _FigmaConstants.chipVerticalPadding,
        ),
        decoration: BoxDecoration(
          color: isSelected
              ? _FigmaConstants.selectedBackgroundColor
              : _FigmaConstants.unselectedBackgroundColor,
          borderRadius: BorderRadius.circular(_FigmaConstants.chipBorderRadius),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isSelected) ...[
              BovieAssets.icons.tick.svg(
                width: _FigmaConstants.checkmarkIconSize,
                height: _FigmaConstants.checkmarkIconSize,
              ),
              const SizedBox(width: _FigmaConstants.checkmarkIconGap),
            ],
            Text(
              label,
              style: context.textTheme.bodyMedium?.copyWith(
                color: isSelected
                    ? _FigmaConstants.selectedTextColor
                    : _FigmaConstants.unselectedTextColor,
                fontSize: FigmaConstants.fontSize16,
                fontWeight: FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
}

