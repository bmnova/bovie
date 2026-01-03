import 'package:flutter/material.dart';

/// Figma design constants based on 375 × 812 reference design
class FigmaConstants {
  FigmaConstants._();

  // Reference design size (iPhone X/11/12/13/14)
  static const double designWidth = 375.0;
  static const double designHeight = 812.0;

  // Spacing scale (from Figma)
  static const double spacing2 = 2.0;
  static const double spacing4 = 4.0;
  static const double spacing8 = 8.0;
  static const double spacing12 = 12.0;
  static const double spacing16 = 16.0;
  static const double spacing20 = 20.0;
  static const double spacing24 = 24.0;
  static const double spacing28 = 28.0;
  static const double spacing32 = 32.0;
  static const double spacing40 = 40.0;
  static const double spacing48 = 48.0;

  // Component sizes (from Figma)
  static const double moviePosterWidth = 140.0;
  static const double moviePosterHeight = 196.0;
  static const double genreCardSize = 140.0;
  static const double chipHeight = 40.0;
  static const double buttonHeight = 48.0;
  static const double buttonHeightLarge = 56.0;
  static const double buttonMinWidth = 120.0;

  // Border radius (from Figma)
  static const double radius4 = 4.0;
  static const double radius8 = 8.0;
  static const double radius12 = 12.0;
  static const double radius16 = 16.0;
  static const double radius20 = 20.0;
  static const double radius72 = 72.0; // For circular cards

  // Icon sizes
  static const double iconSize14 = 14.0;
  static const double iconSize16 = 16.0;
  static const double iconSize24 = 24.0;
  static const double iconSize32 = 32.0;
  static const double iconSize40 = 40.0;

  // Font sizes
  static const double fontSize8 = 8.0;
  static const double fontSize10 = 10.0;
  static const double fontSize12 = 12.0;
  static const double fontSize14 = 14.0;
  static const double fontSize16 = 16.0;
  static const double fontSize24 = 24.0;

  // Border width
  static const double borderWidth1 = 1.0;
  static const double borderWidth2 = 2.0;
  static const double borderWidthPro = 1.63;

  // Elevation
  static const double elevation0 = 0.0;
  static const double elevation2 = 2.0;

  // Row component constants
  static const double rowHorizontalPadding = 20.0;
  static const double rowVerticalPaddingDefault = 0.0;
  static const double rowVerticalPaddingSmall = 8.0;
  static const double rowVerticalPaddingMedium = 11.0;
  static const double rowGapBetweenIconAndText = 20.0;
  static const double rowGapBetweenTitleAndSubtitle = 4.0;

  // Badge constants
  static const double badgeHeight = 23.0;
  static const double badgeExtraPadding = 11.5; // Half of badge height for overflow
  static const double badgeHorizontalPadding = 12.0;
  static const double badgeVerticalPadding = 4.0;
  static const double badgeRightPadding = 12.0;
  static const double badgeFontSize = 12.0;

  // Feature comparison table constants
  static const double featureTableIconPadding = 13.0;
  static const double featureTableRowContentHeight = 24.0;
  static const double featureTableContainerHeight = 195.0;

  // App bar
  static const double appBarHeight = 56.0;

  // Bottom padding (safe area)
  static const double bottomPadding = 34.0; // iPhone X+ safe area

  // Animation durations (from Figma)
  static const Duration animationDurationFast = Duration(milliseconds: 200);
  static const Duration animationDurationMedium = Duration(milliseconds: 400);
  static const Duration animationDurationSlow = Duration(milliseconds: 600);

  // Animation delays (from Figma)
  static const Duration animationDelayShort = Duration(milliseconds: 100);
  static const Duration animationDelayMedium = Duration(milliseconds: 200);
}

/// Helper class for responsive scaling based on Figma design
class FigmaHelper {
  FigmaHelper._();

  /// Scale width from Figma design to current screen width
  static double scaleWidth(BuildContext context, double figmaWidth) {
    final screenWidth = MediaQuery.of(context).size.width;
    return (figmaWidth / FigmaConstants.designWidth) * screenWidth;
  }

  /// Scale height from Figma design to current screen height
  static double scaleHeight(BuildContext context, double figmaHeight) {
    final screenHeight = MediaQuery.of(context).size.height;
    return (figmaHeight / FigmaConstants.designHeight) * screenHeight;
  }

  /// Scale font size from Figma design
  static double scaleFontSize(BuildContext context, double figmaFontSize) {
    final screenWidth = MediaQuery.of(context).size.width;
    final scaleFactor = screenWidth / FigmaConstants.designWidth;
    return figmaFontSize * scaleFactor;
  }

  /// Get responsive spacing (scales with screen size)
  static double spacing(BuildContext context, double figmaSpacing) => scaleWidth(context, figmaSpacing);

  /// Check if current device matches design reference
  static bool isDesignReference(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return size.width == FigmaConstants.designWidth &&
        size.height == FigmaConstants.designHeight;
  }
}

/// Extension on BuildContext for convenient Figma scaling
extension FigmaScalingExtension on BuildContext {
  /// Scale width from Figma design to current screen width
  double sw(double figmaWidth) => FigmaHelper.scaleWidth(this, figmaWidth);

  /// Scale height from Figma design to current screen height
  double sh(double figmaHeight) => FigmaHelper.scaleHeight(this, figmaHeight);

  /// Scale font size from Figma design
  double sf(double figmaFontSize) => FigmaHelper.scaleFontSize(this, figmaFontSize);
}

