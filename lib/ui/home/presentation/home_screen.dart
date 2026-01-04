import 'package:bovie/generated/l10n.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/ui/home/presentation/widgets/for_you_section.dart';
import 'package:bovie/ui/home/presentation/widgets/category_header_section.dart';
import 'package:bovie/ui/home/presentation/widgets/category_bar.dart';
import 'package:bovie/ui/home/presentation/widgets/category_feed.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/ui/home/presentation/home_store.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/app/router/router.dart';

import '../../../core/utils/figma_constants.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final HomeStore _store;
  final GlobalKey<CategoryFeedState> _categoryFeedKey = GlobalKey<CategoryFeedState>();
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _store = getIt<HomeStore>();
    // Data is already loaded in SplashScreen, no need to load again
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final screenHeight = mediaQuery.size.height;
    final appBarHeight = AppBar().preferredSize.height;
    final statusBarHeight = mediaQuery.padding.top;
    final availableHeight = screenHeight - statusBarHeight - appBarHeight;

    // Calculate Category Bar height
    const categoryBarHeight = 32.0 + FigmaConstants.spacing20; // From CategoryBar
    // Calculate Category Feed height: total height - Category Bar - spacing
    final categoryFeedHeight = availableHeight - categoryBarHeight + FigmaConstants.spacing40;

    return Scaffold(
      backgroundColor: AppColors.black,
      body: Stack(
        children: [
          CustomScrollView(
            controller: _scrollController,
            slivers: [
              SliverToBoxAdapter(
                child: const SizedBox(height: FigmaConstants.spacing20),
              ),
              // For You Section
              SliverToBoxAdapter(
                child: ForYouSection(
                  movies: _store.forYouMovies,
                  onLoadMore: _store.loadMoreForYouMovies,
                  isLoadingMore: () => _store.isLoadingMore,
                ),
              ),
              SliverToBoxAdapter(
                child: const SizedBox(height: FigmaConstants.spacing20),
              ),
              // Category Header (Title + Search Bar)
              const SliverToBoxAdapter(
                child: CategoryHeaderSection(),
              ),
              SliverToBoxAdapter(
                child: const SizedBox(height: FigmaConstants.spacing20),
              ),
              // Category Bar (Sticky at top when scrolled)
              SliverAppBar(
                pinned: true,
                floating: false,
                backgroundColor: AppColors.black,
                toolbarHeight: categoryBarHeight,
                automaticallyImplyLeading: false,
                flexibleSpace: Observer(
                  builder: (_) => CategoryBar(
                    genres: _store.categories.toList(),
                    selectedGenreId: _store.activeCategoryId,
                    onGenreTap: (genreId) {
                      // Save main scroll position before scrolling Category Feed
                      final mainScrollPosition = _scrollController.hasClients ? _scrollController.position.pixels : 0.0;

                      // Scroll Category Feed to selected category
                      _categoryFeedKey.currentState?.scrollToCategory(genreId);

                      // Restore main scroll position after a frame to prevent reset
                      WidgetsBinding.instance.addPostFrameCallback((_) {
                        if (_scrollController.hasClients && mounted) {
                          _scrollController.jumpTo(mainScrollPosition);
                        }
                      });
                    },
                  ),
                ),
              ),

              // Category Feed (Fixed height based on available space, independent scroll)
              SliverToBoxAdapter(
                child: SizedBox(
                  height: categoryFeedHeight,
                  child: Center(
                    child: CategoryFeed(
                      key: _categoryFeedKey,
                      store: _store,
                      mainScrollController: _scrollController,
                    ),
                  ),
                ),
              ),
            ],
          ),
          // Bottom gradient shadow at screen bottom
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            height: 140.0, // From Figma
            child: IgnorePointer(
              child: Container(
                width: 343.0, // From Figma
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Color(0x000F0E0E), // rgba(15, 14, 14, 0)
                      Color(0xFF0F0E0E), // #0F0E0E
                    ],
                    stops: [0.0, 1.0],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
