import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/generated/l10n.dart';
import 'package:bovie/generated/assets.gen.dart';

/// Figma constants for category header section
class _FigmaConstants {
  _FigmaConstants._();

  // Header title
  static const double headerTitleFontSize = 24.0;
  static const Color headerTitleColor = Color(0xFFF3E9E9); // White from Figma

  // Search bar
  static const double searchBarHeight = 36.0; // From user requirement
  static const double searchBarBorderRadius = 10.0; // From Figma: rounded-[10px]
  static const Color searchBarBackgroundColor = Color(0xFFF3E9E9);
  static const double searchBarHorizontalPadding = 16.0; // From user requirement
  
  // Icons - SVG sizes from assets
  static const double searchIconWidth = 16.0; // From SVG: width="16"
  static const double searchIconHeight = 16.0; // From SVG: height="16"
  static const double microphoneIconWidth = 12.0; // From SVG: width="12"
  static const double microphoneIconHeight = 18.0; // From SVG: height="18"
  static const double iconLeftPadding = 8.0; // From Figma: left-[8px]
  static const double iconRightPadding = 8.0; // From Figma: right-[8px]
  
  // Placeholder text
  static const double placeholderTextLeftPadding = 30.0; // From Figma: left-[30px]
  static const Color placeholderTextColor = Color(0xFF968D8D); // From Figma: #968d8d
  static const double placeholderTextFontSize = 17.0; // From Figma: text-[17px]
  static const double placeholderTextLetterSpacing = -0.41; // From Figma: tracking-[-0.41px]
}

/// Category header section with title and search bar
class CategoryHeaderSection extends StatelessWidget {
  const CategoryHeaderSection({super.key});

  @override
  Widget build(BuildContext context) => Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Header title
        Padding(
          padding: const EdgeInsets.only(
            left: FigmaConstants.spacing16,
            bottom: FigmaConstants.spacing20,
          ),
          child: Text(
            'Movies 🎬',
            style: context.textTheme.headlineSmall?.copyWith(
              fontSize: _FigmaConstants.headerTitleFontSize,
              color: _FigmaConstants.headerTitleColor,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        // Search bar
        Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: FigmaConstants.spacing16,
          ),
          child: _SearchBar(),
        ),
      ],
    );
}

/// Search bar widget
class _SearchBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Container(
      height: _FigmaConstants.searchBarHeight,
      decoration: BoxDecoration(
        color: _FigmaConstants.searchBarBackgroundColor,
        borderRadius: BorderRadius.circular(
          _FigmaConstants.searchBarBorderRadius,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: _FigmaConstants.searchBarHorizontalPadding,
        ),
        child: Stack(
          children: [
            // Search icon (left) - SVG from assets
            Positioned(
              left: _FigmaConstants.iconLeftPadding,
              top: 0,
              bottom: 0,
              child: Center(
                child: SvgPicture.asset(
                  BovieAssets.icons.search,
                  width: _FigmaConstants.searchIconWidth,
                  height: _FigmaConstants.searchIconHeight,
                ),
              ),
            ),
            // Microphone icon (right) - SVG from assets
            Positioned(
              right: _FigmaConstants.iconRightPadding,
              top: 0,
              bottom: 0,
              child: Center(
                child: BovieAssets.icons.mic.svg(
                  width: _FigmaConstants.microphoneIconWidth,
                  height: _FigmaConstants.microphoneIconHeight,
                ),
              ),
            ),
            // Search text field
            Padding(
              padding: EdgeInsets.only(
                left: _FigmaConstants.placeholderTextLeftPadding,
                right: _FigmaConstants.microphoneIconWidth + 
                       _FigmaConstants.iconRightPadding + 
                       8.0, // Extra spacing for right icon
              ),
              child: Align(alignment: Alignment.centerLeft,
                child: TextField(
                  decoration: InputDecoration(
                    hintText: localizations.search,
                    fillColor: Colors.transparent,
                    hintStyle: const TextStyle(
                      fontFamily: 'Inter',
                      fontSize: _FigmaConstants.placeholderTextFontSize,
                      color: _FigmaConstants.placeholderTextColor,
                      letterSpacing: _FigmaConstants.placeholderTextLetterSpacing,
                      height: 1.0,
                    ),
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    disabledBorder: InputBorder.none,
                    contentPadding: EdgeInsets.zero,
                    isDense: true,
                  ),
                  style: const TextStyle(
                    fontFamily: 'Inter',
                    fontSize: _FigmaConstants.placeholderTextFontSize,
                    color: AppColors.black,
                    letterSpacing: _FigmaConstants.placeholderTextLetterSpacing,
                    height: 1.0,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
}

