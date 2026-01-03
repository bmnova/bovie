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
import '../../../core/widgets/basic/app_button.dart';
import '../../../core/widgets/basic/movie_genre_card.dart';
import 'onboarding_genres_store.dart';

/// Figma constants specific to OnboardingGenresScreen
class _FigmaConstants {
  _FigmaConstants._();

  // Header
  static const double headerTopPadding = 36.0; // Padding after SafeArea
  static const double headerLeft = 20.0; // Left position from Figma
  static const double headerWidth = 335.0; // Width from Figma
  static const double headerHeight = 65.0; // Height from Figma
  static const double headerToGenreSpacing = 72.0; // Spacing from header to genre selection

  // Button
  static const double buttonBottomPadding = 57.0;
  static const double buttonHorizontalPadding = 20.0;

  // Font sizes
  static const double titleFontSize = 24.0;
  static const double subtitleFontSize = 20.0;

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
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: AppColors.black,
        body: SafeArea(
          child: Observer(
            builder: (_) {
              if (_store.isLoading && _store.genres.isEmpty) {
                return const Center(
                  child: CircularProgressIndicator(color: AppColors.white),
                );
              }

              final safeAreaTop = MediaQuery.of(context).padding.top;
              final headerTop = safeAreaTop + _FigmaConstants.headerTopPadding;
              final genreSelectionTop = headerTop + _FigmaConstants.headerHeight + _FigmaConstants.headerToGenreSpacing;
              final topGradientTop = genreSelectionTop - _FigmaConstants.topGradientOffset;
              final buttonTop = _FigmaConstants.buttonBottomPadding;

              return Stack(
                children: [
                  // Header
                  Positioned(
                    top: headerTop,
                    left: _FigmaConstants.headerLeft,
                    width: _FigmaConstants.headerWidth,
                    height: _FigmaConstants.headerHeight,
                    child: _buildHeader(context),
                  ),
                  // Genre Selection (extends behind button)
                  Positioned(
                    top: genreSelectionTop,
                    left: 0,
                    right: 0,
                    bottom: 0, // Extends to bottom of screen, behind button
                    child: _buildGenreSelection(context),
                  ),
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
                  // Continue Button
                  Positioned(
                    bottom: _FigmaConstants.buttonBottomPadding,
                    left: _FigmaConstants.buttonHorizontalPadding,
                    right: _FigmaConstants.buttonHorizontalPadding,
                    child: _buildButton(context),
                  ),
                ],
              );
            },
          ),
        ),
      );

  Widget _buildHeader(BuildContext context) {
    return Observer(
      builder: (_) {
        final hasSelection = _store.selectedGenreIds.isNotEmpty;

        if (hasSelection) {
          // Thank you: vertical center in container
          return Align(
            alignment: Alignment.centerLeft,
            child: Text(
              context.localizations.thankYou,
              style: context.textTheme.headlineMedium?.copyWith(
                color: AppColors.white,
                fontSize: _FigmaConstants.titleFontSize,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.start,
            ),
          );
        } else {
          // Welcome + Choose your 2 favorite genres: top aligned
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                context.localizations.welcome,
                style: context.textTheme.headlineMedium?.copyWith(
                  color: AppColors.white,
                  fontSize: _FigmaConstants.titleFontSize,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                context.localizations.chooseYour2FavoriteGenres,
                style: context.textTheme.titleMedium?.copyWith(
                  color: AppColors.white,
                  fontSize: _FigmaConstants.subtitleFontSize,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          );
        }
      },
    );
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
              final isSelected = _store.selectedGenreIds.contains(genre.id);
              return Observer(
                builder: (_) => MovieGenreCard(
                  imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644ef7467?w=200',
                  isSelected: isSelected,
                  onTap: () => _store.toggleSelection(genre.id),
                ),
              );
            }).toList(),
          ),
        ),
      ),
    );
  }

  Widget _buildButton(BuildContext context) {
    return Observer(
      builder: (_) => AppButton(
        text: localizations.continueText,
        isEnabled: _store.canContinue,
        onPressed: () => context.push(AppRoutes.onboardingMovies),
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
