import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/core/domain/genre.dart';

/// Figma constants for category bar
class _FigmaConstants {
  _FigmaConstants._();

  // Category bar dimensions
  static const double categoryBarHeight = 32.0;
  static const double categoryBarHorizontalPadding = 16.0;
  static const double categoryBarVerticalPadding = 0.0;
  static const double chipGap = 12.0; // Gap between chips
}

class CategoryBar extends StatefulWidget {
  final List<Genre> genres;
  final int? selectedGenreId;
  final ValueChanged<int>? onGenreTap;

  const CategoryBar({
    super.key,
    required this.genres,
    this.selectedGenreId,
    this.onGenreTap,
  });

  @override
  State<CategoryBar> createState() => _CategoryBarState();
}

class _CategoryBarState extends State<CategoryBar> {
  final ScrollController _scrollController = ScrollController();
  final Map<int, GlobalKey> _chipKeys = {};

  @override
  void didUpdateWidget(CategoryBar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.selectedGenreId != oldWidget.selectedGenreId && widget.selectedGenreId != null) {
      _scrollToSelectedChip();
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToSelectedChip() {
    final key = _chipKeys[widget.selectedGenreId];
    final context = key?.currentContext;
    if (context != null) {
      Scrollable.ensureVisible(
        context,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        alignment: 0.5, // Center the chip if possible
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (widget.genres.isEmpty) {
      return const SizedBox(height: _FigmaConstants.categoryBarHeight);
    }

    // Ensure keys exist for all genres
    for (final genre in widget.genres) {
      _chipKeys.putIfAbsent(genre.id, () => GlobalKey());
    }

    return SizedBox(
      height: _FigmaConstants.categoryBarHeight,
      child: ListView.separated(
        controller: _scrollController,
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(
          horizontal: _FigmaConstants.categoryBarHorizontalPadding,
          vertical: _FigmaConstants.categoryBarVerticalPadding,
        ),
        itemCount: widget.genres.length,
        separatorBuilder: (context, index) => const SizedBox(
          width: _FigmaConstants.chipGap,
        ),
        itemBuilder: (context, index) {
          final genre = widget.genres[index];
          final isSelected = widget.selectedGenreId == genre.id;
          return AppChip(
            key: _chipKeys[genre.id],
            label: genre.name,
            isSelected: isSelected,
            onTap: () => widget.onGenreTap?.call(genre.id),
          );
        },
      ),
    );
  }
}

