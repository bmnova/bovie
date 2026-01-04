import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/ui/paywall/presentation/widgets/paywall_common_content.dart';
import 'package:bovie/ui/paywall/presentation/widgets/subscription_plan_row.dart';
import 'package:bovie/ui/paywall/presentation/paywall_store.dart';
import 'package:bovie/generated/assets.gen.dart';

/// Base paywall screen widget shared between variants
/// Handles common layout: Monthly/Yearly Plans + Common Content (Auto Renewable + Button + Footer Links)
class PaywallScreenBase extends StatelessWidget {
  final Widget? backgroundImage;
  final Widget? topContent;
  final Widget button;
  final PaywallStore store;
  final BadgePosition? badgePosition;

  const PaywallScreenBase({
    super.key,
    this.backgroundImage,
    this.topContent,
    required this.button,
    required this.store,
    this.badgePosition,
  });

  @override
  Widget build(BuildContext context) {
    Widget content = SafeArea(
      child: Padding(
        padding: EdgeInsets.only(
          left: FigmaConstants.spacing20.sw(context),
          right: FigmaConstants.spacing20.sw(context),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (topContent != null) ...[
              topContent!,
            ],
            // Monthly and Yearly Plans
            PaywallMonthlyYearlyPlans(
              store: store,
              badgePosition: badgePosition,
            ),
            SizedBox(height: FigmaConstants.spacing16.sh(context)),
            // Common Content (Auto Renewable, Button, Footer Links)
            PaywallCommonContent(
              button: button
            ),
            SizedBox(height: FigmaConstants.spacing16.sh(context)),
          ],
        ),
      ),
    );

    // Close button positioned at top right
    final closeButton = Positioned(
      top: 18.0.w(context),
      right: 20.0.sw(context),
      child: SafeArea(
        child: GestureDetector(
          onTap: () => context.pop(),
          child: BovieAssets.icons.close.svg(
            width: FigmaConstants.iconSize12.w(context),
            height: FigmaConstants.iconSize12.h(context),
          ),
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
            closeButton,
          ],
        ),
      );
    }

    // Otherwise, use simple Scaffold without scrolling
    return Scaffold(
      backgroundColor: AppColors.black,
      body: Stack(
        children: [
          content,
          closeButton,
        ],
      ),
    );
  }
}

