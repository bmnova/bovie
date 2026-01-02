import 'package:bovie/generated/l10n.dart';
import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/ui/paywall/presentation/widgets/paywall_screen_base.dart';

import '../../generated/assets.gen.dart';

/// Figma constants specific to PaywallScreenB
class _FigmaConstants {
  _FigmaConstants._();

  // Background image positioning
  static const double paywallImageWidth = 594.0;
  static const double paywallImageHeight = 1063.0;
  static const double paywallImageTop = -250.0;
  static const double paywallImageLeft = -109.0;

  // Bottom padding between footer and bottom edge
  static const double bottomPadding = 20.0;

  // Gradient overlay
  static const double gradientOpacity = 0.76;
  static const double gradientStop1 = 0.0;
  static const double gradientStop2 = 0.447;
  static const double gradientStop3 = 0.797;
}

class PaywallScreenB extends StatelessWidget {
  const PaywallScreenB({super.key});

  @override
  Widget build(BuildContext context) {
    // Background image with gradient overlay
    final backgroundImage = Stack(
      children: [
        // Background image
        Positioned(
          top: _FigmaConstants.paywallImageTop,
          left: _FigmaConstants.paywallImageLeft,
          width: _FigmaConstants.paywallImageWidth,
          height: _FigmaConstants.paywallImageHeight,
          child: BovieAssets.images.paywallImage.image(
            fit: BoxFit.cover,
            width: _FigmaConstants.paywallImageWidth,
            height: _FigmaConstants.paywallImageHeight,
            errorBuilder: (context, error, stackTrace) => Container(
              color: AppColors.black,
              width: _FigmaConstants.paywallImageWidth,
              height: _FigmaConstants.paywallImageHeight,
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
      onPressed: () {
        // Handle continue action
      },
      backgroundColor: AppColors.redLight,
      foregroundColor: AppColors.white,
      height: FigmaConstants.buttonHeightLarge,
      borderRadius: FigmaConstants.radius12,
      endingIcon: const Icon(
        Icons.arrow_forward,
        size: FigmaConstants.iconSize16,
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
            fontSize: FigmaConstants.fontSize24,
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: FigmaConstants.spacing16),
        // Feature List
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _FeatureListItem(
              text: localizations.dailyMovieSuggestions,
            ),
            const SizedBox(height: FigmaConstants.spacing16),
            _FeatureListItem(
              text: localizations.aiPoweredMovieInsights,
            ),
            const SizedBox(height: FigmaConstants.spacing16),
            _FeatureListItem(
              text: localizations.personalizedWatchlists,
            ),
            const SizedBox(height: FigmaConstants.spacing16),
            _FeatureListItem(
              text: localizations.adFreeExperience,
            ),
          ],
        ),
      ],
    );

    return PaywallScreenBase(
      backgroundImage: backgroundImage,
      topContent: topContent,
      button: button,
      store: paywallStore
    );
  }
}

class _FeatureListItem extends StatelessWidget {
  final String text;

  const _FeatureListItem({
    required this.text,
  });

  @override
  Widget build(BuildContext context) => Row(
      children: [
        BovieAssets.icons.tick.svg(
          width: FigmaConstants.iconSize16,
          height: FigmaConstants.iconSize16,
        ),
        const SizedBox(width: FigmaConstants.spacing12),
        Text(
          text,
          style: context.textTheme.bodyMedium?.copyWith(
            color: AppColors.white,
            fontSize: FigmaConstants.fontSize14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
}

