import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/widgets/basic/app_button.dart';
import 'package:bovie/core/utils/globals.dart';

/// Figma constants for onboarding selection screens
class _OnboardingSelectionConstants {
  _OnboardingSelectionConstants._();

  // Header
  static const double headerTopPadding = 36.0; // Padding after SafeArea
  static const double headerLeft = 20.0; // Left position from Figma
  static const double headerWidth = 335.0; // Width from Figma
  static const double headerHeight = 65.0; // Height from Figma
  static const double headerToContentSpacing = 72.0; // Spacing from header to content

  // Button
  static const double buttonBottomPadding = 57.0;
  static const double buttonHorizontalPadding = 20.0;

  // Font sizes
  static const double titleFontSize = 24.0;
  static const double subtitleFontSize = 20.0;
}

/// Base screen for onboarding selection screens (movies and genres)
/// Provides common layout with header, body, and button
class OnboardingSelectionScreenBase extends StatelessWidget {
  /// Builder for the body content (selection area)
  final Widget Function(BuildContext context, double contentTop) bodyBuilder;

  /// Whether there are any selections
  final bool Function() hasSelection;

  /// Whether continue button should be enabled
  final bool Function() canContinue;

  /// Callback when continue button is pressed
  final VoidCallback onContinue;

  /// Title to show when selection is made
  final String selectedTitle;

  /// Title to show when no selection (welcome)
  final String welcomeTitle;

  /// Subtitle to show when no selection
  final String welcomeSubtitle;

  /// Whether data is loading (function to make it reactive)
  final bool Function() isLoading;

  /// Whether there is data to show (function to make it reactive)
  final bool Function() hasData;

  /// Optional overlay widgets builder (e.g., shadows for genres)
  /// Receives contentTop position for proper positioning
  final List<Widget> Function(double contentTop)? overlayWidgetsBuilder;

  /// Custom spacing from header to content (if null, uses default 72px)
  final double? headerToContentSpacing;

  /// Whether body should extend to bottom (default: true for genres, false for movies)
  final bool extendBodyToBottom;

  const OnboardingSelectionScreenBase({
    super.key,
    required this.bodyBuilder,
    required this.hasSelection,
    required this.canContinue,
    required this.onContinue,
    required this.selectedTitle,
    required this.welcomeTitle,
    required this.welcomeSubtitle,
    required this.isLoading,
    required this.hasData,
    this.overlayWidgetsBuilder,
    this.headerToContentSpacing,
    this.extendBodyToBottom = true,
  });

  @override
  Widget build(BuildContext context) => Scaffold(
      backgroundColor: AppColors.black,
      body: SafeArea(
        child: Observer(
          builder: (_) {
            final loading = isLoading();
            final hasDataValue = hasData();
            print('[OnboardingSelectionScreenBase] isLoading: $loading, hasData: $hasDataValue');
            if (loading && !hasDataValue) {
              print('[OnboardingSelectionScreenBase] Showing loading indicator');
              return const Center(
                child: CircularProgressIndicator(color: AppColors.white),
              );
            }
            print('[OnboardingSelectionScreenBase] Showing content (not loading)');

            final safeAreaTop = MediaQuery.of(context).padding.top;
            final headerTop = safeAreaTop + _OnboardingSelectionConstants.headerTopPadding;
            final spacing = headerToContentSpacing ?? _OnboardingSelectionConstants.headerToContentSpacing;
            final contentTop = headerTop + _OnboardingSelectionConstants.headerHeight + spacing;
            return Stack(
              children: [
                // Header
                Positioned(
                  top: headerTop,
                  left: _OnboardingSelectionConstants.headerLeft,
                  width: _OnboardingSelectionConstants.headerWidth,
                  height: _OnboardingSelectionConstants.headerHeight,
                  child: _buildHeader(context),
                ),
                // Body content
                Positioned(
                  top: contentTop,
                  left: 0,
                  right: 0,
                  bottom: extendBodyToBottom ? 0 : null,
                  child: bodyBuilder(context, contentTop),
                ),
                // Overlay widgets (e.g., shadows)
                if (overlayWidgetsBuilder != null) ...overlayWidgetsBuilder!(contentTop),
                // Continue Button
                Positioned(
                  bottom: _OnboardingSelectionConstants.buttonBottomPadding,
                  left: _OnboardingSelectionConstants.buttonHorizontalPadding,
                  right: _OnboardingSelectionConstants.buttonHorizontalPadding,
                  child: _buildButton(context),
                ),
              ],
            );
          },
        ),
      ),
    );

  Widget _buildHeader(BuildContext context) => Observer(
      builder: (_) {
        final hasSel = hasSelection();

        if (hasSel) {
          // Selected state: show selected title (vertical center)
          return Align(
            alignment: Alignment.centerLeft,
            child: Text(
              selectedTitle,
              style: context.textTheme.headlineMedium?.copyWith(
                color: AppColors.white,
                fontSize: _OnboardingSelectionConstants.titleFontSize,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.start,
            ),
          );
        } else {
          // Welcome state: show welcome title and subtitle (top aligned)
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                welcomeTitle,
                style: context.textTheme.headlineMedium?.copyWith(
                  color: AppColors.white,
                  fontSize: _OnboardingSelectionConstants.titleFontSize,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                welcomeSubtitle,
                style: context.textTheme.titleMedium?.copyWith(
                  color: AppColors.white,
                  fontSize: _OnboardingSelectionConstants.subtitleFontSize,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          );
        }
      },
    );

  Widget _buildButton(BuildContext context) => Observer(
      builder: (_) => AppButton(
        text: localizations.continueText,
        isEnabled: canContinue(),
        onPressed: onContinue,
      ),
    );
}

