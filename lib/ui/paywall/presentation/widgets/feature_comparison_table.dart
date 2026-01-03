import 'package:flutter/material.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/core/widgets/basic/fitted_text.dart';
import 'package:bovie/generated/assets.gen.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/core/ab_testing/paywall_config.dart';
import 'package:bovie/ui/paywall/presentation/paywall_store.dart';
import 'package:flutter_mobx/flutter_mobx.dart';

class _FigmaConstants {
  _FigmaConstants._();

  // Pro gradient border stops
  static const List<double> proGradientStops = [0.2, 0.5, 0.8];
}

/// Feature comparison table widget for paywall screen
/// 
/// Displays a table comparing FREE and PRO plans with features and checkmarks/X icons
/// When [showComparison] is false, displays a simple list with tick icons (for PaywallScreenB)
class FeatureComparisonTable extends StatelessWidget {
  final String appName;
  final List<FeatureItem>? features;
  final PaywallStore? store;
  final VoidCallback? onClose;
  final bool showComparison;
  final double? bottomPadding;

  const FeatureComparisonTable({
    super.key,
    required this.appName,
    this.features,
    this.store,
    this.onClose,
    this.showComparison = true,
    this.bottomPadding,
  }) : assert(
          features != null || store != null,
          'Either features or store must be provided',
        );

  @override
  Widget build(BuildContext context) {
    // If store is provided, use Observer to react to changes
    if (store != null) {
      return Observer(
        builder: (_) {
          final effectiveFeatures = PaywallFeatures.getFeaturesForStore(store!);
          return _buildContent(context, effectiveFeatures);
        },
      );
    } else {
      // Use provided features directly
      return _buildContent(context, features!);
    }
  }

  Widget _buildContent(BuildContext context, List<FeatureItem> effectiveFeatures) {
    if (showComparison) {
      // Comparison table mode (PaywallScreenA)
      return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // App Name
        const SizedBox(height: FigmaConstants.spacing8),
        FittedText(
          text: appName,
          style: context.textTheme.titleLarge?.copyWith(
              color: AppColors.white,
                fontSize: FigmaConstants.fontSize24,
                fontWeight: FontWeight.bold,
              ),
          textAlign: TextAlign.center,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        const SizedBox(height: FigmaConstants.spacing8),
        
        // Feature Comparison Table (includes headers)
        _FeatureTable(
            features: effectiveFeatures,
            store: store,
        ),
      ],
    );
    } else {
      // Simple list mode (PaywallScreenB)
      // Filter to show only active features (isAvailableInPro: true)
      final activeFeatures = effectiveFeatures
          .where((feature) => feature.isAvailableInPro)
          .toList();
      
      return Padding(
        padding: EdgeInsets.only(bottom: bottomPadding ?? 0.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ...activeFeatures.asMap().entries.map((entry) {
              final index = entry.key;
              final feature = entry.value;
              return Column(
                children: [
                  if (index > 0) const SizedBox(height: FigmaConstants.spacing16),
                  _FeatureListItem(
                    text: feature.name,
                  ),
                ],
              );
            }),
          ],
        ),
      );
    }
  }
}

/// Individual feature item in the comparison table
class FeatureItem {
  final String name;
  final bool isAvailableInFree;
  final bool isAvailableInPro;

  const FeatureItem({
    required this.name,
    required this.isAvailableInFree,
    required this.isAvailableInPro,
  });
}


/// Paywall features list shared between PaywallScreenA and PaywallScreenB
class PaywallFeatures {
  PaywallFeatures._();

  /// Get the default list of paywall features (static, used for feature names)
  static List<String> getFeatureNames() => [
    localizations.dailyMovieSuggestions,
    localizations.aiPoweredMovieInsights,
    localizations.personalizedWatchlists,
    localizations.adFreeExperience,
  ];

  /// Get features based on store state (plan and free trial status)
  static List<FeatureItem> getFeaturesForStore(PaywallStore store) {
    final featureNames = getFeatureNames();
    final isFreeTrialEnabled = store.isFreeTrialEnabled;
    
    // If free trial is enabled, all features are available in PRO
    final proFeatures = isFreeTrialEnabled
        ? PaywallConfig.getFeaturesForFreeMode()
        : PaywallConfig.getFeaturesForPlan(store.selectedPlan);
    
    // Free mode always has all features enabled
    final freeFeatures = PaywallConfig.getFeaturesForFreeMode();
    
    return List.generate(featureNames.length, (index) {
      return FeatureItem(
        name: featureNames[index],
        isAvailableInFree: freeFeatures[index],
        isAvailableInPro: proFeatures[index],
      );
    });
  }

  /// Get the default list of paywall features (legacy method, kept for backward compatibility)
  static List<FeatureItem> getDefault() => [
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
    ];
}

class _FeatureTable extends StatelessWidget {
  final List<FeatureItem> features;
  final PaywallStore? store;

  const _FeatureTable({
    required this.features,
    this.store,
  });

  @override
  Widget build(BuildContext context) {
    // Calculate column width based on text width + 8px padding on each side
    final textStyle = context.textTheme.bodyLarge?.copyWith(
      color: AppColors.white,
      fontSize: FigmaConstants.fontSize16,
      fontWeight: FontWeight.w600,
    );

    // Measure FREE text width
    final freeTextPainter = TextPainter(
      text: TextSpan(text: localizations.free, style: textStyle),
      textDirection: TextDirection.ltr,
    );
    freeTextPainter.layout();
    final freeHeaderWidth = freeTextPainter.width + (FigmaConstants.spacing8 * 2); // 8px left + 8px right

    // Measure PRO text width
    final proTextPainter = TextPainter(
      text: TextSpan(text: localizations.pro, style: textStyle),
      textDirection: TextDirection.ltr,
    );
    proTextPainter.layout();
    // PRO has gradient border with borderWidth (1.63px) padding on each side
    // Add extra padding to ensure text fits properly (accounting for Stack/Padding constraints)
    // PRO has gradient border with borderWidth (1.63px) padding on each side
    // Add extra padding to ensure text fits properly (accounting for Stack/Padding constraints)
    final proHeaderWidth = proTextPainter.width + (FigmaConstants.spacing8 * 2) + (FigmaConstants.borderWidthPro * 2) + FigmaConstants.spacing4; // 8px left + 8px right + border padding + extra safety margin

    // Use header width which includes padding, but ensure minimum width for icons
    const iconColumnMinWidth = (FigmaConstants.spacing8 * 2) + FigmaConstants.iconSize24; // 40px
    final freeColumnWidth = freeHeaderWidth > iconColumnMinWidth ? freeHeaderWidth : iconColumnMinWidth;
    final proColumnWidth = proHeaderWidth > iconColumnMinWidth ? proHeaderWidth : iconColumnMinWidth;

    return SizedBox(
      height: FigmaConstants.featureTableContainerHeight,
      child: Align(
        alignment: Alignment.bottomCenter,
        child: Table(
          defaultVerticalAlignment: TableCellVerticalAlignment.middle,
          columnWidths: {
            0: const FlexColumnWidth(1), // Feature names - flexible
            1: const FixedColumnWidth(FigmaConstants.spacing12), // Spacing between feature names and columns
            2: FixedColumnWidth(freeColumnWidth), // FREE column
            3: const FixedColumnWidth(FigmaConstants.spacing12), // Spacing between FREE and PRO
            4: FixedColumnWidth(proColumnWidth), // PRO column
          },
          children: [
            // Header Row
            TableRow(
              children: [
                const SizedBox(), // Feature names column
                const SizedBox(width: FigmaConstants.spacing12),
                _PlanHeaderCell(
                  planName: localizations.free,
                  hasBorder: false,
                  isFirstRow: true,
                  isLastRow: features.isEmpty,
                ),
                const SizedBox(width: FigmaConstants.spacing12),
                _PlanHeaderCell(
                  planName: localizations.pro,
                  hasBorder: true,
                  isFirstRow: true,
                  isLastRow: features.isEmpty,
                ),
              ],
            ),
            // Feature rows (no spacing rows - using internal padding instead)
            ...features.asMap().entries.map((entry) {
              final index = entry.key;
              final feature = entry.value;
              final isLastFeature = index == features.length - 1;

              return TableRow(
                children: [
                  _FeatureNameCell(
                    feature: feature,
                    isFirstFeature: index == 0,
                    isLastFeature: isLastFeature,
                  ),
                  const SizedBox(width: FigmaConstants.spacing12),
                  _FeatureIconCell(
                    isAvailable: feature.isAvailableInFree,
                    isPro: false,
                    isFirstRow: false,
                    isLastRow: isLastFeature,
                    featureIndex: index,
                    store: store,
                  ),
                  const SizedBox(width: FigmaConstants.spacing12),
                  _FeatureIconCell(
                    isAvailable: feature.isAvailableInPro,
                    isPro: true,
                    isFirstRow: false,
                    isLastRow: isLastFeature,
                    featureIndex: index,
                    store: store,
                  ),
                ],
              );
            }),
          ],
        ),
      ),
    );
  }
}

class _PlanHeaderCell extends StatelessWidget {
  final String planName;
  final bool hasBorder;
  final bool isFirstRow;
  final bool isLastRow;

  const _PlanHeaderCell({
    required this.planName,
    required this.hasBorder,
    this.isFirstRow = true,
    this.isLastRow = false,
  });

  @override
  Widget build(BuildContext context) {
    // Row height: 24px content + 8px top padding + 8px bottom padding = 40px total
     const rowPadding = FigmaConstants.spacing8;
     const horizontalPadding = FigmaConstants.spacing8;
     const rowHeight = FigmaConstants.featureTableRowContentHeight + (rowPadding * 2); // 24 + 8 + 8 = 40px
    
    final titleWidget = hasBorder
        ? _GradientBorderTitle(text: planName)
        : _PlainTitle(text: planName);

    return Container(
      height: rowHeight,
      padding: const EdgeInsets.symmetric(
        horizontal: horizontalPadding,
        vertical: rowPadding,
      ),
      decoration: hasBorder
          ? BoxDecoration(
              border: Border(
          left: const BorderSide(color: AppColors.redLight, width: FigmaConstants.borderWidth1),
          right: const BorderSide(color: AppColors.redLight, width: FigmaConstants.borderWidth1),
                top: isFirstRow
              ? const BorderSide(color: AppColors.redLight, width: FigmaConstants.borderWidth1)
                    : BorderSide.none,
                bottom: isLastRow
              ? const BorderSide(color: AppColors.redLight, width: FigmaConstants.borderWidth1)
                    : BorderSide.none,
              ),
              borderRadius: isFirstRow && isLastRow
                  ? BorderRadius.circular(FigmaConstants.radius8)
                  : isFirstRow
                      ? const BorderRadius.only(
                          topLeft: Radius.circular(FigmaConstants.radius8),
                          topRight: Radius.circular(FigmaConstants.radius8),
                        )
                      : isLastRow
                          ? const BorderRadius.only(
                              bottomLeft: Radius.circular(FigmaConstants.radius8),
                              bottomRight: Radius.circular(FigmaConstants.radius8),
                            )
                          : null,
            )
          : null,
      child: Center(child: titleWidget),
    );
  }
}

/// Title widget with gradient border for PRO
class _GradientBorderTitle extends StatelessWidget {
  final String text;

  const _GradientBorderTitle({
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    const borderWidth = FigmaConstants.borderWidthPro;
    
    return Stack(
      children: [
        // Gradient border (outer container)
        // Figma: linear-gradient(270deg, rgba(8, 9, 10, 0) 20%, #CB2C2C 50%, rgba(8, 9, 10, 0) 80%)
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
              colors: const [
                Colors.transparent, // rgba(8, 9, 10, 0) at 20%
                AppColors.redLight, // #CB2C2C at 50%
                Colors.transparent, // rgba(8, 9, 10, 0) at 80%
              ],
              stops: _FigmaConstants.proGradientStops,
            ),
            borderRadius: BorderRadius.circular(FigmaConstants.radius4),
          ),
        ),
        // Inner container with black background (creates border effect)
        Positioned.fill(
          child: Padding(
            padding: const EdgeInsets.all(borderWidth),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.black,
                borderRadius: BorderRadius.circular(FigmaConstants.radius4 - borderWidth),
              ),
              child: Center(
                child: UnconstrainedBox(
                  constrainedAxis: Axis.vertical,
                  child: Text(
                    text,
                    style: context.textTheme.bodyLarge?.copyWith(
                      color: AppColors.white,
                          fontSize: FigmaConstants.fontSize16,
                          fontWeight: FontWeight.w600,
                        ),
                    textAlign: TextAlign.center,
                    maxLines: 1,
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

/// Plain title widget for FREE
class _PlainTitle extends StatelessWidget {
  final String text;

  const _PlainTitle({
    required this.text,
  });

  @override
  Widget build(BuildContext context) => Text(
      text,
      style: context.textTheme.bodyLarge?.copyWith(
      color: AppColors.white,
            fontSize: FigmaConstants.fontSize16,
            fontWeight: FontWeight.w600,
          ),
      textAlign: TextAlign.center,
      maxLines: 1,
    );
}

class _FeatureNameCell extends StatelessWidget {
  final FeatureItem feature;
  final bool isFirstFeature;
  final bool isLastFeature;

  const _FeatureNameCell({
    required this.feature,
    this.isFirstFeature = false,
    this.isLastFeature = false,
  });

  @override
  Widget build(BuildContext context) {
    // Row height: 24px content + 8px top padding + 8px bottom padding = 40px total
    const rowPadding = FigmaConstants.spacing8;
    const rowHeight = FigmaConstants.featureTableRowContentHeight + (rowPadding * 2); // 24 + 8 + 8 = 40px

    return Container(
      height: rowHeight,
      padding: const EdgeInsets.symmetric(
        vertical: rowPadding,
      ),
      child: Align(
        alignment: Alignment.centerLeft,
        child: FittedBox(
          fit: BoxFit.scaleDown,
          alignment: Alignment.centerLeft,
          child: Text(
            feature.name,
            style: context.textTheme.bodyMedium?.copyWith(
              color: AppColors.white,
                  fontSize: FigmaConstants.fontSize14,
                  fontWeight: FontWeight.w600,
                ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ),
    );
  }
}

class _FeatureIconCell extends StatelessWidget {
  final bool isAvailable;
  final bool isPro;
  final bool isFirstRow;
  final bool isLastRow;
  final int featureIndex;
  final PaywallStore? store;

  const _FeatureIconCell({
    required this.isAvailable,
    required this.isPro,
    this.isFirstRow = false,
    this.isLastRow = false,
    this.featureIndex = 0,
    this.store,
  });

  @override
  Widget build(BuildContext context) {
    // Row height: 24px content + 8px top padding + 8px bottom padding = 40px total
    const rowPadding = FigmaConstants.spacing8;
    const rowHeight = FigmaConstants.featureTableRowContentHeight + (rowPadding * 2); // 24 + 8 + 8 = 40px

    // Check if we need animation (only for PRO column, features 3 and 4, weekly <-> monthly transitions)
    final needsAnimation = isPro && 
        store != null && 
        store!.previousPlan != null &&
        (featureIndex == 2 || featureIndex == 3) && // 3rd and 4th features (0-indexed: 2, 3)
        ((store!.previousPlan == SubscriptionPlan.weekly && store!.selectedPlan == SubscriptionPlan.monthly) ||
         (store!.previousPlan == SubscriptionPlan.monthly && store!.selectedPlan == SubscriptionPlan.weekly));

    // Get previous state for animation
    bool? previousAvailable;
    if (needsAnimation && store != null && store!.previousPlan != null) {
      final previousFeatures = PaywallConfig.getFeaturesForPlan(store!.previousPlan!);
      previousAvailable = previousFeatures[featureIndex];
    }

    Widget iconWidget = _FeatureIcon(
      isAvailable: isAvailable,
      isPro: isPro,
    );

    // Apply animation for 3rd and 4th features during weekly <-> monthly transitions
    if (needsAnimation) {
      if (featureIndex == 2) {
        // 3rd feature: Slide from bottom + shake animation
        iconWidget = _AnimatedFeatureIcon(
          isAvailable: isAvailable,
          isPro: isPro,
          previousAvailable: previousAvailable,
          animationType: _FeatureAnimationType.slideUpShake,
        );
      } else if (featureIndex == 3) {
        // 4th feature: Shake up animation
        iconWidget = _AnimatedFeatureIcon(
          isAvailable: isAvailable,
          isPro: isPro,
          previousAvailable: previousAvailable,
          animationType: _FeatureAnimationType.shakeUp,
        );
      }
    }

    Widget child = Container(
      height: rowHeight,
      padding: const EdgeInsets.only(
        left: FigmaConstants.spacing8,
        right: FigmaConstants.spacing8,
        top: rowPadding,
        bottom: rowPadding,
      ),
      child: SizedBox(
        width: FigmaConstants.iconSize24,
        height: FigmaConstants.iconSize24,
        child: iconWidget,
      ),
    );

    // Add border for PRO column
    if (isPro) {
      return Container(
        decoration: BoxDecoration(
          border: Border(
            left: const BorderSide(color: AppColors.redLight, width: FigmaConstants.borderWidth1),
            right: const BorderSide(color: AppColors.redLight, width: FigmaConstants.borderWidth1),
            top: isFirstRow
                ? const BorderSide(color: AppColors.redLight, width: FigmaConstants.borderWidth1)
                : BorderSide.none,
            bottom: isLastRow
                ? const BorderSide(color: AppColors.redLight, width: FigmaConstants.borderWidth1)
                : BorderSide.none,
          ),
          borderRadius: isFirstRow && isLastRow
              ? BorderRadius.circular(FigmaConstants.radius8)
              : isFirstRow
                  ? const BorderRadius.only(
                      topLeft: Radius.circular(FigmaConstants.radius8),
                      topRight: Radius.circular(FigmaConstants.radius8),
                    )
                  : isLastRow
                      ? const BorderRadius.only(
                          bottomLeft: Radius.circular(FigmaConstants.radius8),
                          bottomRight: Radius.circular(FigmaConstants.radius8),
                        )
                      : null,
        ),
        child: child,
      );
    }

    return child;
  }
}

enum _FeatureAnimationType {
  slideUpShake,
  shakeUp,
}

class _AnimatedFeatureIcon extends StatefulWidget {
  final bool isAvailable;
  final bool isPro;
  final bool? previousAvailable;
  final _FeatureAnimationType animationType;

  const _AnimatedFeatureIcon({
    required this.isAvailable,
    required this.isPro,
    this.previousAvailable,
    required this.animationType,
  });

  @override
  State<_AnimatedFeatureIcon> createState() => _AnimatedFeatureIconState();
}

class _AnimatedFeatureIconState extends State<_AnimatedFeatureIcon>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _slideAnimation;
  late Animation<double> _shakeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    if (widget.animationType == _FeatureAnimationType.slideUpShake) {
      // Slide from bottom + shake
      _slideAnimation = Tween<double>(begin: 1.0, end: 0.0).animate(
        CurvedAnimation(
          parent: _controller,
          curve: const Interval(0.0, 0.4, curve: Curves.easeOut),
        ),
      );
      _shakeAnimation = TweenSequence<double>([
        TweenSequenceItem(tween: Tween<double>(begin: 0.0, end: -3.0), weight: 1),
        TweenSequenceItem(tween: Tween<double>(begin: -3.0, end: 3.0), weight: 1),
        TweenSequenceItem(tween: Tween<double>(begin: 3.0, end: -2.0), weight: 1),
        TweenSequenceItem(tween: Tween<double>(begin: -2.0, end: 1.0), weight: 1),
        TweenSequenceItem(tween: Tween<double>(begin: 1.0, end: 0.0), weight: 1),
      ]).animate(
        CurvedAnimation(
          parent: _controller,
          curve: const Interval(0.2, 1.0, curve: Curves.elasticOut),
        ),
      );
    } else {
      // Shake up
      _shakeAnimation = TweenSequence<double>([
        TweenSequenceItem(tween: Tween<double>(begin: 0.0, end: -2.0), weight: 1),
        TweenSequenceItem(tween: Tween<double>(begin: -2.0, end: 2.0), weight: 1),
        TweenSequenceItem(tween: Tween<double>(begin: 2.0, end: -1.5), weight: 1),
        TweenSequenceItem(tween: Tween<double>(begin: -1.5, end: 1.0), weight: 1),
        TweenSequenceItem(tween: Tween<double>(begin: 1.0, end: 0.0), weight: 1),
      ]).animate(
        CurvedAnimation(
          parent: _controller,
          curve: Curves.elasticOut,
        ),
      );
      _slideAnimation = const AlwaysStoppedAnimation(0.0);
    }

    // Start animation when transitioning between weekly and monthly
    _controller.forward(from: 0.0);
  }

  @override
  void didUpdateWidget(_AnimatedFeatureIcon oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.isAvailable != widget.isAvailable || 
        oldWidget.previousAvailable != widget.previousAvailable) {
      _controller.reset();
      _controller.forward();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        Widget icon = _FeatureIcon(
          isAvailable: widget.isAvailable,
          isPro: widget.isPro,
        );

        if (widget.animationType == _FeatureAnimationType.slideUpShake) {
          // Slide from bottom + shake (3rd feature)
          return Transform.translate(
            offset: Offset(
              _shakeAnimation.value,
              _slideAnimation.value * 15 + _shakeAnimation.value * 0.3,
            ),
            child: icon,
          );
        } else {
          // Shake up (4th feature)
          return Transform.translate(
            offset: Offset(
              _shakeAnimation.value * 0.5, // Less horizontal shake
              _shakeAnimation.value * -2.0, // Shake upward more
            ),
            child: icon,
          );
        }
      },
    );
  }
}

class _FeatureIcon extends StatelessWidget {
  final bool isAvailable;
  final bool isPro;

  const _FeatureIcon({
    required this.isAvailable,
    required this.isPro,
  });

  @override
  Widget build(BuildContext context) {
    if (isAvailable) {
      // Checkmark icon - green for FREE, red for PRO
      if (isPro) {
        // PRO: Use red checkmark icon
        return BovieAssets.icons.circleCheckIconGreen.svg(
          width: FigmaConstants.iconSize24,
          height: FigmaConstants.iconSize24,
        );
      } else {
        // FREE: Use green checkmark icon
        return BovieAssets.icons.circleCheckIconGreen.svg(
          width: FigmaConstants.iconSize24,
          height: FigmaConstants.iconSize24,
        );
      }
    } else {
      // Cancel/X icon
      return BovieAssets.icons.circleCancelIcon.svg(
        width: FigmaConstants.iconSize24,
        height: FigmaConstants.iconSize24,
      );
    }
  }
}

/// Simple feature list item with tick icon (for PaywallScreenB)
class _FeatureListItem extends StatelessWidget {
  final String text;

  const _FeatureListItem({
    required this.text,
  });

  @override
  Widget build(BuildContext context) => Row(
      mainAxisAlignment: MainAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        BovieAssets.icons.tick.svg(
          width: FigmaConstants.iconSize14,
          height: FigmaConstants.iconSize14,
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

