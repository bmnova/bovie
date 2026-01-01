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
                SizedBox(height: FigmaConstants.spacing16),
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
                    Icon(
                      Icons.check_circle,
                      size: FigmaConstants.iconSize16,
                      color: AppColors.white,
                    ),
                    SizedBox(width: FigmaConstants.spacing4),
                    Text(
                      'Auto Renewable, Cancel Anytime',
                      style: context.textTheme.bodySmall?.copyWith(
                        color: AppColors.white,
                        fontSize: FigmaConstants.fontSize10,
                        fontWeight: FontWeight.normal,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: FigmaConstants.spacing16),
                // Unlock Button
                SizedBox(
                  width: double.infinity,
                  height: FigmaConstants.buttonHeightLarge,
                  child: ElevatedButton(
                    onPressed: () {
                      // Handle unlock action
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.redLight,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(
                          FigmaConstants.radius12,
                        ),
                      ),
                    ),
                    child: Text(
                      'Unlock MovieAI PRO',
                      style: context.textTheme.bodyLarge?.copyWith(
                        color: AppColors.white,
                        fontSize: FigmaConstants.fontSize16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: FigmaConstants.spacing16),
                // Footer Links
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    TextButton(
                      onPressed: () {},
                      child: Text(
                        'Terms of Use',
                        style: context.textTheme.bodySmall?.copyWith(
                          color: AppColors.white,
                          fontSize: FigmaConstants.fontSize8,
                          fontWeight: FontWeight.normal,
                        ),
                      ),
                    ),
                    SizedBox(width: FigmaConstants.spacing40),
                    TextButton(
                      onPressed: () {},
                      child: Text(
                        'Restore Purchase',
                        style: context.textTheme.bodySmall?.copyWith(
                          color: AppColors.white,
                          fontSize: FigmaConstants.fontSize8,
                          fontWeight: FontWeight.normal,
                        ),
                      ),
                    ),
                    SizedBox(width: FigmaConstants.spacing40),
                    TextButton(
                      onPressed: () {},
                      child: Text(
                        'Privacy Policy',
                        style: context.textTheme.bodySmall?.copyWith(
                          color: AppColors.white,
                          fontSize: FigmaConstants.fontSize8,
                          fontWeight: FontWeight.normal,
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
