import 'package:flutter/material.dart';

/// Figma design constants based on 375 × 812 reference design
class FigmaConstants {
  FigmaConstants._();

  // Reference design size (iPhone X/11/12/13/14)
  static const double designWidth = 375.0;
  static const double designHeight = 812.0;

  // Spacing scale (from Figma)
  static const double spacing4 = 4.0;
  static const double spacing8 = 8.0;
  static const double spacing12 = 12.0;
  static const double spacing16 = 16.0;
  static const double spacing20 = 20.0;
  static const double spacing24 = 24.0;
  static const double spacing32 = 32.0;
  static const double spacing48 = 48.0;

  // Component sizes (from Figma)
  static const double moviePosterWidth = 140.0;
  static const double moviePosterHeight = 196.0;
  static const double genreCardSize = 140.0;
  static const double chipHeight = 40.0;
  static const double buttonHeight = 48.0;
  static const double buttonMinWidth = 120.0;

  // Border radius (from Figma)
  static const double radius4 = 4.0;
  static const double radius8 = 8.0;
  static const double radius12 = 12.0;
  static const double radius20 = 20.0;
  static const double radius72 = 72.0; // For circular cards

  // Icon sizes
  static const double iconSize16 = 16.0;
  static const double iconSize24 = 24.0;
  static const double iconSize32 = 32.0;
  static const double iconSize40 = 40.0;

  // App bar
  static const double appBarHeight = 56.0;

  // Bottom padding (safe area)
  static const double bottomPadding = 34.0; // iPhone X+ safe area
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
  static double spacing(BuildContext context, double figmaSpacing) {
    return scaleWidth(context, figmaSpacing);
  }

  /// Check if current device matches design reference
  static bool isDesignReference(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return size.width == FigmaConstants.designWidth &&
        size.height == FigmaConstants.designHeight;
  }
}

