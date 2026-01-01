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

/// Figma constants specific to PaywallScreenVariantB
class _FigmaConstants {
  _FigmaConstants._();

  // Background image positioning
  static const double paywallImageWidth = 594.0;
  static const double paywallImageHeight = 1063.0;
  static const double paywallImageTop = -250.0;
  static const double paywallImageLeft = -109.0;

  // Content padding
  static const double contentBottomPadding = 33.0;

  // Gradient overlay
  static const double gradientOpacity = 0.76;
  static const double gradientStop1 = 0.0;
  static const double gradientStop2 = 0.447;
  static const double gradientStop3 = 0.797;
}

class PaywallScreenVariantB extends StatelessWidget {
  const PaywallScreenVariantB({super.key});

  @override
  Widget build(BuildContext context) {
    final store = PaywallStore();

    return Scaffold(
      backgroundColor: AppColors.black,
      body: Stack(
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
          // Content
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.only(
                left: FigmaConstants.spacing20,
                right: FigmaConstants.spacing20,
                bottom: _FigmaConstants.contentBottomPadding,
              ),
              child: Column(
                children: [
                  const Spacer(),
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
                    const SizedBox(height: FigmaConstants.spacing16),
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
                    const SizedBox(height: FigmaConstants.spacing16),
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
                    // Continue Button
                    AppButton(
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
                    ),
                    const SizedBox(height: FigmaConstants.spacing16),
                    // Footer Links
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
                  ],
                ),
              ),
            ),
          
        ],
      ),
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

