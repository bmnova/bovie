import 'package:flutter/material.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';

/// Custom row widget with leading, middle, and trailing widgets
/// 
/// Supports border, customizable padding, and flexible layout
class CustomRow extends StatelessWidget {
  final Widget? leadingWidget;
  final Widget? middleWidget;
  final Widget? trailingWidget;
  final bool hasBorder;
  final Color? borderColor;
  final double horizontalPadding;
  final double verticalPadding;
  final double? height;
  final double borderRadius;

  CustomRow({
    super.key,
    this.leadingWidget,
    this.middleWidget,
    this.trailingWidget,
    this.hasBorder = false,
    this.borderColor,
    double? horizontalPadding,
    double? verticalPadding,
    this.height,
    this.borderRadius = FigmaConstants.radius12,
  })  : horizontalPadding = horizontalPadding ?? FigmaConstants.rowHorizontalPadding,
        verticalPadding = verticalPadding ?? FigmaConstants.rowVerticalPaddingDefault;

  @override
  Widget build(BuildContext context) {
    final effectiveBorderColor = borderColor ?? AppColors.redLight;

    Widget container = Container(
      padding: EdgeInsets.symmetric(
        horizontal: horizontalPadding,
        vertical: verticalPadding,
      ),
      decoration: hasBorder
          ? BoxDecoration(
              border: Border.all(
                color: effectiveBorderColor,
                width: FigmaConstants.borderWidth1,
              ),
              borderRadius: BorderRadius.circular(borderRadius),
            )
          : null,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Leading widget
          if (leadingWidget != null) leadingWidget!,
          // Middle widget
          if (middleWidget != null) ...[
            const Spacer(),
            middleWidget!,
          ],
          // Trailing widget - Expanded to handle overflow
          if (trailingWidget != null)
            Expanded(
              child: Align(
                alignment: Alignment.centerRight,
                child: trailingWidget!,
              ),
            ),
        ],
      ),
    );

    if (height != null) {
      container = SizedBox(
        height: height,
        child: container,
      );
    }

    return container;
  }
}

