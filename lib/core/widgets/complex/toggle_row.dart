import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/basic/custom_row.dart';
import 'package:bovie/core/widgets/basic/fitted_text.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';

/// Toggle row widget with text and switch
/// 
/// Displays a text label on the left and a toggle switch on the right
class ToggleRow extends StatelessWidget {
  final String text;
  final bool value;
  final ValueChanged<bool>? onChanged;

  const ToggleRow({
    super.key,
    required this.text,
    required this.value,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    // Calculate row height: vertical padding * 2 + content height
    // Content height is approximately the height of Switch (around 20px on design)
    // Using chipHeight as reference for row height
    final rowHeight = (FigmaConstants.rowVerticalPaddingSmall.sh(context) * 2) + 
                      FigmaConstants.chipHeight.h(context);
    
    return CustomRow(
      leadingWidget: FittedText(
        text: text,
        style: context.textTheme.bodyLarge?.copyWith(
          color: AppColors.white,
          fontSize: FigmaConstants.fontSize16.f(context),
          fontWeight: FontWeight.w600,
        ),
        textAlign: TextAlign.left,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      ),
      trailingWidget: Switch(
        value: value,
        onChanged: onChanged,
        activeThumbColor: AppColors.white,
        activeTrackColor: Colors.green,
        inactiveThumbColor: AppColors.white,
        inactiveTrackColor: AppColors.grayDark,
      ),
      hasBorder: true,
      borderColor: AppColors.redLight,
      horizontalPadding: FigmaConstants.rowHorizontalPadding.sw(context),
      verticalPadding: FigmaConstants.rowVerticalPaddingSmall.sh(context),
      height: rowHeight,
      borderRadius: FigmaConstants.radius12,
    );
  }
}

