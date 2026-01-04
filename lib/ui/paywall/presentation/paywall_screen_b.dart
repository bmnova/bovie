import 'package:bovie/ui/paywall/presentation/widgets/subscription_plan_row.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/core/ab_testing/remote_variant_config.dart';
import 'package:bovie/ui/paywall/presentation/widgets/paywall_screen_base.dart';
import 'package:bovie/app/router/router.dart';

import '../../../generated/assets.gen.dart';

/// Figma constants specific to PaywallScreenB
class _FigmaConstants {
  _FigmaConstants._();

  // Background image positioning
  static const double paywallImageWidth = 594.0;
  static const double paywallImageHeight = 1063.0;
  static const double paywallImageTop = -250.0;
  static const double paywallImageLeft = -109.0;

  // Gradient overlay
  static const double gradientOpacity = 0.76;
  static const double gradientStop1 = 0.0;
  static const double gradientStop2 = 0.447;
  static const double gradientStop3 = 0.797;

  // Feature list spacing
  static const double featureListTopPadding = 29.0;
  static const double featureListBottomPadding = 52.0;
}

class PaywallScreenB extends StatefulWidget {
  const PaywallScreenB({super.key});

  @override
  State<PaywallScreenB> createState() => _PaywallScreenBState();
}

class _PaywallScreenBState extends State<PaywallScreenB> {
  @override
  Widget build(BuildContext context) {
    // Background image with gradient overlay
    final backgroundImage = Stack(
      children: [
        // Background image
        Positioned(
          top: _FigmaConstants.paywallImageTop.h(context),
          left: _FigmaConstants.paywallImageLeft.w(context),
          width: _FigmaConstants.paywallImageWidth.w(context),
          height: _FigmaConstants.paywallImageHeight.h(context),
          child: BovieAssets.images.paywallImage.image(
            fit: BoxFit.cover,
            width: _FigmaConstants.paywallImageWidth.w(context),
            height: _FigmaConstants.paywallImageHeight.h(context),
            errorBuilder: (context, error, stackTrace) => Container(
              color: AppColors.black,
              width: _FigmaConstants.paywallImageWidth.w(context),
              height: _FigmaConstants.paywallImageHeight.h(context),
            ),
          ),
        ),
        // Gradient overlay
        Positioned.fill(
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.transparent,
                  AppColors.black.withValues(alpha: _FigmaConstants.gradientOpacity),
                  AppColors.black,
                ],
                stops: const [
                  _FigmaConstants.gradientStop1,
                  _FigmaConstants.gradientStop2,
                  _FigmaConstants.gradientStop3,
                ],
              ),
            ),
          ),
        ),
      ],
    );

    final button = AppButton(
      text: localizations.continueText,
      onPressed: () async {
        // Mark onboarding as complete and navigate to home
        await onboardingRepository.setOnboardingComplete(true);
        if (mounted) {
          context.go(AppRoutes.home);
        }
      },
      backgroundColor: AppColors.redLight,
      foregroundColor: AppColors.white,
      height: FigmaConstants.buttonHeightLarge.h(context),
      borderRadius: FigmaConstants.radius12,
      endingIcon: Icon(
        Icons.arrow_forward,
        size: FigmaConstants.iconSize16.w(context),
        color: AppColors.white,
      ),
    );

    final topContent = Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // App Name
        Text(
          appName,
          style: context.textTheme.headlineMedium?.copyWith(
            color: AppColors.white,
            fontSize: FigmaConstants.fontSize24.f(context),
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: _FigmaConstants.featureListTopPadding.h(context)),
        // Feature List
        FeatureComparisonTable(
          appName: appName,
          showComparison: false,
          bottomPadding: _FigmaConstants.featureListBottomPadding.h(context),
          store: paywallStore,
        ),
      ],
    );

    return PaywallScreenBase(
      backgroundImage: backgroundImage,
      topContent: topContent,
      button: button,
      store: paywallStore,
      badgePosition: BadgePosition.right,
    );
}
}
