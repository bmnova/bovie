import 'dart:math' as math;
import 'package:flutter/material.dart';

class _FigmaConstants {
  _FigmaConstants._();

  static const double centerScale = 1.0;
  static const double edgeScale = 1.04;

  static const double perspectiveDepth = 0.003;

  static double getCircularRadius(double screenWidth) => screenWidth * 1.5;

  static const double maxRotationAngle = math.pi / 6; 
}

class CurvedHorizontalScroll extends StatefulWidget {
  final ScrollController? controller;
  final int itemCount;
  final Widget Function(BuildContext context, int index) itemBuilder;

  final double itemWidth;
  final double itemHeight;
  final double itemSpacing;

  final EdgeInsets? padding;
  final int viewportItemCount;

  const CurvedHorizontalScroll({
    super.key,
    this.controller,
    required this.itemCount,
    required this.itemBuilder,
    required this.itemWidth,
    required this.itemHeight,
    this.itemSpacing = 16.0,
    this.padding,
    this.viewportItemCount = 2,
  });

  @override
  State<CurvedHorizontalScroll> createState() => _CurvedHorizontalScrollState();
}

class _CurvedHorizontalScrollState extends State<CurvedHorizontalScroll> {
  late final ScrollController _scrollController;
  double _scrollOffset = 0;

  @override
  void initState() {
    super.initState();
    _scrollController = widget.controller ?? ScrollController();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    if (widget.controller == null) _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() => setState(() => _scrollOffset = _scrollController.offset);

  Map<String, double> _calculateCircularPosition(double itemCenterX, double screenWidth) {
    final screenCenterX = screenWidth / 2;
    final distanceFromCenter = itemCenterX - screenCenterX;

    // ✅ clamp daha geç: kart tamamen çıkınca saturate et
    final maxDistance = (screenWidth / 2) + (widget.itemWidth / 2);

    final normalizedDistance =
    (distanceFromCenter / maxDistance).clamp(-1.0, 1.0);

    final angle = normalizedDistance * _FigmaConstants.maxRotationAngle;

    final radius = _FigmaConstants.getCircularRadius(screenWidth);
    final zPosition = radius * (1 - math.cos(angle)); // 0 center, edges > 0

    final normalizedZ = (zPosition / radius).clamp(0.0, 1.0);
    final scale = _FigmaConstants.centerScale +
        (normalizedZ * (_FigmaConstants.edgeScale - _FigmaConstants.centerScale));

    return {
      'normalizedDistance': normalizedDistance,
      'angle': angle,
      'zPosition': zPosition,
      'scale': scale,
    };
  }

  double _edgeCompensationDx({
    required double normalizedDistance,
    required double angle,
    required double scale,
    required double zTranslation, // final translateZ that will be applied (negative)
  }) {
    final cosAbs = math.cos(angle).abs();

    // Base visual width before perspective
    final w = widget.itemWidth * scale;

    // Perspective enlarges when zTranslation is negative:
    // w' = 1 + p*z ; projected scale approx = 1 / w'
    final denom = 1.0 + (_FigmaConstants.perspectiveDepth * zTranslation);
    final perspectiveScale = (denom.abs() < 1e-6) ? 1.0 : (1.0 / denom);

    final projectedW = w * perspectiveScale;

    // rotateY shrinks projected width by cosAbs -> loss = projectedW*(1-cosAbs)
    // shift half of that outward to keep OUTER edge stable
    final delta = (projectedW * (1.0 - cosAbs)) / 2.0;

    // right side (+) push right, left side (-) push left
    return (normalizedDistance >= 0) ? delta : -delta;
  }

  Matrix4 _buildMatrix({
    required double normalizedDistance,
    required double angle,
    required double zPosition,
    required double scale,
  }) {
    // We want edges to come "forward" -> negative z with this perspective setup.
    final zT = -zPosition; // negative -> closer (bigger)
    final dx = _edgeCompensationDx(
      normalizedDistance: normalizedDistance,
      angle: angle,
      scale: scale,
      zTranslation: zT,
    );

    final m = Matrix4.identity()..setEntry(3, 2, _FigmaConstants.perspectiveDepth);

    // translate() yerine multiply -> UnimplementedError yaşamazsın
    m.multiply(Matrix4.translationValues(dx, 0.0, zT));
    m.multiply(Matrix4.rotationY(angle));
    m.scale(scale, scale);

    return m;
  }

  EdgeInsets _autoPaddingForViewport({
    required double screenWidth,
    required double itemWidth,
    required double itemSpacing,
    required int viewportItemCount,
  }) {
    final count = viewportItemCount.clamp(1, 10);
    final total = (count * itemWidth) + ((count - 1) * itemSpacing);
    final side = ((screenWidth - total) / 2).clamp(0.0, double.infinity);
    return EdgeInsets.symmetric(horizontal: side);
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;

    final effectivePadding = widget.padding ??
        _autoPaddingForViewport(
          screenWidth: screenWidth,
          itemWidth: widget.itemWidth,
          itemSpacing: widget.itemSpacing,
          viewportItemCount: widget.viewportItemCount,
        );

    final horizontalPadding = effectivePadding.left;

    return SizedBox(
      height: widget.itemHeight,
      child: ListView.separated(
        controller: _scrollController,
        scrollDirection: Axis.horizontal,
        clipBehavior: Clip.none,
        padding: effectivePadding,
        itemCount: widget.itemCount,
        separatorBuilder: (_, __) => SizedBox(width: widget.itemSpacing),
        itemBuilder: (context, index) {
          final itemStartX = horizontalPadding +
              (index * (widget.itemWidth + widget.itemSpacing)) -
              _scrollOffset;
          final itemCenterX = itemStartX + (widget.itemWidth / 2);

          final pos = _calculateCircularPosition(itemCenterX, screenWidth);

          final nd = pos['normalizedDistance']!;
          final angle = pos['angle']!;
          final zPosition = pos['zPosition']!;
          final scale = pos['scale']!;

          final matrix = _buildMatrix(
            normalizedDistance: nd,
            angle: angle,
            zPosition: zPosition,
            scale: scale,
          );

          return SizedBox(
            width: widget.itemWidth,
            height: widget.itemHeight,
            child: Transform(
              transform: matrix,
              alignment: Alignment.center,
              child: widget.itemBuilder(context, index),
            ),
          );
        },
      ),
    );
  }
}
