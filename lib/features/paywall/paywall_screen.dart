import 'package:bovie/generated/l10n.dart';
import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';

class PaywallScreen extends StatelessWidget {
  const PaywallScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.black,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: FeatureComparisonTable(
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
        ),
      ),
    );
  }
}
