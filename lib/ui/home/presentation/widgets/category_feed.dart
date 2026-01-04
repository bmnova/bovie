import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:bovie/ui/home/presentation/widgets/category_section.dart';
import 'package:mobx/mobx.dart';
import '../../presentation/home_store.dart';
import 'home_layout_constants.dart';

/// Category feed widget displaying vertically stacked categories
/// 
/// Features:
/// - Scroll tracking: Updates active category chip as user scrolls
/// - Tap interaction: Tapping a category scrolls to that section
/// - Each category displays 9 movies horizontally
class CategoryFeed extends StatefulWidget {
  final HomeStore store;
  final ScrollController? mainScrollController;

  const CategoryFeed({
    super.key,
    required this.store,
    this.mainScrollController,
  });

  @override
  State<CategoryFeed> createState() => CategoryFeedState();
}

/// Public state class for CategoryFeed to allow external access
class CategoryFeedState extends State<CategoryFeed> {

  final ScrollController _scrollController = ScrollController();
  final Map<int, double> _categoryOffsets = {
  }; // This was in the provided snippet, but not explicitly in instructions. Keeping for consistency.

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
    // Re-calculate offsets when categories change
    // This was in the provided snippet, but not explicitly in instructions. Keeping for consistency.
    reaction((_) => widget.store.categories.length, (_) {
      // _calculateCategoryOffsets(); // This method is not provided in the instructions or snippet.
    });

    // Listen to main scroll to update bottom padding
    widget.mainScrollController?.addListener(_onMainScroll);

    // Initial update
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (widget.mainScrollController?.hasClients == true) {
        _onMainScroll();
      }
    });
  }

  @override
  void dispose() {
    widget.mainScrollController?.removeListener(_onMainScroll);
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _onMainScroll() {
    if (widget.mainScrollController == null ||
        !widget.mainScrollController!.hasClients) return;

    widget.store.updateCategoryFeedBottomPadding(
      scrollPosition: widget.mainScrollController!.position.pixels,
      maxScroll: widget.mainScrollController!.position.maxScrollExtent,
      categorySectionHeight: HomeLayoutConstants.categorySectionHeight,
    );
  }

  void _onScroll() {
    if (!_scrollController.hasClients) return;

    final offset = _scrollController.offset;
    final index = (offset / HomeLayoutConstants.categorySectionHeight).floor();

    if (index >= 0 && index < widget.store.categories.length) {
      final categoryId = widget.store.categories[index].id;
      if (widget.store.activeCategoryId != categoryId) {
        // Use post frame to avoid build-time state updates if needed,
        // though mobx runInAction is usually enough.
        runInAction(() => widget.store.setActiveCategory(categoryId));
      }
    }
  }

  void _scrollToCategory(int categoryId) {
    if (!_scrollController.hasClients) return;

    final index = widget.store.categories.indexWhere((c) => c.id == categoryId);
    if (index != -1) {
      final targetOffset = index * HomeLayoutConstants.categorySectionHeight;

      // Temporarily disable scroll listener to prevent state updates during programmatic scroll
      _scrollController.removeListener(_onScroll);

      // Immediately update active category to reflect the selection
      runInAction(() => widget.store.setActiveCategory(categoryId));

      _scrollController.animateTo(
        targetOffset.clamp(0.0, _scrollController.position.maxScrollExtent),
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      ).then((_) {
        // Re-enable scroll listener after animation completes
        if (mounted) {
          _scrollController.addListener(_onScroll);
          // Ensure active category is set correctly after scroll completes
          runInAction(() => widget.store.setActiveCategory(categoryId));
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Observer(
      builder: (_) {
        final categories = widget.store.categories;

        // Loading state
        if (widget.store.isLoadingCategories && categories.isEmpty) {
          return const Center(child: CircularProgressIndicator());
        }

        // Error state
        if (widget.store.error != null && categories.isEmpty) {
          return Center(
            child: Text(
              widget.store.error!,
              style: const TextStyle(color: Colors.white),
            ),
          );
        }

        // Empty state
        if (categories.isEmpty) {
          return const Center(
            child: Text(
              'No categories available',
              style: TextStyle(color: Colors.white),
            ),
          );
        }

        return NotificationListener<ScrollNotification>(
          onNotification: (notification) {
            // Prevent scroll notifications from bubbling up to parent CustomScrollView
            // This ensures Category Feed scroll is independent from main scroll
            return true; // Consume the notification
          },
          child: Observer(
            builder: (_) {
              final bottomPadding = widget.store.categoryFeedBottomPadding;
              
              return ListView.builder(
                controller: _scrollController,
                physics: const ClampingScrollPhysics(),
                // Independent scroll from parent
                itemCount: categories.length + 1, // +1 for bottom SizedBox
                padding: EdgeInsets.only(bottom: bottomPadding),
                itemBuilder: (context, index) {
                  if (index == categories.length) {
                    return const SizedBox(height: HomeLayoutConstants.categorySectionHeight/2);
                  }
                  
                  final genre = categories[index];
                  return SizedBox(
                    height: HomeLayoutConstants.categorySectionHeight,
                    child: CategorySection(
                      key: ValueKey(genre.id),
                      genre: genre,
                      store: widget.store,
                    ),
                  );
                },
              );
            },
          ),
        );
      },
    );
  }

  /// Public method to scroll to a category (called from CategoryBar)
  void scrollToCategory(int categoryId) => _scrollToCategory(categoryId);


}