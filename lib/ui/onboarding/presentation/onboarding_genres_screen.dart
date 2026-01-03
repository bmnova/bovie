import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/domain/get_genres_usecase.dart';
import 'package:mobx/mobx.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/generated/l10n.dart';

import '../../../core/utils/figma_constants.dart';
import '../../../core/widgets/basic/movie_genre_card.dart';
import 'onboarding_genres_store.dart';
import 'widgets/onboarding_selection_screen_base.dart';

/// Figma constants specific to OnboardingGenresScreen
class _FigmaConstants {
  _FigmaConstants._();

  // Gradient shadows
  static const double topGradientHeight = 59.0;
  static const double bottomGradientHeight = 144.0;
  static const double topGradientOffset = 34.0; // Shadow başlangıcı slider başlangıcından 34px yukarıda

  // Genre spacing
  static const double genreHorizontalSpacing = 55.0; // 2 genre widget'ı arasında
  static const double genreVerticalSpacing = 24.0; // Satırlar arasında
}

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
  Widget build(BuildContext context) {
    return OnboardingSelectionScreenBase(
      bodyBuilder: (context, contentTop) => _buildGenreSelection(context),
      hasSelection: () => _store.selectedGenreIds.isNotEmpty,
      canContinue: () => _store.canContinue,
      onContinue: () => context.push(AppRoutes.onboardingMovies),
      selectedTitle: S.of(context).thankYou,
      welcomeTitle: S.of(context).welcome,
      welcomeSubtitle: S.of(context).chooseYour2FavoriteGenres,
      isLoading: () => _store.isLoading,
      hasData: () => _store.genres.isNotEmpty,
      overlayWidgetsBuilder: (contentTop) => _buildOverlayWidgets(context, contentTop),
    );
  }

  List<Widget> _buildOverlayWidgets(BuildContext context, double contentTop) {
    final topGradientTop = contentTop - _FigmaConstants.topGradientOffset;
    return [
      // Top gradient shadow (34px above genre selection start, overlay on top)
      Positioned(
        top: topGradientTop,
        left: 0,
        right: 0,
        height: _FigmaConstants.topGradientHeight,
        child: _buildTopGradient(),
      ),
      // Bottom gradient shadow (overlay on bottom, starts from bottom of screen)
      Positioned(
        bottom: 0,
        left: 0,
        right: 0,
        height: _FigmaConstants.bottomGradientHeight,
        child: _buildBottomGradient(),
      ),
    ];
  }

  Widget _buildGenreSelection(BuildContext context) {
    return Observer(
      builder: (_) => SingleChildScrollView(
        padding: EdgeInsets.only(
          left: FigmaConstants.spacing16,
          right: FigmaConstants.spacing16,
          top: 0,
        ),
        child: Center(
          child: Wrap(
            spacing: _FigmaConstants.genreHorizontalSpacing,
            runSpacing: _FigmaConstants.genreVerticalSpacing,
            alignment: WrapAlignment.center,
            children: _store.genres.map((genre) {
              return Observer(
                builder: (_) {
                  final isSelected = _store.selectedGenreIds.contains(genre.id);
                  return MovieGenreCard(
                    genreName: genre.name,
                    isSelected: isSelected,
                    onTap: () => _store.toggleSelection(genre.id),
                  );
                },
              );
            }).toList(),
          ),
        ),
      ),
    );
  }


  /// Top gradient shadow: linear-gradient(176.7deg, #0F0E0E 2.73%, rgba(15, 14, 14, 0) 97.28%)
  Widget _buildTopGradient() {
    return IgnorePointer(
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              AppColors.black, // #0F0E0E at 2.73%
              AppColors.black.withValues(alpha: 0.0), // rgba(15, 14, 14, 0) at 97.28%
            ],
            stops: const [0.0273, 0.9728],
          ),
        ),
      ),
    );
  }

  /// Bottom gradient shadow: linear-gradient(180deg, rgba(15, 14, 14, 0) 0%, #0F0E0E 100%)
  Widget _buildBottomGradient() {
    return IgnorePointer(
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              AppColors.black.withValues(alpha: 0.0), // rgba(15, 14, 14, 0) at 0%
              AppColors.black, // #0F0E0E at 100%
            ],
            stops: const [0.0, 1.0],
          ),
        ),
      ),
    );
  }
}
