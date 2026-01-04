import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/ui/home/presentation/widgets/for_you_section.dart';
import 'package:bovie/ui/home/presentation/widgets/category_header_section.dart';
import 'package:bovie/ui/home/presentation/widgets/category_bar.dart';
import 'package:bovie/ui/home/presentation/widgets/category_feed.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/app/config/app_config.dart';

import '../../../core/utils/figma_constants.dart';
import 'home_store.dart';


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
    final categoryBarHeight = 32.0 + FigmaConstants.spacing20.sh(context); // From CategoryBar
    // Calculate Category Feed height: total height - Category Bar - spacing
    final categoryFeedHeight = availableHeight - categoryBarHeight + FigmaConstants.spacing40.sh(context);

    return Scaffold(
      backgroundColor: AppColors.black,
      body: Stack(
        children: [
          // Reset button (only in dev mode)

          CustomScrollView(
            controller: _scrollController,
            slivers: [
              SliverToBoxAdapter(
                child: SizedBox(height: FigmaConstants.spacing20.sh(context)),
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
                child: SizedBox(height: FigmaConstants.spacing20.sh(context)),
              ),
              // Category Header (Title + Search Bar)
              const SliverToBoxAdapter(
                child: CategoryHeaderSection(),
              ),
              SliverToBoxAdapter(
                child: SizedBox(height: FigmaConstants.spacing20.sh(context)),
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
          if (config.environment == AppEnvironment.dev)
            Positioned(
              top: MediaQuery.of(context).padding.top + FigmaConstants.spacing8.sh(context),
              right: FigmaConstants.spacing16.sw(context),
              child: GestureDetector(
                onTap: () async {
                  // Reset onboarding data in SharedPreferences
                  await onboardingRepository.resetAllSelections();
                  // Reset splash store state
                  splashStore.reset();
                  // Navigate back to splash to restart flow
                  // Splash will detect onboarding is not complete and show onboarding screens
                  if (mounted) {
                    context.go(AppRoutes.splash);
                  }
                },
                child: Container(
                  padding: EdgeInsets.all(FigmaConstants.spacing8.sw(context)),

                  child: Icon(
                    Icons.refresh,
                    color: AppColors.white,
                    size: FigmaConstants.iconSize24.w(context),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
