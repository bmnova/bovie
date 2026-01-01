import 'package:flutter/material.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/core/widgets/basic/fitted_text.dart';
import 'package:bovie/generated/assets.gen.dart';

/// Feature comparison table widget for paywall screen
/// 
/// Displays a table comparing FREE and PRO plans with features and checkmarks/X icons
class FeatureComparisonTable extends StatelessWidget {
  final String appName;
  final List<FeatureItem> features;
  final VoidCallback? onClose;

  const FeatureComparisonTable({
    super.key,
    required this.appName,
    required this.features,
    this.onClose,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // App Name
        FittedText(
          text: appName,
          style: context.textTheme.titleLarge?.copyWith(
                color: AppColors.white,
                fontSize: FigmaHelper.scaleFontSize(context, 24),
                fontWeight: FontWeight.bold,
              ),
          textAlign: TextAlign.center,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        SizedBox(height: FigmaHelper.scaleHeight(context, FigmaConstants.spacing16)),
        
        // Feature Comparison Table (includes headers)
        _FeatureTable(
          features: features,
        ),
      ],
    );
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

class _FeatureTable extends StatelessWidget {
  final List<FeatureItem> features;

  const _FeatureTable({
    required this.features,
  });

  @override
  Widget build(BuildContext context) {
    // Figma values: header padding=8px, icon padding=13px, icon=24px, gap between columns=12px, gap between items=16px
    final headerPadding = FigmaHelper.scaleWidth(context, FigmaConstants.spacing8);
    final iconPadding = FigmaHelper.scaleWidth(context, 13);
    final iconSize = FigmaHelper.scaleWidth(context, 24);
    final itemGap = FigmaHelper.scaleHeight(context, FigmaConstants.spacing16);
    // Column width: max(header padding, icon padding) * 2 + icon = max(8px*2, 13px*2) + 24px = 50px
    final iconColumnWidth = (iconPadding * 2) + iconSize;
    final columnSpacing = FigmaHelper.scaleWidth(context, FigmaConstants.spacing12);
    final containerHeight = FigmaHelper.scaleHeight(context, 195);

    return SizedBox(
      height: containerHeight,
      child: Align(
        alignment: Alignment.bottomCenter,
        child: Table(
          defaultVerticalAlignment: TableCellVerticalAlignment.middle,
          columnWidths: {
            0: const FlexColumnWidth(1), // Feature names - flexible
            1: FixedColumnWidth(columnSpacing), // Spacing between feature names and columns
            2: FixedColumnWidth(iconColumnWidth), // FREE column
            3: FixedColumnWidth(columnSpacing), // Spacing between FREE and PRO
            4: FixedColumnWidth(iconColumnWidth), // PRO column
          },
          children: [
            // Header Row
            TableRow(
              children: [
                const SizedBox(), // Feature names column
                SizedBox(width: columnSpacing),
                _PlanHeaderCell(
                  planName: 'FREE',
                  padding: headerPadding,
                  itemGap: itemGap,
                  hasBorder: false,
                  isFirstRow: true,
                  isLastRow: features.isEmpty,
                ),
                SizedBox(width: columnSpacing),
                _PlanHeaderCell(
                  planName: 'PRO',
                  padding: headerPadding,
                  itemGap: itemGap,
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
                    itemGap: itemGap,
                    isFirstFeature: index == 0,
                    isLastFeature: isLastFeature,
                  ),
                  SizedBox(width: columnSpacing),
                  _FeatureIconCell(
                    isAvailable: feature.isAvailableInFree,
                    isPro: false,
                    iconSize: iconSize,
                    padding: iconPadding,
                    itemGap: itemGap,
                    isFirstRow: false,
                    isLastRow: isLastFeature,
                  ),
                  SizedBox(width: columnSpacing),
                  _FeatureIconCell(
                    isAvailable: feature.isAvailableInPro,
                    isPro: true,
                    iconSize: iconSize,
                    padding: iconPadding,
                    itemGap: itemGap,
                    isFirstRow: false,
                    isLastRow: isLastFeature,
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
  final double padding;
  final double itemGap;
  final bool hasBorder;
  final bool isFirstRow;
  final bool isLastRow;

  const _PlanHeaderCell({
    required this.planName,
    required this.padding,
    required this.itemGap,
    required this.hasBorder,
    this.isFirstRow = true,
    this.isLastRow = false,
  });

  @override
  Widget build(BuildContext context) {
    // Row height: 24px content + 8px top padding + 8px bottom padding = 40px total
    final rowPadding = padding; // 8px
    final horizontalPadding = padding; // 8px
    final rowHeight = FigmaHelper.scaleHeight(context, 24) + (rowPadding * 2); // 24 + 8 + 8 = 40px
    
    final titleWidget = hasBorder
        ? _GradientBorderTitle(text: planName)
        : _PlainTitle(text: planName);

    return Container(
      height: rowHeight,
      padding: EdgeInsets.symmetric(
        horizontal: horizontalPadding,
        vertical: rowPadding,
      ),
      decoration: hasBorder
          ? BoxDecoration(
              border: Border(
                left: const BorderSide(color: AppColors.redLight, width: 1),
                right: const BorderSide(color: AppColors.redLight, width: 1),
                top: isFirstRow
                    ? const BorderSide(color: AppColors.redLight, width: 1)
                    : BorderSide.none,
                bottom: isLastRow
                    ? const BorderSide(color: AppColors.redLight, width: 1)
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
    const borderWidth = 1.63;
    
    return Stack(
      children: [
        // Gradient border (outer container)
        // Figma: linear-gradient(270deg, rgba(8, 9, 10, 0) 20%, #CB2C2C 50%, rgba(8, 9, 10, 0) 80%)
        Container(
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
              colors: [
                Colors.transparent, // rgba(8, 9, 10, 0) at 20%
                AppColors.redLight, // #CB2C2C at 50%
                Colors.transparent, // rgba(8, 9, 10, 0) at 80%
              ],
              stops: [0.2, 0.5, 0.8],
            ),
            borderRadius: BorderRadius.circular(4),
          ),
        ),
        // Inner container with black background (creates border effect)
        Positioned.fill(
          child: Padding(
            padding: const EdgeInsets.all(borderWidth),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.black,
                borderRadius: BorderRadius.circular(4 - borderWidth),
              ),
              child: Center(
                child: FittedText(
                  text: text,
                  style: context.textTheme.bodyLarge?.copyWith(
                        color: AppColors.white,
                        fontSize: FigmaHelper.scaleFontSize(context, 16),
                        fontWeight: FontWeight.w600,
                      ),
                  textAlign: TextAlign.center,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
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
  Widget build(BuildContext context) {
    return FittedText(
      text: text,
      style: context.textTheme.bodyLarge?.copyWith(
            color: AppColors.white,
            fontSize: FigmaHelper.scaleFontSize(context, 16),
            fontWeight: FontWeight.w600,
          ),
      textAlign: TextAlign.center,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }
}

class _FeatureNameCell extends StatelessWidget {
  final FeatureItem feature;
  final double itemGap;
  final bool isFirstFeature;
  final bool isLastFeature;

  const _FeatureNameCell({
    required this.feature,
    required this.itemGap,
    this.isFirstFeature = false,
    this.isLastFeature = false,
  });

  @override
  Widget build(BuildContext context) {
    // Row height: 24px content + 8px top padding + 8px bottom padding = 40px total
    final rowPadding = FigmaHelper.scaleHeight(context, FigmaConstants.spacing8); // 8px
    final rowHeight = FigmaHelper.scaleHeight(context, 24) + (rowPadding * 2); // 24 + 8 + 8 = 40px

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
                  fontSize: FigmaHelper.scaleFontSize(context, 14),
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
  final double iconSize;
  final double padding;
  final double itemGap;
  final bool isFirstRow;
  final bool isLastRow;

  const _FeatureIconCell({
    required this.isAvailable,
    required this.isPro,
    required this.iconSize,
    required this.padding,
    required this.itemGap,
    this.isFirstRow = false,
    this.isLastRow = false,
  });

  @override
  Widget build(BuildContext context) {
    // Row height: 24px content + 8px top padding + 8px bottom padding = 40px total
    final rowPadding = FigmaHelper.scaleHeight(context, FigmaConstants.spacing8); // 8px
    final rowHeight = FigmaHelper.scaleHeight(context, 24) + (rowPadding * 2); // 24 + 8 + 8 = 40px

    Widget child = Container(
      height: rowHeight,
      padding: EdgeInsets.only(
        left: padding, // 13px for icons (horizontal)
        right: padding, // 13px for icons (horizontal)
        top: rowPadding, // 8px
        bottom: rowPadding, // 8px
      ),
      child: SizedBox(
        width: iconSize,
        height: iconSize,
        child: _FeatureIcon(
          isAvailable: isAvailable,
          isPro: isPro,
        ),
      ),
    );

    // Add border for PRO column
    if (isPro) {
      return Container(
        decoration: BoxDecoration(
          border: Border(
            left: const BorderSide(color: AppColors.redLight, width: 1),
            right: const BorderSide(color: AppColors.redLight, width: 1),
            top: isFirstRow
                ? const BorderSide(color: AppColors.redLight, width: 1)
                : BorderSide.none,
            bottom: isLastRow
                ? const BorderSide(color: AppColors.redLight, width: 1)
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

class _FeatureIcon extends StatelessWidget {
  final bool isAvailable;
  final bool isPro;

  const _FeatureIcon({
    required this.isAvailable,
    required this.isPro,
  });

  @override
  Widget build(BuildContext context) {
    final iconSize = FigmaHelper.scaleWidth(context, 24);

    if (isAvailable) {
      // Checkmark icon - green for FREE, red for PRO
      if (isPro) {
        // PRO: Use red checkmark icon
        // TODO: After running build_runner for circle_check_icon_red.svg,
        // replace with: BovieAssets.icons.circleCheckIconRed.svg(...)
        // For now, using green checkmark as fallback
        return BovieAssets.icons.circleCheckIconGreen.svg(
          width: iconSize,
          height: iconSize,
        );
      } else {
        // FREE: Use green checkmark icon
        return BovieAssets.icons.circleCheckIconGreen.svg(
          width: iconSize,
          height: iconSize,
        );
      }
    } else {
      // Cancel/X icon
      return BovieAssets.icons.circleCancelIcon.svg(
        width: iconSize,
        height: iconSize,
      );
    }
  }
}

