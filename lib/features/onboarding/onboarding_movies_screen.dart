import 'package:flutter/material.dart';

import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/generated/l10n.dart';
import 'package:bovie/features/onboarding/presentation/onboarding_movies_store.dart';
import 'package:bovie/features/onboarding/domain/get_popular_movies_usecase.dart';
import 'package:bovie/core/utils/tmdb_image_url_builder.dart';
import 'package:cached_network_image/cached_network_image.dart';

class OnboardingMoviesScreen extends StatefulWidget {
  const OnboardingMoviesScreen({super.key});

  @override
  State<OnboardingMoviesScreen> createState() => _OnboardingMoviesScreenState();
}

class _OnboardingMoviesScreenState extends State<OnboardingMoviesScreen> {
  late final OnboardingMoviesStore _store;
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _store = OnboardingMoviesStore(getIt<GetPopularMovies>());
    _store.fetchNextPage();

    _scrollController.addListener(() {
      if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent - 200) {
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
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(S.of(context).pick3Movies),
        actions: [
          Observer(
            builder: (_) => TextButton(
              onPressed: _store.canContinue ? () => context.push(AppRoutes.onboardingGenres) : null,
              child: Text(S.of(context).continueText),
            ),
          ),
        ],
      ),
      body: Observer(
        builder: (_) {
          if (_store.movies.isEmpty && _store.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          return GridView.builder(
            controller: _scrollController,
            padding: const EdgeInsets.all(8),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              childAspectRatio: 2 / 3,
              crossAxisSpacing: 8,
              mainAxisSpacing: 8,
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
                      imageUrl: TmdbImageUrlBuilder.build(movie.posterPath, size: 'w200'),
                      fit: BoxFit.cover,
                      placeholder: (context, url) => Container(color: Colors.grey[300]),
                      errorWidget: (context, url, error) => const Icon(Icons.error),
                    ),
                    if (isSelected)
                      Container(
                        color: Colors.blue.withOpacity(0.5),
                        child: const Icon(Icons.check_circle, color: Colors.white, size: 40),
                      ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }
}
