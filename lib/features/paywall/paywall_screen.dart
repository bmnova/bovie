import 'package:bovie/generated/l10n.dart';
import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/features/paywall/widgets/subscription_plan_row.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:bovie/features/paywall/paywall_store.dart';

import '../../generated/assets.gen.dart';

class PaywallScreen extends StatelessWidget {
  const PaywallScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = PaywallStore();

    return Scaffold(
      backgroundColor: AppColors.black,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: FigmaConstants.spacing20,
            ),
            child: Column(
              children: [
                const SizedBox(height: FigmaConstants.spacing16),
                // Feature Comparison Table
                FeatureComparisonTable(
                  appName: appName,
                  features: [
                    FeatureItem(
                      name: localizations.dailyMovieSuggestions,
                      isAvailableInFree: true,
                      isAvailableInPro: true,
                    ),
                    FeatureItem(
                      name: localizations.aiPoweredMovieInsights,
                      isAvailableInFree: false,
                      isAvailableInPro: true,
                    ),
                    FeatureItem(
                      name: localizations.personalizedWatchlists,
                      isAvailableInFree: false,
                      isAvailableInPro: false,
                    ),
                    FeatureItem(
                      name: localizations.adFreeExperience,
                      isAvailableInFree: false,
                      isAvailableInPro: false,
                    ),
                  ],
                ),
                const SizedBox(height: FigmaConstants.spacing28),
                // Enable Free Trial Toggle
                Observer(
                  builder: (_) => ToggleRow(
                    text: localizations.enableFreeTrial,
                    value: store.isFreeTrialEnabled,
                    onChanged: store.setFreeTrialEnabled,
                  ),
                ),
                const SizedBox(height: FigmaConstants.spacing16),
                // Weekly Plan
                Observer(
                  builder: (_) => SubscriptionPlanRow(
                    plan: SubscriptionPlan.weekly,
                    isSelected: store.selectedPlan == SubscriptionPlan.weekly,
                    onTap: () => store.selectPlan(SubscriptionPlan.weekly),
                  ),
                ),
                const SizedBox(height: FigmaConstants.spacing4),
                // Monthly Plan
                Observer(
                  builder: (_) => SubscriptionPlanRow(
                    plan: SubscriptionPlan.monthly,
                    isSelected: store.selectedPlan == SubscriptionPlan.monthly,
                    onTap: () => store.selectPlan(SubscriptionPlan.monthly),
                  ),
                ),
                const SizedBox(height: FigmaConstants.spacing4),
                // Yearly Plan (with Best Value badge)
                Observer(
                  builder: (_) => SubscriptionPlanRow(
                    plan: SubscriptionPlan.yearly,
                    isSelected: store.selectedPlan == SubscriptionPlan.yearly,
                    onTap: () => store.selectPlan(SubscriptionPlan.yearly),
                  ),
                ),
                const SizedBox(height: FigmaConstants.spacing24),
                // Auto Renewable text
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    BovieAssets.icons.shieldGreen.svg(
                      width: FigmaConstants.iconSize16,
                      height: FigmaConstants.iconSize16,
                    ),
                    const SizedBox(width: FigmaConstants.spacing4),
                    Text(
                      localizations.autoRenewableCancelAnytime,
                      style: context.textTheme.bodySmall?.copyWith(
                        color: AppColors.white,
                        fontSize: FigmaConstants.fontSize10,
                        fontWeight: FontWeight.normal,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: FigmaConstants.spacing16),
                // Unlock Button
                Observer(
                  builder: (_) {
                    final isFreeTrialEnabled = store.isFreeTrialEnabled;
                    
                    return AppButton(
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
                  },
                ),
                const SizedBox(height: FigmaConstants.spacing16),
                // Footer Links
                // TODO: Convert footer links to proper buttons with navigation handlers
                Row(
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
                            fontSize: FigmaConstants.fontSize8,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: FigmaConstants.spacing40),
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
                            fontSize: FigmaConstants.fontSize8,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: FigmaConstants.spacing40),
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
                            fontSize: FigmaConstants.fontSize8,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: FigmaConstants.spacing16),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
