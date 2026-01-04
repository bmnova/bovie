import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/ui/paywall/presentation/widgets/paywall_auto_renewable_text.dart';
import 'package:bovie/ui/paywall/presentation/widgets/subscription_plan_row.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/ui/paywall/presentation/paywall_store.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

/// Common content widget shared between paywall variants
/// Contains: Auto Renewable text, Button, Footer Links
class PaywallCommonContent extends StatelessWidget {
  final Widget button;

  const PaywallCommonContent({
    super.key,
    required this.button
  });

  @override
  Widget build(BuildContext context) => Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        const PaywallAutoRenewableText(),
        SizedBox(height: FigmaConstants.spacing16.sh(context)),
        button,
        SizedBox(height: FigmaConstants.spacing16.sh(context)),
        const PaywallFooterLinks(),
      ],
    );
}

/// Monthly and Yearly subscription plans widget shared between paywall variants
class PaywallMonthlyYearlyPlans extends StatelessWidget {
  final PaywallStore store;
  final BadgePosition? badgePosition;

  const PaywallMonthlyYearlyPlans({
    super.key,
    required this.store,
    this.badgePosition,
  });

  @override
  Widget build(BuildContext context) => Column(
      children: [
        // Monthly Plan
        Observer(
          builder: (_) => SubscriptionPlanRow(
            plan: SubscriptionPlan.monthly,
            isSelected: store.selectedPlan == SubscriptionPlan.monthly,
            onTap: () => store.selectPlan(SubscriptionPlan.monthly),
          ),
        ),
        SizedBox(height: FigmaConstants.spacing4.sh(context)),
        // Yearly Plan (with Best Value badge)
        Observer(
          builder: (_) => SubscriptionPlanRow(
            plan: SubscriptionPlan.yearly,
            isSelected: store.selectedPlan == SubscriptionPlan.yearly,
            onTap: () => store.selectPlan(SubscriptionPlan.yearly),
            badgePosition: badgePosition,
          ),
        ),
      ],
    );
}

/// Footer links widget shared between paywall variants
class PaywallFooterLinks extends StatelessWidget {
  const PaywallFooterLinks({super.key});

  @override
  Widget build(BuildContext context) => Row(
      children: [
        Expanded(
          child: GestureDetector(
            onTap: () {
              // TODO: Navigate to Terms of Use
            },
            child: Text(
              localizations.termsOfUse,
              textAlign: TextAlign.center,
              style: context.textTheme.bodySmall?.copyWith(
                color: AppColors.white,
                fontSize: FigmaConstants.fontSize8.f(context),
                fontWeight: FontWeight.normal,
              ),
            ),
          ),
        ),
        SizedBox(width: FigmaConstants.spacing40.sw(context)),
        Expanded(
          child: GestureDetector(
            onTap: () {
              // TODO: Handle Restore Purchase
            },
            child: Text(
              localizations.restorePurchase,
              textAlign: TextAlign.center,
              style: context.textTheme.bodySmall?.copyWith(
                color: AppColors.white,
                fontSize: FigmaConstants.fontSize8.f(context),
                fontWeight: FontWeight.normal,
              ),
            ),
          ),
        ),
        SizedBox(width: FigmaConstants.spacing40.sw(context)),
        Expanded(
          child: GestureDetector(
            onTap: () {
              // TODO: Navigate to Privacy Policy
            },
            child: Text(
              localizations.privacyPolicy,
              textAlign: TextAlign.center,
              style: context.textTheme.bodySmall?.copyWith(
                color: AppColors.white,
                fontSize: FigmaConstants.fontSize8.f(context),
                fontWeight: FontWeight.normal,
              ),
            ),
          ),
        ),
      ],
    );
}

