import 'package:flutter/material.dart';
import 'package:bovie/app/theme/app_colors.dart';

/// App theme configuration based on Figma design system
class AppTheme {
  AppTheme._();

  /// Color scheme for light theme
  static ColorScheme get lightColorScheme => ColorScheme.light(
        primary: AppColors.redLight,
        onPrimary: AppColors.basicWhite,
        primaryContainer: AppColors.redDark,
        onPrimaryContainer: AppColors.basicWhite,
        secondary: AppColors.grayDark,
        onSecondary: AppColors.basicWhite,
        tertiary: AppColors.grayMedium,
        onTertiary: AppColors.basicWhite,
        error: AppColors.redDark,
        onError: AppColors.basicWhite,
        surface: AppColors.white,
        onSurface: AppColors.black,
        surfaceContainerHighest: AppColors.gray,
        onSurfaceVariant: AppColors.grayDarkText,
        outline: AppColors.grayDark,
        shadow: AppColors.black.withOpacity(0.1),
      );

  /// Color scheme for dark theme
  static ColorScheme get darkColorScheme => ColorScheme.dark(
        primary: AppColors.redLight,
        onPrimary: AppColors.basicWhite,
        primaryContainer: AppColors.redDark,
        onPrimaryContainer: AppColors.basicWhite,
        secondary: AppColors.grayDark,
        onSecondary: AppColors.basicWhite,
        tertiary: AppColors.grayMedium,
        onTertiary: AppColors.basicWhite,
        error: AppColors.redDark,
        onError: AppColors.basicWhite,
        surface: AppColors.black,
        onSurface: AppColors.white,
        surfaceContainerHighest: AppColors.grayDark,
        onSurfaceVariant: AppColors.grayLightMedium,
        outline: AppColors.grayDark,
        shadow: AppColors.black.withOpacity(0.3),
      );

  /// Text theme configuration using Inter font
  static TextTheme _createTextTheme(ColorScheme colorScheme) {
    return TextTheme(
      // Display styles
      displayLarge: TextStyle(
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: FontWeight.bold,
        color: colorScheme.onSurface,
        letterSpacing: -0.64,
      ),
      displayMedium: TextStyle(
        fontFamily: 'Inter',
        fontSize: 28,
        fontWeight: FontWeight.bold,
        color: colorScheme.onSurface,
        letterSpacing: -0.56,
      ),
      displaySmall: TextStyle(
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: colorScheme.onSurface,
        letterSpacing: -0.48,
      ),
      // Headline styles
      headlineLarge: TextStyle(
        fontFamily: 'Inter',
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: colorScheme.onSurface,
      ),
      headlineMedium: TextStyle(
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: colorScheme.onSurface,
      ),
      headlineSmall: TextStyle(
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: colorScheme.onSurface,
      ),
      // Title styles
      titleLarge: TextStyle(
        fontFamily: 'Inter',
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: colorScheme.onSurface,
      ),
      titleMedium: TextStyle(
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: FontWeight.w500,
        color: colorScheme.onSurface,
      ),
      titleSmall: TextStyle(
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: colorScheme.onSurfaceVariant,
      ),
      // Body styles
      bodyLarge: TextStyle(
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: FontWeight.normal,
        color: colorScheme.onSurface,
      ),
      bodyMedium: TextStyle(
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: FontWeight.normal,
        color: colorScheme.onSurface,
      ),
      bodySmall: TextStyle(
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: FontWeight.normal,
        color: colorScheme.onSurfaceVariant,
      ),
      // Label styles
      labelLarge: TextStyle(
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: colorScheme.onSurface,
      ),
      labelMedium: TextStyle(
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: FontWeight.w500,
        color: colorScheme.onSurface,
        letterSpacing: 0.24,
      ),
      labelSmall: TextStyle(
        fontFamily: 'Inter',
        fontSize: 11,
        fontWeight: FontWeight.w500,
        color: colorScheme.onSurfaceVariant,
      ),
    );
  }

  /// App bar theme
  static AppBarTheme _createAppBarTheme(ColorScheme colorScheme) {
    return AppBarTheme(
      backgroundColor: colorScheme.surface,
      foregroundColor: colorScheme.onSurface,
      elevation: 0,
      centerTitle: true,
      titleTextStyle: TextStyle(
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: colorScheme.onSurface,
      ),
    );
  }

  /// Elevated button theme
  static ElevatedButtonThemeData _createElevatedButtonTheme(ColorScheme colorScheme) {
    return ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: colorScheme.onPrimary,
        backgroundColor: colorScheme.primary,
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        textStyle: TextStyle(
          fontFamily: 'Inter',
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  /// Text button theme
  static TextButtonThemeData _createTextButtonTheme(ColorScheme colorScheme) {
    return TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: colorScheme.primary,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        textStyle: TextStyle(
          fontFamily: 'Inter',
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  /// Input decoration theme
  static InputDecorationTheme _createInputDecorationTheme(ColorScheme colorScheme) {
    return InputDecorationTheme(
      filled: true,
      fillColor: colorScheme.surfaceContainerHighest,
      labelStyle: TextStyle(
        fontFamily: 'Inter',
        color: colorScheme.onSurfaceVariant,
      ),
      hintStyle: TextStyle(
        fontFamily: 'Inter',
        color: colorScheme.onSurfaceVariant,
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: colorScheme.outline),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: colorScheme.primary, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: colorScheme.error, width: 1),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(color: colorScheme.error, width: 2),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
    );
  }

  /// Card theme
  static CardThemeData _createCardTheme(ColorScheme colorScheme) {
    return CardThemeData(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      color: colorScheme.surface,
    );
  }

  /// Light theme
  static ThemeData get lightTheme {
    final colorScheme = lightColorScheme;
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      fontFamily: 'Inter',
      colorScheme: colorScheme,
      scaffoldBackgroundColor: colorScheme.surface,
      textTheme: _createTextTheme(colorScheme),
      appBarTheme: _createAppBarTheme(colorScheme),
      elevatedButtonTheme: _createElevatedButtonTheme(colorScheme),
      textButtonTheme: _createTextButtonTheme(colorScheme),
      inputDecorationTheme: _createInputDecorationTheme(colorScheme),
      cardTheme: _createCardTheme(colorScheme),
      dividerColor: colorScheme.outline,
    );
  }

  /// Dark theme
  static ThemeData get darkTheme {
    final colorScheme = darkColorScheme;
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      fontFamily: 'Inter',
      colorScheme: colorScheme,
      scaffoldBackgroundColor: colorScheme.surface,
      textTheme: _createTextTheme(colorScheme),
      appBarTheme: _createAppBarTheme(colorScheme),
      elevatedButtonTheme: _createElevatedButtonTheme(colorScheme),
      textButtonTheme: _createTextButtonTheme(colorScheme),
      inputDecorationTheme: _createInputDecorationTheme(colorScheme),
      cardTheme: _createCardTheme(colorScheme),
      dividerColor: colorScheme.outline,
    );
  }
}

