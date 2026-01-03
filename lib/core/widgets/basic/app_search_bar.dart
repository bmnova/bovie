import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:bovie/generated/assets.gen.dart';
import 'package:bovie/app/theme/app_colors.dart';

/// App search bar widget
class AppSearchBar extends StatelessWidget {
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final String? hintText;
  final VoidCallback? onMicrophoneTap;

  const AppSearchBar({
    super.key,
    this.controller,
    this.onChanged,
    this.hintText,
    this.onMicrophoneTap,
  });

  @override
  Widget build(BuildContext context) => Container(
        height: _AppSearchBarConstants.searchBarHeight,
        decoration: BoxDecoration(
          color: _AppSearchBarConstants.searchBarBackgroundColor,
          borderRadius: BorderRadius.circular(
            _AppSearchBarConstants.searchBarBorderRadius,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: _AppSearchBarConstants.searchBarHorizontalPadding,
          ),
          child: Stack(
            children: [
              // Search icon (left) - SVG from assets
              Positioned(
                left: _AppSearchBarConstants.iconLeftPadding,
                top: 0,
                bottom: 0,
                child: Center(
                  child: SvgPicture.asset(
                    BovieAssets.icons.search,
                    width: _AppSearchBarConstants.searchIconWidth,
                    height: _AppSearchBarConstants.searchIconHeight,
                  ),
                ),
              ),
              // Microphone icon (right) - SVG from assets
              Positioned(
                right: _AppSearchBarConstants.iconRightPadding,
                top: 0,
                bottom: 0,
                child: Center(
                  child: GestureDetector(
                    onTap: onMicrophoneTap,
                    child: BovieAssets.icons.mic.svg(
                      width: _AppSearchBarConstants.microphoneIconWidth,
                      height: _AppSearchBarConstants.microphoneIconHeight,
                    ),
                  ),
                ),
              ),
              // Search text field
              Padding(
                padding: const EdgeInsets.only(
                  left: _AppSearchBarConstants.placeholderTextLeftPadding,
                  right: _AppSearchBarConstants.microphoneIconWidth +
                      _AppSearchBarConstants.iconRightPadding +
                      8.0, // Extra spacing for right icon
                ),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: TextField(
                    controller: controller,
                    onChanged: onChanged,
                    decoration: InputDecoration(
                      hintText: hintText,
                      fillColor: Colors.transparent,
                      hintStyle: const TextStyle(
                        fontFamily: 'Inter',
                        fontSize: _AppSearchBarConstants.placeholderTextFontSize,
                        color: _AppSearchBarConstants.placeholderTextColor,
                        letterSpacing: _AppSearchBarConstants.placeholderTextLetterSpacing,
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
                      fontSize: _AppSearchBarConstants.placeholderTextFontSize,
                      color: AppColors.black,
                      letterSpacing: _AppSearchBarConstants.placeholderTextLetterSpacing,
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

/// Constants for app search bar
class _AppSearchBarConstants {
  _AppSearchBarConstants._();

  static const double searchBarHeight = 36.0;
  static const double searchBarBorderRadius = 10.0;
  static const Color searchBarBackgroundColor = Color(0xFFF3E9E9);
  static const double searchBarHorizontalPadding = 16.0;

  // Icons - SVG sizes from assets
  static const double searchIconWidth = 16.0;
  static const double searchIconHeight = 16.0;
  static const double microphoneIconWidth = 12.0;
  static const double microphoneIconHeight = 18.0;
  static const double iconLeftPadding = 8.0;
  static const double iconRightPadding = 8.0;

  // Placeholder text
  static const double placeholderTextLeftPadding = 30.0;
  static const Color placeholderTextColor = Color(0xFF968D8D);
  static const double placeholderTextFontSize = 17.0;
  static const double placeholderTextLetterSpacing = -0.41;
}
