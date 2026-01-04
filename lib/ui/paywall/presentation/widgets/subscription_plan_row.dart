import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/complex/selectable_row.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';

/// Badge position for Best Value badge
enum BadgePosition {
  center,
  right,
}

/// Wrapper widget for SelectableRow that uses subscription plan properties
///
/// This widget encapsulates the subscription plan configuration and displays
/// it using SelectableRow. All plan properties come from PaywallVariantConstants.
class SubscriptionPlanRow extends StatelessWidget {
  final SubscriptionPlan plan;
  final bool isSelected;
  final VoidCallback? onTap;
  final BadgePosition? badgePosition;

  const SubscriptionPlanRow({
    super.key,
    required this.plan,
    required this.isSelected,
    this.onTap,
    this.badgePosition,
  });

  @override
  Widget build(BuildContext context) {
    final planProps = PaywallVariantConstants.getPlanProps(plan);

    // Add extra padding for badge space on all rows to keep consistent height
    Widget row = Padding(
      padding: EdgeInsets.only(
        top: FigmaConstants.badgeExtraPadding.sh(context),
        bottom: FigmaConstants.badgeExtraPadding.sh(context),
      ),
      child: SelectableRow(
        title: planProps.title,
        subtitle: planProps.subtitle,
        endingText: planProps.priceDisplay,
        isSelected: isSelected,
        onTap: onTap,
        verticalPadding: FigmaConstants.rowVerticalPaddingMedium.sh(context),
      ),
    );

    // Add Best Value badge if needed
    if (planProps.hasBestValueBadge) {
      final badgeWidget = Container(
        height: FigmaConstants.badgeHeight.h(context),
        padding: EdgeInsets.symmetric(
          horizontal: FigmaConstants.badgeHorizontalPadding.sw(context),
          vertical: FigmaConstants.badgeVerticalPadding.sh(context),
        ),
        decoration: BoxDecoration(
          color: AppColors.redLight,
          borderRadius: BorderRadius.circular(
            FigmaConstants.radius12,
          ),
        ),
        child: Text(
          localizations.bestValue,
          style: context.textTheme.bodySmall?.copyWith(
            color: AppColors.white,
            fontSize: FigmaConstants.badgeFontSize.f(context),
            fontWeight: FontWeight.w500,
          ),
        ),
      );

      // Apply offset only for Paywall B (BadgePosition.center)
      if (badgePosition == BadgePosition.center) {
        return Stack(
          clipBehavior: Clip.none,
          children: [
            row,
            Positioned.fill(
              child: Align(
                alignment: Alignment.topCenter,
                child: badgeWidget,
              ),
            ),
          ],
        );
      }

      // Default position: top right (for Paywall A)
      return Stack(
        clipBehavior: Clip.none,
        children: [
          row,
          Positioned(
            top: 0,
            right: FigmaConstants.badgeRightPadding.sw(context),
            child: badgeWidget,
          ),
        ],
      );
    }

    return row;
  }
}

