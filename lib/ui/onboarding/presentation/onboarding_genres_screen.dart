import 'package:flutter/material.dart';

import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/core/domain/get_genres_usecase.dart';
import 'package:mobx/mobx.dart';
import 'package:bovie/core/utils/globals.dart';

import 'onboarding_genres_store.dart';

class OnboardingGenresScreen extends StatefulWidget {
  const OnboardingGenresScreen({super.key});

  @override
  State<OnboardingGenresScreen> createState() => _OnboardingGenresScreenState();
}

class _OnboardingGenresScreenState extends State<OnboardingGenresScreen> {
  late final OnboardingGenresStore _store;
  final _disposers = <ReactionDisposer>[];

  @override
  void initState() {
    super.initState();
    _store = OnboardingGenresStore(
      getGenres,
      onboardingRepository,
    );
    _store.fetchGenres();

    _disposers.add(
      reaction(
            (_) => _store.onboardingFinished,
            (bool finished) {
          if (finished && mounted) {
            context.go(AppRoutes.paywall);
          }
        },
      ),
    );
  }

  @override
  void dispose() {
    for (var disposer in _disposers) {
      disposer();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
      appBar: AppBar(
        title: Text(localizations.pick2Genres),
      ),
      body: Observer(
        builder: (_) {
          if (_store.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          return Column(
            children: [
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(FigmaConstants.spacing16),
                  child: Wrap(
                    spacing: FigmaConstants.spacing12,
                    runSpacing: FigmaConstants.spacing12,
                    children: _store.genres.map((genre) => MovieGenreCard(
                        imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644ef7467?w=200',
                        isSelected: _store.selectedGenreIds.contains(genre.id),
                        onTap: () => _store.toggleSelection(genre.id),
                      )).toList(),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(FigmaConstants.spacing16),
                child: AppButton(
                  text: localizations.next,
                  isEnabled: _store.canContinue,
                  onPressed: () => context.push(AppRoutes.onboardingMovies),
                ),
              ),
            ],
          );
        },
      ),
    );
}
