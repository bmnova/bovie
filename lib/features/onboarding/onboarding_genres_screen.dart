import 'package:flutter/material.dart';

import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/generated/l10n.dart';
import 'package:bovie/features/onboarding/presentation/onboarding_genres_store.dart';
import 'package:bovie/features/onboarding/domain/get_genres_usecase.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobx/mobx.dart';

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
    _store =
        OnboardingGenresStore(getIt<GetGenres>(), getIt<SharedPreferences>());
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
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(S.of(context).pick2Genres),
        actions: [
          Observer(
            builder: (_) =>
                TextButton(
                  onPressed: _store.canContinue
                      ? _store.completeOnboarding
                      : null,
                  child: _store.isLoading
                      ? const SizedBox(width: 20,
                      height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2))
                      : Text(S.of(context).finish),
                ),
          ),
        ],
      ),
      body: Observer(
        builder: (_) {
          if (_store.isLoading && _store.genres.isEmpty) {
            return const Center(child: CircularProgressIndicator());
          }

          if (_store.error != null) {
            return Center(child: Text(_store.error!));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: _store.genres.length,
            itemBuilder: (context, index) {
              final genre = _store.genres[index];
              final isSelected = _store.selectedGenreIds.contains(genre.id);

              return CheckboxListTile(
                title: Text(genre.name),
                value: isSelected,
                onChanged: (_) => _store.toggleSelection(genre.id),
              );
            },
          );
        },
      ),
    );
  }
}
