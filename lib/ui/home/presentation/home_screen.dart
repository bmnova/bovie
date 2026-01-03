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

  @override
  void initState() {
    super.initState();
    _store = getIt<HomeStore>();
    // Data is already loaded in SplashScreen, no need to load again
  }

  @override
  Widget build(BuildContext context) => Scaffold(
      backgroundColor: AppColors.black,
      appBar: AppBar(
        title: Text(S.of(context).home),
        backgroundColor: AppColors.black,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: AppColors.white),
            onPressed: () async {
              await _store.resetAllSelections();
              if (mounted) {
                context.go(AppRoutes.splash);
              }
            },
            tooltip: 'Reset all selections',
          ),
        ],
      ),
      body: Column(
            children: [
              // For You Section
              ForYouSection(
                movies: _store.forYouMovies,
                onLoadMore: _store.loadMoreForYouMovies,
                isLoadingMore: () => _store.isLoadingMore,
              ),
              const SizedBox(height: FigmaConstants.spacing20),
              // Category Header (Title + Search Bar)
              const CategoryHeaderSection(),
              const SizedBox(height: FigmaConstants.spacing20),
              // Category Bar (Horizontal scrollable chips)
              Observer(
                builder: (_) => CategoryBar(
                    genres: _store.categories.toList(),
                    selectedGenreId: _store.activeCategoryId,
                    onGenreTap: (genreId) {
                      _categoryFeedKey.currentState?.scrollToCategory(genreId);
                    },
                  ),
              ),
              const SizedBox(height: FigmaConstants.spacing20),
              // Category Feed (Vertically stacked categories)
              Expanded(
                child: CategoryFeed(
                  key: _categoryFeedKey,
                  store: _store,
                ),
              ),
            ],
          ));


}

