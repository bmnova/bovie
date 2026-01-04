import 'package:flutter/material.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/core/widgets/widgets.dart';

/// Figma constants for category header section
class _FigmaConstants {
  _FigmaConstants._();

  // Header title
  static const double headerTitleFontSize = 24.0;
  static const Color headerTitleColor = Color(0xFFF3E9E9); // White from Figma
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
          padding: EdgeInsets.only(
            left: FigmaConstants.spacing16.sw(context),
            bottom: FigmaConstants.spacing20.sh(context),
          ),
          child: Text(
            'Movies 🎬',
            style: context.textTheme.headlineSmall?.copyWith(
              fontSize: _FigmaConstants.headerTitleFontSize.f(context),
              color: _FigmaConstants.headerTitleColor,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        // Search bar
        Padding(
          padding: EdgeInsets.symmetric(
            horizontal: FigmaConstants.spacing16.sw(context),
          ),
          child: AppSearchBar(
            hintText: localizations.search,
          ),
        ),
      ],
    );
}

