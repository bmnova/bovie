import 'package:flutter/material.dart';

/// Text widget that automatically adapts to constraints:
/// - If height constraint exists: scales down text to fit
/// - If width constraint exists: uses ellipsis overflow
class FittedText extends StatelessWidget {
  final String text;
  final TextStyle? style;
  final TextAlign textAlign;
  final int? maxLines;
  final TextOverflow overflow;

  const FittedText({
    super.key,
    required this.text,
    this.style,
    this.textAlign = TextAlign.center,
    this.maxLines = 1,
    this.overflow = TextOverflow.ellipsis,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final hasHeightConstraint = constraints.maxHeight.isFinite && constraints.maxHeight < double.infinity;
        final hasWidthConstraint = constraints.maxWidth.isFinite && constraints.maxWidth < double.infinity;

        // If we have height constraint but no width constraint, scale down
        if (hasHeightConstraint && !hasWidthConstraint) {
          return FittedBox(
            fit: BoxFit.scaleDown,
            alignment: _getAlignment(textAlign),
            child: Text(
              text,
              style: style,
              textAlign: textAlign,
              maxLines: maxLines,
              overflow: overflow,
            ),
          );
        }

        // If we have width constraint (or both), use ellipsis
        if (hasWidthConstraint) {
          return Text(
            text,
            style: style,
            textAlign: textAlign,
            maxLines: maxLines,
            overflow: overflow,
          );
        }

        // No constraints, use FittedBox as fallback
        return FittedBox(
          fit: BoxFit.scaleDown,
          alignment: _getAlignment(textAlign),
          child: Text(
            text,
            style: style,
            textAlign: textAlign,
            maxLines: maxLines,
            overflow: overflow,
          ),
        );
      },
    );
  }

  AlignmentGeometry _getAlignment(TextAlign? align) {
    switch (align) {
      case TextAlign.left:
        return Alignment.centerLeft;
      case TextAlign.right:
        return Alignment.centerRight;
      case TextAlign.center:
        return Alignment.center;
      default:
        return Alignment.center;
    }
  }
}

