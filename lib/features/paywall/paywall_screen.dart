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
            padding: EdgeInsets.symmetric(
              horizontal: FigmaConstants.spacing20,
            ),
            child: Column(
              children: [
                SizedBox(height: FigmaConstants.spacing16),
                // Feature Comparison Table
                FeatureComparisonTable(
                  appName: appName,
                  features: const [
                    FeatureItem(
                      name: 'Daily Movie Suggestions',
                      isAvailableInFree: true,
                      isAvailableInPro: true,
                    ),
                    FeatureItem(
                      name: 'AI-Powered Movie Insights',
                      isAvailableInFree: false,
                      isAvailableInPro: true,
                    ),
                    FeatureItem(
                      name: 'Personalized Watchlists',
                      isAvailableInFree: false,
                      isAvailableInPro: false,
                    ),
                    FeatureItem(
                      name: 'Ad-Free Experience',
                      isAvailableInFree: false,
                      isAvailableInPro: false,
                    ),
                  ],
                ),
                SizedBox(height: 28),
                // Enable Free Trial Toggle
                Observer(
                  builder: (_) => ToggleRow(
                    text: 'Enable Free Trial',
                    value: store.isFreeTrialEnabled,
                    onChanged: store.setFreeTrialEnabled,
                  ),
                ),
                SizedBox(height: FigmaConstants.spacing16),
                // Weekly Plan
                Observer(
                  builder: (_) => SubscriptionPlanRow(
                    plan: SubscriptionPlan.weekly,
                    isSelected: store.selectedPlan == SubscriptionPlan.weekly,
                    onTap: () => store.selectPlan(SubscriptionPlan.weekly),
                  ),
                ),
                SizedBox(height: FigmaConstants.spacing4),
                // Monthly Plan
                Observer(
                  builder: (_) => SubscriptionPlanRow(
                    plan: SubscriptionPlan.monthly,
                    isSelected: store.selectedPlan == SubscriptionPlan.monthly,
                    onTap: () => store.selectPlan(SubscriptionPlan.monthly),
                  ),
                ),
                SizedBox(height: FigmaConstants.spacing4),
                // Yearly Plan (with Best Value badge)
                Observer(
                  builder: (_) => SubscriptionPlanRow(
                    plan: SubscriptionPlan.yearly,
                    isSelected: store.selectedPlan == SubscriptionPlan.yearly,
                    onTap: () => store.selectPlan(SubscriptionPlan.yearly),
                  ),
                ),
                SizedBox(height: FigmaConstants.spacing24),
                // Auto Renewable text
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    BovieAssets.icons.shieldGreen.svg(
                      width: FigmaConstants.iconSize16,
                      height: FigmaConstants.iconSize16,
                    ),
                    SizedBox(width: FigmaConstants.spacing4),
                    Text(
                      'Auto Renewable, Cancel Anytime',
                      style: context.textTheme.bodySmall?.copyWith(
                        color: AppColors.white,
                        fontSize: FigmaConstants.fontSize10,
                        fontWeight: FontWeight.normal,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: FigmaConstants.spacing16),
                // Unlock Button
                Observer(
                  builder: (_) {
                    final isFreeTrialEnabled = store.isFreeTrialEnabled;
                    
                    return AppButton(
                      child: isFreeTrialEnabled
                          ? Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  '3 Days Free',
                                  style: context.textTheme.labelLarge?.copyWith(
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.white,
                                  ),
                                ),
                                Text(
                                  'No Payment Now',
                                  style: context.textTheme.bodySmall?.copyWith(
                                    fontWeight: FontWeight.normal,
                                    color: AppColors.white,
                                  ),
                                ),
                              ],
                            )
                          : Text(
                              'Unlock MovieAI PRO',
                              style: context.textTheme.labelLarge?.copyWith(
                                fontWeight: FontWeight.w600,
                                color: AppColors.white,
                              ),
                            ),
                      onPressed: () {
                        // Handle unlock action
                      },
                      backgroundColor: AppColors.redLight,
                      foregroundColor: AppColors.white,
                      height: FigmaConstants.buttonHeightLarge,
                      borderRadius: FigmaConstants.radius12,
                      enableAnimation: isFreeTrialEnabled,
                    );
                  },
                ),
                SizedBox(height: FigmaConstants.spacing16),
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
                          'Terms of Use',
                          textAlign: TextAlign.center,
                          style: context.textTheme.bodySmall?.copyWith(
                            color: AppColors.white,
                            fontSize: FigmaConstants.fontSize8,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(width: FigmaConstants.spacing40),
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          // TODO: Handle Restore Purchase
                        },
                        child: Text(
                          'Restore Purchase',
                          textAlign: TextAlign.center,
                          style: context.textTheme.bodySmall?.copyWith(
                            color: AppColors.white,
                            fontSize: FigmaConstants.fontSize8,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(width: FigmaConstants.spacing40),
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          // TODO: Navigate to Privacy Policy
                        },
                        child: Text(
                          'Privacy Policy',
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
                SizedBox(height: FigmaConstants.spacing16),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
