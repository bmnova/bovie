import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/core/ab_testing/remote_variant_config.dart';
import 'package:bovie/ui/paywall/presentation/widgets/paywall_screen_base.dart';
import 'package:bovie/ui/paywall/presentation/widgets/subscription_plan_row.dart';
import 'package:flutter_mobx/flutter_mobx.dart';


class PaywallScreenA extends StatefulWidget {
  const PaywallScreenA({super.key});

  @override
  State<PaywallScreenA> createState() => _PaywallScreenAState();
}

class _PaywallScreenAState extends State<PaywallScreenA> {
  @override
  Widget build(BuildContext context) => Observer(
      builder: (_) {
        final isFreeTrialEnabled = paywallStore.isFreeTrialEnabled;
        
        final button = AppButton(
          backgroundColor: context.colorScheme.primary,
          foregroundColor: context.colorScheme.onPrimary,
          height: FigmaConstants.buttonHeightLarge.h(context),
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
                        color: context.colorScheme.onPrimary,
                      ),
                    ),
                    Text(
                      localizations.noPaymentNow,
                      style: context.textTheme.bodySmall?.copyWith(
                        fontWeight: FontWeight.normal,
                        color: context.colorScheme.onPrimary,
                      ),
                    ),
                  ],
                )
              : Text(
                  localizations.unlockPro(appName),
                  style: context.textTheme.labelLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: context.colorScheme.onPrimary,
                    fontSize: FigmaConstants.fontSize16.f(context),
                  ),
                ),
        );

        final topContent = Column(
          children: [
            SizedBox(height: FigmaConstants.spacing16.sh(context)),
            // Feature Comparison Table
            FeatureComparisonTable(
              appName: appName,
              store: paywallStore,
            ),
            SizedBox(height: FigmaConstants.spacing28.sh(context)),
            // Enable Free Trial Toggle
            ToggleRow(
              text: localizations.enableFreeTrial,
              value: paywallStore.isFreeTrialEnabled,
              onChanged: paywallStore.setFreeTrialEnabled,
            ),
            SizedBox(height: FigmaConstants.spacing16.sh(context)),
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
