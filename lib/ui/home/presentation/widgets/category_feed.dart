import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:bovie/ui/home/presentation/widgets/category_section.dart';
import 'package:bovie/ui/home/presentation/home_store.dart';
import 'package:mobx/mobx.dart';
import 'home_layout_constants.dart';

/// Category feed widget displaying vertically stacked categories
/// 
/// Features:
/// - Scroll tracking: Updates active category chip as user scrolls
/// - Tap interaction: Tapping a category scrolls to that section
/// - Each category displays 9 movies horizontally
class CategoryFeed extends StatefulWidget {
  final HomeStore store;

  const CategoryFeed({
    super.key,
    required this.store,
  });

  @override
  State<CategoryFeed> createState() => CategoryFeedState();
}

/// Public state class for CategoryFeed to allow external access
class CategoryFeedState extends State<CategoryFeed> {

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

      _scrollController.animateTo(
        targetOffset.clamp(0.0, _scrollController.position.maxScrollExtent),
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) => Observer(
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

        return ListView.builder(
          controller: _scrollController,
          itemExtent: HomeLayoutConstants.categorySectionHeight,
          itemCount: categories.length,
          itemBuilder: (context, index) {
            final genre = categories[index];
            return CategorySection(
              store: widget.store,
              genre: genre,
            );
          },
        );
      },
    );

  /// Public method to scroll to a category (called from CategoryBar)
  void scrollToCategory(int categoryId) => _scrollToCategory(categoryId);
}

