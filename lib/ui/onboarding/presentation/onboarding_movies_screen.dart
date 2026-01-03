import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/ui/onboarding/presentation/onboarding_movies_store.dart';
import 'package:bovie/ui/onboarding/presentation/widgets/curved_horizontal_scroll.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/core/widgets/basic/movie_poster_card.dart';
import 'package:bovie/generated/l10n.dart';
import 'widgets/onboarding_selection_screen_base.dart';

/// Figma constants specific to OnboardingMoviesScreen
class _FigmaConstants {
  _FigmaConstants._();

  // Movie selection
  static const double movieItemSpacing = 0.0;
  static const double moviePosterAspectRatio = 180.0 / 252.0; // width / height from Figma

  // Scroll pagination threshold
  static const double scrollPaginationThreshold = 200.0;
  
  static const double headerToContentSpacing = 135.0;

  /// Calculate poster width so that exactly 2 posters + 1 gap fit on screen
  /// Formula: 2 * posterWidth + gap = screenWidth
  /// posterWidth = (screenWidth - gap) / 2
  static double calculatePosterWidth(double screenWidth) => (screenWidth - movieItemSpacing) / 2;

  /// Calculate poster height based on aspect ratio
  static double calculatePosterHeight(double posterWidth) => posterWidth / moviePosterAspectRatio;
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
    _store = OnboardingMoviesStore(getPopularMovies, onboardingRepository);
    _store.fetchNextPage();

    _scrollController.addListener(_onScroll);
  }

  void _onScroll() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent - _FigmaConstants.scrollPaginationThreshold) {
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
  Widget build(BuildContext context) => OnboardingSelectionScreenBase(
      bodyBuilder: (context, contentTop) => _buildMovieSelection(context),
      hasSelection: () => _store.selectedMovieIds.isNotEmpty,
      canContinue: () => _store.canContinue,
      onContinue: () async {
        // Save selected movies before navigating
        await _store.saveSelectedMovies();
        if (mounted) {
          context.push(AppRoutes.onboardingGenres);
        }
      },
      selectedTitle: S.of(context).continueToNextStep,
      welcomeTitle: S.of(context).welcome,
      welcomeSubtitle: S.of(context).chooseYour3FavoriteMovies,
      isLoading: () => _store.isLoading,
      hasData: () => _store.movies.isNotEmpty,
      headerToContentSpacing: _FigmaConstants.headerToContentSpacing, // Movies için 135px spacing
      extendBodyToBottom: false, // Movies için body bottom'a uzamaz, belirli yükseklikte
    );

  Widget _buildMovieSelection(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final safeAreaTop = MediaQuery.of(context).padding.top;

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
              child: Center(
                child: CircularProgressIndicator(color: Theme.of(context).colorScheme.onSurface),
              ),
            );
          }

          final movie = _store.movies[index];

          // Wrap each poster card with Observer to react to selection changes
          return Observer(
            builder: (_) {
              final isSelected = _store.selectedMovieIds.contains(movie.id);
              return MoviePosterCard(
                imageUrl: movie.posterPath,
                isSelected: isSelected,
                width: posterWidth,
                height: posterHeight,
                onTap: () => _store.toggleSelection(movie.id),
              );
            },
          );
        },
      ),
    );
  }
}
