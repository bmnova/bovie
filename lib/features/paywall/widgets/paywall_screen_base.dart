import 'package:flutter/material.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/features/paywall/widgets/paywall_common_content.dart';
import 'package:bovie/features/paywall/paywall_store.dart';

/// Base paywall screen widget shared between variants
/// Handles common layout: Monthly/Yearly Plans + Common Content (Auto Renewable + Button + Footer Links)
class PaywallScreenBase extends StatelessWidget {
  final Widget? backgroundImage;
  final Widget? topContent;
  final Widget button;
  final PaywallStore store;

  const PaywallScreenBase({
    super.key,
    this.backgroundImage,
    this.topContent,
    required this.button,
    required this.store
  });

  @override
  Widget build(BuildContext context) {
    Widget content = SafeArea(
      child: Padding(
        padding: const EdgeInsets.only(
          left: FigmaConstants.spacing20,
          right: FigmaConstants.spacing20,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (topContent != null) ...[
              topContent!,
            ],
            // Monthly and Yearly Plans
            PaywallMonthlyYearlyPlans(store: store),
            const SizedBox(height: FigmaConstants.spacing16),
            // Common Content (Auto Renewable, Button, Footer Links)
            PaywallCommonContent(
              button: button
            ),
            SizedBox(height: FigmaConstants.spacing16,),
          ],
        ),
      ),
    );

    // If background image is provided, wrap in Stack with Column that has Spacer
    if (backgroundImage != null) {
      return Scaffold(
        backgroundColor: AppColors.black,
        body: Stack(
          children: [
            backgroundImage!,
            Column(
              children: [
                const Spacer(),
                content,
              ],
            ),
          ],
        ),
      );
    }

    // Otherwise, use simple Scaffold without scrolling
    return Scaffold(
      backgroundColor: AppColors.black,
      body: content,
    );
  }
}

