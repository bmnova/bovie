import 'package:bovie/generated/l10n.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/ui/home/presentation/widgets/for_you_section.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/ui/home/presentation/home_store.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/app/router/router.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final HomeStore _store;

  @override
  void initState() {
    super.initState();
    _store = getIt<HomeStore>();
    _store.loadForYouMovies();
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
      body: Observer(
        builder: (_) {
          if (_store.isLoading && _store.forYouMovies.isEmpty) {
            return const Center(child: CircularProgressIndicator());
          }

          return SingleChildScrollView(
            child: Column(
              children: [
                ForYouSection(
                  movies: _store.forYouMovies,
                  onLoadMore: _store.loadMoreForYouMovies,
                  isLoadingMore: () => _store.isLoadingMore,
                ),
                // TODO: Add other sections here
              ],
            ),
          );
        },
      ),
    );
}

