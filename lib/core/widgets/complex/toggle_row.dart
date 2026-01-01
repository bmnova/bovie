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
  Widget build(BuildContext context) => CustomRow(
      leadingWidget: FittedText(
        text: text,
        style: context.textTheme.bodyLarge?.copyWith(
          color: AppColors.white,
          fontSize: FigmaConstants.fontSize16,
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
        activeTrackColor: AppColors.grayDark,
        inactiveThumbColor: AppColors.white,
        inactiveTrackColor: AppColors.grayDark,
      ),
      hasBorder: true,
      borderColor: AppColors.redLight,
      horizontalPadding: FigmaConstants.rowHorizontalPadding,
      verticalPadding: FigmaConstants.rowVerticalPaddingSmall,
      borderRadius: FigmaConstants.radius12,
    );
}

