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

  static const List<double> proGradientStops = [0.2, 0.5, 0.8];
}

/// Feature comparison table widget for paywall screen.
///
/// Displays a table comparing FREE and PRO plans with features and checkmarks/X icons.
/// When [showComparison] is false, displays a simple list with tick icons (PaywallScreenB).
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
    if (store != null) {
      return Observer(
        builder: (_) {
          final effectiveFeatures = PaywallFeatures.getFeaturesForStore(store!);
          return _buildContent(context, effectiveFeatures);
        },
      );
    } else {
      return _buildContent(context, features!);
    }
  }

  Widget _buildContent(BuildContext context, List<FeatureItem> effectiveFeatures) {
    if (showComparison) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(height: FigmaConstants.spacing8.sh(context)),
          FittedText(
            text: appName,
            style: context.textTheme.titleLarge?.copyWith(
              color: AppColors.white,
              fontSize: FigmaConstants.fontSize24.f(context),
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          SizedBox(height: FigmaConstants.spacing8.sh(context)),
          _FeatureTable(
            features: effectiveFeatures,
            store: store,
          ),
        ],
      );
    } else {
      final activeFeatures =
      effectiveFeatures.where((feature) => feature.isAvailableInPro).toList();

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
                  if (index > 0) SizedBox(height: FigmaConstants.spacing16.sh(context)),
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

class PaywallFeatures {
  PaywallFeatures._();

  static List<String> getFeatureNames() => [
    localizations.dailyMovieSuggestions,
    localizations.aiPoweredMovieInsights,
    localizations.personalizedWatchlists,
    localizations.adFreeExperience,
  ];

  static List<FeatureItem> getFeaturesForStore(PaywallStore store) {
    final featureNames = getFeatureNames();
    final isFreeTrialEnabled = store.isFreeTrialEnabled;

    final proFeatures = isFreeTrialEnabled
        ? PaywallConfig.getFeaturesForFreeMode()
        : PaywallConfig.getFeaturesForPlan(store.selectedPlan);

    final freeFeatures = PaywallConfig.getFeaturesForFreeMode();

    return List.generate(featureNames.length, (index) {
      return FeatureItem(
        name: featureNames[index],
        isAvailableInFree: freeFeatures[index],
        isAvailableInPro: proFeatures[index],
      );
    });
  }

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
    final textStyle = context.textTheme.bodyLarge?.copyWith(
      color: AppColors.white,
      fontSize: FigmaConstants.fontSize16.f(context),
      fontWeight: FontWeight.w600,
    );

    final freeTextPainter = TextPainter(
      text: TextSpan(text: localizations.free, style: textStyle),
      textDirection: TextDirection.ltr,
    );
    freeTextPainter.layout();
    final freeHeaderWidth = freeTextPainter.width + (FigmaConstants.spacing8.sw(context) * 2);

    final proTextPainter = TextPainter(
      text: TextSpan(text: localizations.pro, style: textStyle),
      textDirection: TextDirection.ltr,
    );
    proTextPainter.layout();
    final proHeaderWidth = proTextPainter.width +
        (FigmaConstants.spacing8.sw(context) * 2) +
        (FigmaConstants.borderWidthPro * 2) +
        FigmaConstants.spacing4.sw(context);

    final iconColumnMinWidth =
        (FigmaConstants.spacing8.sw(context) * 2) + FigmaConstants.iconSize24.w(context); // 40px
    final freeColumnWidth =
    freeHeaderWidth > iconColumnMinWidth ? freeHeaderWidth : iconColumnMinWidth;
    final proColumnWidth =
    proHeaderWidth > iconColumnMinWidth ? proHeaderWidth : iconColumnMinWidth;

    return SizedBox(
      height: FigmaConstants.featureTableContainerHeight.h(context),
      child: Align(
        alignment: Alignment.bottomCenter,
        child: Table(
          defaultVerticalAlignment: TableCellVerticalAlignment.middle,
          border: TableBorder(), // Remove default table borders to avoid lines between rows
          columnWidths: {
            0: const FlexColumnWidth(1),
            1: FixedColumnWidth(FigmaConstants.spacing12.sw(context)),
            2: FixedColumnWidth(freeColumnWidth),
            3: FixedColumnWidth(FigmaConstants.spacing12.sw(context)),
            4: FixedColumnWidth(proColumnWidth),
          },
          children: [
            TableRow(
              children: [
                const SizedBox(),
                SizedBox(width: FigmaConstants.spacing12.sw(context)),
                _PlanHeaderCell(
                  planName: localizations.free,
                  hasBorder: false,
                  isFirstRow: true,
                  isLastRow: features.isEmpty,
                ),
                SizedBox(width: FigmaConstants.spacing12.sw(context)),
                _PlanHeaderCell(
                  planName: localizations.pro,
                  hasBorder: true,
                  isFirstRow: true,
                  isLastRow: features.isEmpty,
                ),
              ],
            ),
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
                  SizedBox(width: FigmaConstants.spacing12.sw(context)),
                  _FeatureIconCell(
                    isAvailable: feature.isAvailableInFree,
                    isPro: false,
                    isFirstRow: false,
                    isLastRow: isLastFeature,
                    featureIndex: index,
                    store: store,
                  ),
                  SizedBox(width: FigmaConstants.spacing12.sw(context)),
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
    final rowPadding = FigmaConstants.spacing8.sh(context);
    final horizontalPadding = FigmaConstants.spacing8.sw(context);
    final rowHeight = FigmaConstants.featureTableRowContentHeight.h(context) + (rowPadding * 2);

    final titleWidget =
    hasBorder ? _GradientBorderTitle(text: planName) : _PlainTitle(text: planName);

    return Container(
      height: rowHeight,
      padding: EdgeInsets.symmetric(
        horizontal: horizontalPadding,
        vertical: rowPadding,
      ),
      decoration: hasBorder
          ? BoxDecoration(
        border: Border(
          left: const BorderSide(
              color: AppColors.redLight, width: FigmaConstants.borderWidth1),
          right: const BorderSide(
              color: AppColors.redLight, width: FigmaConstants.borderWidth1),
          top: isFirstRow
              ? const BorderSide(
              color: AppColors.redLight, width: FigmaConstants.borderWidth1)
              : BorderSide.none,
          bottom: isLastRow
              ? const BorderSide(
              color: AppColors.redLight, width: FigmaConstants.borderWidth1)
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
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
              colors: const [
                Colors.transparent,
                AppColors.redLight,
                Colors.transparent,
              ],
              stops: _FigmaConstants.proGradientStops,
            ),
            borderRadius: BorderRadius.circular(FigmaConstants.radius4),
          ),
        ),
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
                      fontSize: FigmaConstants.fontSize16.f(context),
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
      fontSize: FigmaConstants.fontSize16.f(context),
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
    final rowPadding = FigmaConstants.spacing8.sh(context);
    final rowHeight = FigmaConstants.featureTableRowContentHeight.h(context) + (rowPadding * 2);

    return Container(
      height: rowHeight,
      padding: EdgeInsets.symmetric(
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
              fontSize: FigmaConstants.fontSize14.f(context),
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
    final rowPadding = FigmaConstants.spacing8.sh(context);
    final rowHeight = FigmaConstants.featureTableRowContentHeight.h(context) + (rowPadding * 2);

    final selectedPlan = store?.selectedPlan;
    final previousPlan = store?.previousPlan;

    final isWeeklyMonthlySelected =
        selectedPlan == SubscriptionPlan.weekly || selectedPlan == SubscriptionPlan.monthly;
    final isWeeklyMonthlyPrevious =
        previousPlan == SubscriptionPlan.weekly || previousPlan == SubscriptionPlan.monthly;

    // Special-case animation only for PRO column + 3rd & 4th features + weekly <-> monthly transitions.
    final isSpecial = isPro &&
        store != null &&
        isWeeklyMonthlySelected &&
        (featureIndex == 2 || featureIndex == 3);

    final needsOverlayAnim = isPro &&
        store != null &&
        featureIndex == 3 &&
        previousPlan != null &&
        isWeeklyMonthlySelected &&
        isWeeklyMonthlyPrevious &&
        previousPlan != selectedPlan;

    // Base icons override for the special case:
    // - Feature #3 (index 2) is always tick (will be faded out when cross covers it).
    // - Feature #4 (index 3) is always cross (both weekly & monthly).
    bool baseAvailable = isAvailable;
    if (isSpecial && featureIndex == 2) baseAvailable = true;
    if (isSpecial && featureIndex == 3) baseAvailable = false;

    Widget iconWidget = _FeatureIcon(
      isAvailable: baseAvailable,
      isPro: isPro,
    );

    // Fade the tick on feature #3 when weekly is selected (cross covers it).
    if (isSpecial && featureIndex == 2) {
      final endOpacity = (store!.selectedPlan == SubscriptionPlan.weekly) ? 0.0 : 1.0;

      final prevPlan = store!.previousPlan;
      final beginOpacity = (prevPlan == SubscriptionPlan.weekly) ? 0.0 : 1.0;

      final shouldAnimate = prevPlan != null &&
          (prevPlan == SubscriptionPlan.weekly || prevPlan == SubscriptionPlan.monthly) &&
          (store!.selectedPlan == SubscriptionPlan.weekly ||
              store!.selectedPlan == SubscriptionPlan.monthly) &&
          prevPlan != store!.selectedPlan;

      iconWidget = TweenAnimationBuilder<double>(
        key: ValueKey('tickOpacity_${store!.selectedPlan}_${store!.previousPlan}'),
        tween: Tween<double>(begin: beginOpacity, end: endOpacity),
        duration: shouldAnimate ? const Duration(milliseconds: 200) : Duration.zero,
        curve: Curves.easeInOutSine,
        builder: (context, opacity, _) {
          return Opacity(
            opacity: opacity,
            child: const _FeatureIcon(
              isAvailable: true,
              isPro: true,
            ),
          );
        },
      );
    }

    if (isSpecial && featureIndex == 3) {
      iconWidget = _CrossOverlayAnimatedIcon(
        key: ValueKey('crossOverlay_${store!.selectedPlan}_${store!.previousPlan}'),
        rowHeight: rowHeight,
        selectedPlan: store!.selectedPlan,
        previousPlan: store!.previousPlan,
        base: const _FeatureIcon(isAvailable: false, isPro: true),
        movingCross: const _FeatureIcon(isAvailable: false, isPro: true),
        animate: needsOverlayAnim,
      );
    }

    Widget child;
    if (isSpecial && featureIndex == 3) {
      // Provide a tall paint area and do not clip so the icon can travel into adjacent row.
      child = Container(
        height: rowHeight,
        padding: EdgeInsets.symmetric(horizontal: FigmaConstants.spacing8.sw(context)),
        alignment: Alignment.center,
        child: SizedBox(
          width: FigmaConstants.iconSize24.w(context),
          height: rowHeight,
          child: iconWidget,
        ),
      );
    } else {
      child = ClipRect(
        child: Container(
          height: rowHeight,
          padding: EdgeInsets.only(
            left: FigmaConstants.spacing8.sw(context),
            right: FigmaConstants.spacing8.sw(context),
            top: rowPadding,
            bottom: rowPadding,
          ),
          child: SizedBox(
            width: FigmaConstants.iconSize24.w(context),
            height: FigmaConstants.iconSize24.h(context),
            child: iconWidget,
          ),
        ),
      );
    }

    if (isPro) {
      // Only show borders on left, right, top (first row), and bottom (last row)
      // No borders between rows to avoid lines between features
      final decorated = Container(
        decoration: BoxDecoration(
          border: Border(
            left: const BorderSide(
                color: AppColors.redLight, width: FigmaConstants.borderWidth1),
            right: const BorderSide(
                color: AppColors.redLight, width: FigmaConstants.borderWidth1),
            top: isFirstRow
                ? const BorderSide(
                color: AppColors.redLight, width: FigmaConstants.borderWidth1)
                : BorderSide.none,
            bottom: isLastRow
                ? const BorderSide(
                color: AppColors.redLight, width: FigmaConstants.borderWidth1)
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

      return (isSpecial && featureIndex == 3) ? decorated : ClipRect(child: decorated);
    }

    return child;
  }
}

class _CrossOverlayAnimatedIcon extends StatefulWidget {
  final double rowHeight;
  final SubscriptionPlan selectedPlan;
  final SubscriptionPlan? previousPlan;
  final Widget base;
  final Widget movingCross;
  final bool animate;

  const _CrossOverlayAnimatedIcon({
    super.key,
    required this.rowHeight,
    required this.selectedPlan,
    required this.previousPlan,
    required this.base,
    required this.movingCross,
    required this.animate,
  });

  @override
  State<_CrossOverlayAnimatedIcon> createState() => _CrossOverlayAnimatedIconState();
}

class _CrossOverlayAnimatedIconState extends State<_CrossOverlayAnimatedIcon>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late Animation<double> _dyAnim;
  late double _beginDy;
  late double _endDy;

  double _dyForPlan(SubscriptionPlan plan) {
    return (plan == SubscriptionPlan.weekly) ? -widget.rowHeight : 0.0;
  }

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 200),
    );

    final beginDy = (widget.previousPlan == null)
        ? _dyForPlan(widget.selectedPlan)
        : _dyForPlan(widget.previousPlan!);

    final endDy = _dyForPlan(widget.selectedPlan);

    final curve = CurvedAnimation(parent: _controller, curve: Curves.easeOutBack);
    _dyAnim = Tween<double>(begin: beginDy, end: endDy).animate(curve);

    if (widget.animate) {
      _controller.forward(from: 0.0);
    } else {
      _controller.value = 1.0;
    }

    _beginDy = beginDy;
    _endDy = endDy;
  }

  @override
  void didUpdateWidget(covariant _CrossOverlayAnimatedIcon oldWidget) {
    super.didUpdateWidget(oldWidget);

    final oldEnd = _dyForPlan(oldWidget.selectedPlan);
    final newEnd = _dyForPlan(widget.selectedPlan);

    if (oldEnd == newEnd) return;

    final beginDy = _dyAnim.value;
    final endDy = newEnd;

    final curve = CurvedAnimation(parent: _controller, curve: Curves.easeOutBack);
    _dyAnim = Tween<double>(begin: beginDy, end: endDy).animate(curve);

    if (widget.animate) {
      _controller.forward(from: 0.0);
    } else {
      _controller.value = 1.0;
    }

    _beginDy = beginDy;
    _endDy = endDy;
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
      builder: (_, __) {
        final dy = _dyAnim.value;

        final isMovingUp = _endDy < _beginDy;

        // Fade in the base cross only when moving up (4 -> 3). Keep it hidden while moving down (3 -> 4).
        final baseOpacity = isMovingUp
            ? ((0.0 - dy) / widget.rowHeight).clamp(0.0, 1.0)
            : 0.0;

        return Stack(
          clipBehavior: Clip.none,
          children: [
            Opacity(
              opacity: baseOpacity,
              child: Center(child: widget.base),
            ),
            Transform.translate(
              offset: Offset(0, dy),
              child: Center(child: widget.movingCross),
            ),
          ],
        );
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
      return BovieAssets.icons.circleCheckIconGreen.svg(
        width: FigmaConstants.iconSize24.w(context),
        height: FigmaConstants.iconSize24.h(context),
      );
    } else {
      return BovieAssets.icons.circleCancelIcon.svg(
        width: FigmaConstants.iconSize24.w(context),
        height: FigmaConstants.iconSize24.h(context),
      );
    }
  }
}

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
        width: FigmaConstants.iconSize14.w(context),
        height: FigmaConstants.iconSize14.h(context),
      ),
      SizedBox(width: FigmaConstants.spacing12.sw(context)),
      Text(
        text,
        style: context.textTheme.bodyMedium?.copyWith(
          color: AppColors.white,
          fontSize: FigmaConstants.fontSize14.f(context),
          fontWeight: FontWeight.w600,
        ),
      ),
    ],
  );
}
