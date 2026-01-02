import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/ui/onboarding/presentation/onboarding_movies_store.dart';
import 'package:bovie/ui/onboarding/presentation/widgets/curved_horizontal_scroll.dart';
import 'package:bovie/core/domain/get_popular_movies_usecase.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/core/widgets/basic/app_button.dart';
import 'package:bovie/core/widgets/basic/movie_poster_card.dart';
import 'package:bovie/generated/l10n.dart';

/// Figma constants specific to OnboardingMoviesScreen
class _FigmaConstants {
  _FigmaConstants._();

  // Header
  static const double headerTopPadding = 88.0;
  static const double headerGap = 12.0;
  static const double headerHorizontalPadding = 20.0;

  // Movie selection
  static const double movieSelectionTopPosition = 288.0;
  static const double movieItemSpacing = 0.0;
  static const double moviePosterAspectRatio = 180.0 / 252.0; // width / height from Figma

  // Button
  static const double buttonBottomPadding = 57.0;
  static const double buttonHorizontalPadding = 20.0;

  // Font sizes
  static const double titleFontSize = 24.0;
  static const double subtitleFontSize = 20.0;

  // Scroll pagination threshold
  static const double scrollPaginationThreshold = 200.0;

  /// Calculate poster width so that exactly 2 posters + 1 gap fit on screen
  /// Formula: 2 * posterWidth + gap = screenWidth
  /// posterWidth = (screenWidth - gap) / 2
  static double calculatePosterWidth(double screenWidth) {
    return (screenWidth - movieItemSpacing) / 2;
  }

  /// Calculate poster height based on aspect ratio
  static double calculatePosterHeight(double posterWidth) {
    return posterWidth / moviePosterAspectRatio;
  }
}

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
    _store = OnboardingMoviesStore(getPopularMovies);
    _store.fetchNextPage();

    _scrollController.addListener(_onScroll);
  }

  void _onScroll() {
    if (_scrollController.position.pixels >=
        _scrollController.position.maxScrollExtent -
            _FigmaConstants.scrollPaginationThreshold) {
        _store.fetchNextPage();
      }
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.black,
      body: SafeArea(
        child: Observer(
          builder: (_) {
            if (_store.isLoading && _store.movies.isEmpty) {
              return const Center(
                child: CircularProgressIndicator(color: AppColors.white),
              );
            }

            return Stack(
              children: [
                // Header
                Positioned(
                  top: _FigmaConstants.headerTopPadding -
                      MediaQuery.of(context).padding.top,
                  left: _FigmaConstants.headerHorizontalPadding,
                  right: _FigmaConstants.headerHorizontalPadding,
                  child: _buildHeader(context),
                ),
                // Movie Selection with curved scroll
                Positioned(
                  top: _FigmaConstants.movieSelectionTopPosition -
                      MediaQuery.of(context).padding.top,
                  left: 0,
                  right: 0,
                  child: _buildMovieSelection(context),
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
  }

  Widget _buildHeader(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          S.of(context).welcome,
          style: context.textTheme.headlineMedium?.copyWith(
            color: AppColors.white,
            fontSize: _FigmaConstants.titleFontSize,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: _FigmaConstants.headerGap),
        Text(
          S.of(context).chooseYour3FavoriteMovies,
          style: context.textTheme.titleLarge?.copyWith(
            color: AppColors.white,
            fontSize: _FigmaConstants.subtitleFontSize,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }

  Widget _buildMovieSelection(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final posterWidth = _FigmaConstants.calculatePosterWidth(screenWidth);
    final posterHeight = _FigmaConstants.calculatePosterHeight(posterWidth);

    return Observer(
      builder: (_) => CurvedHorizontalScroll(
        controller: _scrollController,
        itemCount: _store.movies.length + (_store.isLoading ? 1 : 0),
        itemWidth: posterWidth,
        itemHeight: posterHeight,
        itemSpacing: _FigmaConstants.movieItemSpacing,
        padding: EdgeInsets.zero, // No horizontal screen padding
        itemBuilder: (context, index) {
          // Loading indicator at the end
          if (index == _store.movies.length) {
            return SizedBox(
              width: posterWidth,
              height: posterHeight,
              child: const Center(
                child: CircularProgressIndicator(color: AppColors.white),
              ),
            );
          }

          final movie = _store.movies[index];
          final isSelected = _store.selectedMovieIds.contains(movie.id);

          return MoviePosterCard(
            imageUrl: movie.posterPath,
            isSelected: isSelected,
            width: posterWidth,
            height: posterHeight,
            onTap: () => _store.toggleSelection(movie.id),
            );
          },
        ),
      );
  }

  Widget _buildButton(BuildContext context) {
    return Observer(
      builder: (_) => AppButton(
        text: localizations.continueText,
        isEnabled: _store.canContinue,
        onPressed: () => context.push(AppRoutes.onboardingGenres),
      ),
    );
  }
}
