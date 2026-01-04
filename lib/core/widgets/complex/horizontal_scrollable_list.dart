import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:mobx/mobx.dart';
import '../../utils/figma_constants.dart';
import '../../../app/theme/app_colors.dart';

/// Generic horizontal scrollable list widget with infinite scroll support
/// 
/// A reusable horizontal scrollable list that supports:
/// - Observable list for reactive updates
/// - Infinite scroll (load more on scroll)
/// - Loading indicator
/// - Custom item builder
/// 
/// Example:
/// ```dart
/// HorizontalScrollableList<Movie>(
///   items: observableMoviesList,
///   itemBuilder: (context, index, movie) => CircularImageItem(
///     imageUrl: movie.posterPath,
///     size: 80,
///   ),
///   itemSize: 80,
///   itemSpacing: 20,
///   onLoadMore: () => store.loadMore(),
///   isLoadingMore: () => store.isLoadingMore,
/// )
/// ```
class HorizontalScrollableList<T> extends StatefulWidget {
  /// Horizontal scrollable list items
  final ObservableList<T> items;
  
  /// Builder function for each item
  final Widget Function(BuildContext context, int index, T item) itemBuilder;
  
  /// Height (for horizontal) or width (for vertical) of each item
  final double itemSize;
  
  /// Spacing between items in the main axis
  final double itemSpacing;
  
  /// Number of items in the cross axis (rows for horizontal scroll)
  final int crossAxisCount;

  /// Spacing between items in the cross axis
  final double crossAxisSpacing;

  /// Aspect ratio of each item (width / height)
  final double childAspectRatio;

  /// Callback when user scrolls near the end (for infinite scroll)
  final VoidCallback? onLoadMore;
  
  /// Function that returns whether more items are being loaded
  final bool Function() isLoadingMore;
  
  /// Horizontal padding for the list
  final EdgeInsets? padding;
  
  /// Placeholder count when items list is empty
  final int? placeholderCount;

  const HorizontalScrollableList({
    super.key,
    required this.items,
    required this.itemBuilder,
    required this.itemSize,
    this.itemSpacing = FigmaConstants.spacing20,
    this.crossAxisCount = 1,
    this.crossAxisSpacing = 0.0,
    this.childAspectRatio = 1.0,
    this.onLoadMore,
    required this.isLoadingMore,
    this.padding,
    this.placeholderCount,
  });

  @override
  State<HorizontalScrollableList<T>> createState() => _HorizontalScrollableListState<T>();
}

class _HorizontalScrollableListState<T> extends State<HorizontalScrollableList<T>> {
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (!_scrollController.hasClients) return;
    
    final maxScroll = _scrollController.position.maxScrollExtent;
    final currentScroll = _scrollController.position.pixels;
    
    // Load more when within 100px of the end
    if (maxScroll > 0 && currentScroll >= maxScroll - 100) {
      widget.onLoadMore?.call();
    }
  }

  @override
  Widget build(BuildContext context) {
    // Total height for horizontal scroll or total width for vertical scroll
    final totalCrossAxisExtent = (widget.itemSize * widget.crossAxisCount) + 
        (widget.crossAxisSpacing * (widget.crossAxisCount - 1));

    return SizedBox(
      height: totalCrossAxisExtent,
      child: Observer(
        builder: (_) {
          final items = widget.items;
          final isLoading = widget.isLoadingMore();
          
          // If loading, we add placeholders to fill the last column or just show one loader
          // For simplicity, we just add 1 item for the loader if it's the last one.
          final itemCount = items.isNotEmpty 
              ? items.length + (isLoading ? 1 : 0)
              : (widget.placeholderCount ?? 0);
          
          return GridView.builder(
            controller: _scrollController,
            scrollDirection: Axis.horizontal,
            padding: widget.padding ?? EdgeInsets.symmetric(
              horizontal: FigmaConstants.spacing20.sw(context),
            ),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: widget.crossAxisCount,
              mainAxisSpacing: widget.itemSpacing,
              crossAxisSpacing: widget.crossAxisSpacing,
              childAspectRatio: widget.childAspectRatio,
            ),
            itemCount: itemCount,
            itemBuilder: (context, index) {
              // Loading indicator at the end
              if (isLoading && index == items.length) {
                return const Center(
                  child: SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      color: AppColors.white,
                      strokeWidth: 2,
                    ),
                  ),
                );
              }
              
              if (items.isNotEmpty && index < items.length) {
                return widget.itemBuilder(context, index, items[index]);
              }
              
              // Placeholder when items list is empty
              return const SizedBox.shrink();
            },
          );
        },
      ),
    );
  }
}

