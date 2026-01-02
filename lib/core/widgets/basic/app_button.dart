import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/app/theme/app_colors.dart';

/// Primary button component with enabled/disabled states and optional horizontal pulse animation
class AppButton extends StatefulWidget {
  final String? text;
  final Widget? child;
  final VoidCallback? onPressed;
  final bool isEnabled;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final double? height;
  final double borderRadius;
  final bool enableAnimation;
  final Widget? endingIcon;

  const AppButton({
    super.key,
    this.text,
    this.child,
    this.onPressed,
    this.isEnabled = true,
    this.backgroundColor,
    this.foregroundColor,
    this.height,
    this.borderRadius = FigmaConstants.radius8,
    this.enableAnimation = false,
    this.endingIcon,
  }) : assert(text != null || child != null, 'Either text or child must be provided');

  @override
  State<AppButton> createState() => _AppButtonState();
}

class _AppButtonState extends State<AppButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;
  bool? _previousAnimationState;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: FigmaConstants.animationDurationMedium,
    );
    _pulseAnimation = Tween<double>(
      begin: _AppButtonConstants.pulseScaleBegin,
      end: _AppButtonConstants.pulseScaleEnd,
    ).animate(
      CurvedAnimation(
        parent: _pulseController,
        curve: Curves.linear,
      ),
    );

    // Start animation if enabled from the beginning (with delay)
    if (widget.enableAnimation) {
      Future.delayed(FigmaConstants.animationDelayShort, () {
        if (mounted) {
          _pulseController.repeat(reverse: true);
          _previousAnimationState = true;
        }
      });
    }
  }

  @override
  void didUpdateWidget(AppButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Update animation when enableAnimation changes
    if (_previousAnimationState != widget.enableAnimation) {
      _previousAnimationState = widget.enableAnimation;
      if (widget.enableAnimation) {
        // Start animation with delay
        Future.delayed(FigmaConstants.animationDelayShort, () {
          if (mounted) {
            _pulseController.repeat(reverse: true);
          }
        });
      } else {
        _pulseController.stop();
        _pulseController.reset();
      }
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  Widget _buildButtonContent(BuildContext context) {
    final content = widget.child ??
        Text(
          widget.text!,
          style: context.textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w600,
            color: widget.foregroundColor ?? AppColors.white,
          ),
        );

    if (widget.endingIcon != null) {
      return Stack(
        children: [
          Center(child: content),
          Positioned(
            right: FigmaConstants.spacing16,
            top: 0,
            bottom: 0,
            child: Center(child: widget.endingIcon!),
          ),
        ],
      );
    }

    return content;
  }

  @override
  Widget build(BuildContext context) {
    final effectiveBackgroundColor = widget.backgroundColor ??
        (widget.isEnabled ? AppColors.redLight : AppColors.redDark);

    Widget button = SizedBox(
      width: double.infinity,
      height: widget.height ?? FigmaConstants.buttonHeight,
      child: ElevatedButton(
        onPressed: widget.isEnabled ? widget.onPressed : null,
        style: ElevatedButton.styleFrom(
          backgroundColor: effectiveBackgroundColor,
          elevation: widget.isEnabled ? FigmaConstants.elevation2 : FigmaConstants.elevation0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(widget.borderRadius),
          ),
          padding: const EdgeInsets.symmetric(
            horizontal: FigmaConstants.spacing24,
            vertical: FigmaConstants.spacing12 + FigmaConstants.spacing2, // Approximate 14
          ),
        ),
        child: _buildButtonContent(context),
      ),
    );

    // Wrap with horizontal scale animation if enabled (only width changes, height stays same)
    if (widget.enableAnimation) {
      return AnimatedBuilder(
        animation: _pulseAnimation,
        builder: (context, child) => Transform(
            alignment: Alignment.center,
            transform: Matrix4.diagonal3Values(_pulseAnimation.value, 1.0, 1.0),
            child: button,
          ),
      );
    }

    return button;
  }
}

class _AppButtonConstants {
  // Scale values specific to AppButton pulse animation
  static const double pulseScaleBegin = 1.0;
  static const double pulseScaleEnd = 0.95;
}
