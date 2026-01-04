import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/basic/custom_row.dart';
import 'package:bovie/core/widgets/basic/fitted_text.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/generated/assets.gen.dart';

/// Selectable row widget with icon, title, subtitle, and ending text
/// 
/// Displays different border color and icon based on selection state.
/// State is managed externally (MobX compatible - no internal state)
class SelectableRow extends StatelessWidget {
  final String title;
  final String subtitle;
  final String endingText;
  final bool isSelected;
  final VoidCallback? onTap;
  final double verticalPadding;

  const SelectableRow({
    super.key,
    required this.title,
    required this.subtitle,
    required this.endingText,
    required this.isSelected,
    this.onTap,
    this.verticalPadding = 0,
  });

  @override
  Widget build(BuildContext context) => GestureDetector(
      onTap: onTap,
      child: CustomRow(
        leadingWidget: Row(
          children: [
            // Selection icon
            isSelected
                ? BovieAssets.icons.circleCheckIconRed.svg(
                    width: FigmaConstants.iconSize16.w(context),
                    height: FigmaConstants.iconSize16.h(context),
                  )
                : Container(
                    width: FigmaConstants.iconSize16.w(context),
                    height: FigmaConstants.iconSize16.h(context),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: AppColors.grayDark,
                        width: FigmaConstants.borderWidth1,
                      ),
                    ),
                  ),
            SizedBox(width: FigmaConstants.rowGapBetweenIconAndText.sw(context)),
            // Title and subtitle
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                FittedText(
                  text: title,
                  style: context.textTheme.bodyLarge?.copyWith(
                    color: AppColors.white,
                    fontSize: FigmaConstants.fontSize16.f(context),
                    fontWeight: FontWeight.w600,
                  ),
                  textAlign: TextAlign.left,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: FigmaConstants.rowGapBetweenTitleAndSubtitle.sh(context)),
                FittedText(
                  text: subtitle,
                  style: context.textTheme.bodySmall?.copyWith(
                    color: AppColors.grayDark,
                    fontSize: FigmaConstants.fontSize12.f(context),
                    fontWeight: FontWeight.normal,
                  ),
                  textAlign: TextAlign.left,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ],
        ),
        trailingWidget: FittedText(
          text: endingText,
          style: context.textTheme.bodyLarge?.copyWith(
            color: AppColors.white,
            fontSize: FigmaConstants.fontSize16.f(context),
            fontWeight: FontWeight.w600,
          ),
          textAlign: TextAlign.right,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        hasBorder: true,
        borderColor: isSelected ? AppColors.redLight : AppColors.grayDark,
        horizontalPadding: FigmaConstants.rowHorizontalPadding.sw(context),
        verticalPadding: verticalPadding,
        borderRadius: FigmaConstants.radius12,
      ),
    );
  }


