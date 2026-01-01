import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';

/// Primary button component with enabled/disabled states
class AppButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isEnabled;

  const AppButton({
    super.key,
    required this.text,
    this.onPressed,
    this.isEnabled = true,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: isEnabled ? onPressed : null,
      style: ElevatedButton.styleFrom(
        backgroundColor: isEnabled ? context.colorScheme.primary : context.colorScheme.surfaceContainerHighest,
        foregroundColor: isEnabled ? context.colorScheme.onPrimary : context.colorScheme.onSurfaceVariant,
        elevation: isEnabled ? 2 : 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        minimumSize: const Size(double.infinity, 48),
      ),
      child: Text(
        text,
        style: context.textTheme.labelLarge?.copyWith(
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

