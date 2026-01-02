import 'package:flutter/material.dart';

import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/ui/onboarding/presentation/onboarding_movies_store.dart';
import 'package:bovie/core/domain/get_popular_movies_usecase.dart';
import 'package:bovie/core/utils/tmdb_image_url_builder.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:bovie/core/utils/globals.dart';

import '../../core/utils/figma_constants.dart';
import '../../core/widgets/basic/app_button.dart';

class OnboardingMoviesScreen extends StatefulWidget {
  const OnboardingMoviesScreen({super.key});

  @override
  State<OnboardingMoviesScreen> createState() => _OnboardingMoviesScreenState();
}

class _OnboardingMoviesScreenState extends State<OnboardingMoviesScreen> {
  late final OnboardingMoviesStore _store;
  final ScrollController _scrollController = ScrollController();
  final double scrollPadding = 200;
  @override
  void initState() {
    super.initState();
    _store = OnboardingMoviesStore(getPopularMovies);
    _store.fetchNextPage();

    _scrollController.addListener(() {
      if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent - scrollPadding) {
        _store.fetchNextPage();
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text(localizations.pick3Movies),
        ),
        body: Observer(
          builder: (_) {
            if (_store.isLoading && _store.movies.isEmpty) {
              return const Center(child: CircularProgressIndicator());
            }

            return Column(
              children: [
                Expanded(
                  child: GridView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(FigmaConstants.spacing16),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.7,
                      crossAxisSpacing: FigmaConstants.spacing16,
                      mainAxisSpacing: FigmaConstants.spacing16,
                    ),
                    itemCount: _store.movies.length + (_store.isLoading ? 1 : 0),
                    itemBuilder: (context, index) {
                      if (index == _store.movies.length) {
                        return const Center(child: CircularProgressIndicator());
                      }

                      final movie = _store.movies[index];
                      final isSelected = _store.selectedMovieIds.contains(movie.id);

                      return GestureDetector(
                        onTap: () => _store.toggleSelection(movie.id),
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            CachedNetworkImage(
                              imageUrl: TmdbImageUrlBuilder.build(movie.posterPath, size: 'w500'),
                              fit: BoxFit.cover,
                              placeholder: (context, url) => Container(color: Colors.grey[300]),
                              errorWidget: (context, url, error) => const Icon(Icons.error),
                            ),
                            if (isSelected)
                              Container(
                                color: context.colorScheme.primary.withValues(alpha: 0.5),
                                child: Icon(
                                  Icons.check_circle,
                                  color: context.colorScheme.onPrimary,
                                  size: FigmaConstants.iconSize40,
                                ),
                              ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(FigmaConstants.spacing16),
                  child: Column(
                    children: [
                      AppButton(
                        text: localizations.next,
                        isEnabled: _store.canContinue,
                        onPressed: () => context.push(AppRoutes.onboardingGenres),
                      ),
                      const SizedBox(height: FigmaConstants.spacing8),
                      AppButton(
                        text: 'Test Paywall',
                        onPressed: () => context.push(AppRoutes.paywall),
                      ),
                    ],
                  ),
                ),
              ],
            );
          },
        ),
      );
}
