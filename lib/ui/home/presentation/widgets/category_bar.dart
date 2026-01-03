import 'package:flutter/material.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/core/domain/genre.dart';
import 'package:flutter/rendering.dart';

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
    print('CategoryBar didUpdateWidget: old=${oldWidget.selectedGenreId}, new=${widget.selectedGenreId}');
    if (widget.selectedGenreId != oldWidget.selectedGenreId && widget.selectedGenreId != null) {
      print('Selected genre changed, scheduling scroll to chip');
      // Use post frame callback to ensure the widget is built and keys are available
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) {
          print('PostFrameCallback: calling _scrollToSelectedChip');
          _scrollToSelectedChip();
        } else {
          print('PostFrameCallback: widget not mounted');
        }
      });
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToSelectedChip() {
    print('_scrollToSelectedChip called');
    print('  hasClients: ${_scrollController.hasClients}');
    print('  selectedGenreId: ${widget.selectedGenreId}');
    
    if (!_scrollController.hasClients) {
      print('  ERROR: ScrollController has no clients');
      return;
    }
    
    if (widget.selectedGenreId == null) {
      print('  ERROR: selectedGenreId is null');
      return;
    }
    
    // Find the chip's index
    final index = widget.genres.indexWhere((g) => g.id == widget.selectedGenreId);
    print('  chip index: $index');
    if (index == -1) {
      print('  ERROR: chip index not found');
      return;
    }
    
    // Calculate the position by measuring all chips up to this index
    // We need to measure each chip's width
    double totalWidth = _FigmaConstants.categoryBarHorizontalPadding; // Start with left padding
    print('  starting totalWidth: $totalWidth');
    
    // First, try to measure visible chips
    bool allChipsMeasured = true;
    for (int i = 0; i < index; i++) {
      final chipKey = _chipKeys[widget.genres[i].id];
      final chipContext = chipKey?.currentContext;
      if (chipContext != null) {
        final chipRenderObject = chipContext.findRenderObject();
        if (chipRenderObject != null && chipRenderObject is RenderBox) {
          final chipWidth = chipRenderObject.size.width;
          totalWidth += chipWidth;
          print('  chip $i width: $chipWidth, totalWidth: $totalWidth');
          if (i < index - 1) {
            totalWidth += _FigmaConstants.chipGap; // Add gap between chips
            print('  added gap, totalWidth: $totalWidth');
          }
        } else {
          allChipsMeasured = false;
          print('  WARNING: chip $i renderObject is null or not RenderBox');
        }
      } else {
        allChipsMeasured = false;
        print('  WARNING: chip $i context is null (not visible)');
      }
    }
    
    // Get the selected chip's width
    final selectedChipKey = _chipKeys[widget.selectedGenreId];
    final selectedChipContext = selectedChipKey?.currentContext;
    double selectedChipWidth = 0;
    
    if (selectedChipContext != null) {
      final selectedChipRenderObject = selectedChipContext.findRenderObject();
      if (selectedChipRenderObject != null && selectedChipRenderObject is RenderBox) {
        selectedChipWidth = selectedChipRenderObject.size.width;
        print('  selected chip width: $selectedChipWidth');
      }
    }
    
    // If we couldn't measure all chips, use estimated width
    if (!allChipsMeasured || selectedChipWidth == 0) {
      print('  Using estimated chip width');
      // Estimate chip width based on average text length
      // Average chip width is approximately 80-120px depending on text
      const estimatedChipWidth = 100.0;
      const estimatedSelectedChipWidth = 100.0;
      
      // Recalculate with estimated widths
      totalWidth = _FigmaConstants.categoryBarHorizontalPadding;
      for (int i = 0; i < index; i++) {
        totalWidth += estimatedChipWidth;
        if (i < index - 1) {
          totalWidth += _FigmaConstants.chipGap;
        }
      }
      selectedChipWidth = estimatedSelectedChipWidth;
      print('  estimated totalWidth: $totalWidth, selectedChipWidth: $selectedChipWidth');
    }
    
    // Calculate target scroll offset to position chip at start with 20px padding
    const startPadding = 20.0;
    final chipStart = totalWidth;
    final targetOffset = chipStart - startPadding;
    final maxScroll = _scrollController.position.maxScrollExtent;
    final clampedOffset = targetOffset.clamp(0.0, maxScroll);
    
    print('  chipStart: $chipStart');
    print('  startPadding: $startPadding');
    print('  targetOffset: $targetOffset');
    print('  maxScroll: $maxScroll');
    print('  clampedOffset: $clampedOffset');
    
    _scrollController.animateTo(
      clampedOffset,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
    print('  animateTo called');
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

