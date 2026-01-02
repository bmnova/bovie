import 'package:bovie/generated/l10n.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:bovie/core/widgets/widgets.dart';
import 'package:bovie/ui/home/presentation/widgets/for_you_section.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/domain/get_popular_movies_usecase.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/ui/onboarding/domain/onboarding_repository.dart';
import 'package:bovie/ui/home/presentation/home_store.dart';
import 'package:bovie/core/utils/tmdb_image_url_builder.dart';

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
    _store = HomeStore(getPopularMovies, onboardingRepository);
    _store.loadForYouMovies();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
      backgroundColor: AppColors.black,
      appBar: AppBar(
        title: Text(S.of(context).home),
        backgroundColor: AppColors.black,
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
                ),
                // TODO: Add other sections here
              ],
            ),
          );
        },
      ),
    );
}

