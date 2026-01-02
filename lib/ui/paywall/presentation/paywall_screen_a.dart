import 'package:bovie/generated/l10n.dart';
import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/ui/paywall/presentation/widgets/paywall_screen_base.dart';
import 'package:bovie/ui/paywall/presentation/widgets/subscription_plan_row.dart';
import 'package:flutter_mobx/flutter_mobx.dart';


class PaywallScreenA extends StatelessWidget {
  const PaywallScreenA({super.key});

  @override
  Widget build(BuildContext context) {
    return Observer(
      builder: (_) {
        final isFreeTrialEnabled = paywallStore.isFreeTrialEnabled;
        
        final button = AppButton(
          backgroundColor: AppColors.redLight,
          foregroundColor: AppColors.white,
          height: FigmaConstants.buttonHeightLarge,
          borderRadius: FigmaConstants.radius12,
          enableAnimation: isFreeTrialEnabled,
          onPressed: () {
            // Handle unlock action
          },
          child: isFreeTrialEnabled
              ? Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [

                    Text(
                      localizations.threeDaysFree,
                      style: context.textTheme.labelLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: AppColors.white,
                      ),
                    ),
                    Text(
                      localizations.noPaymentNow,
                      style: context.textTheme.bodySmall?.copyWith(
                        fontWeight: FontWeight.normal,
                        color: AppColors.white,
                      ),
                    ),
                  ],
                )
              : Text(
                  localizations.unlockPro(appName),
                  style: context.textTheme.labelLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: AppColors.white,
                    fontSize: FigmaConstants.fontSize16,
                  ),
                ),
        );

        final topContent = Column(
          children: [
            const SizedBox(height: FigmaConstants.spacing16),
            // Feature Comparison Table
            FeatureComparisonTable(
              appName: appName,
              features: PaywallFeatures.getDefault(),
            ),
            const SizedBox(height: FigmaConstants.spacing28),
            // Enable Free Trial Toggle
            ToggleRow(
              text: localizations.enableFreeTrial,
              value: paywallStore.isFreeTrialEnabled,
              onChanged: paywallStore.setFreeTrialEnabled,
            ),
            const SizedBox(height: FigmaConstants.spacing16),
            // Weekly Plan
            SubscriptionPlanRow(
              plan: SubscriptionPlan.weekly,
              isSelected: paywallStore.selectedPlan == SubscriptionPlan.weekly,
              onTap: () => paywallStore.selectPlan(SubscriptionPlan.weekly),
            ),
          ],
        );

        return PaywallScreenBase(
          topContent: topContent,
          button: button,
          store: paywallStore,
          badgePosition: BadgePosition.center,
          );
      },
    );
  }
}
