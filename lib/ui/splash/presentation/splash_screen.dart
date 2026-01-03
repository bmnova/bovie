import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/ui/splash/presentation/splash_store.dart';
import 'package:bovie/generated/assets.gen.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:mobx/mobx.dart';

class _SplashConstants {
  // Layout from Figma (375 × 812)
  static const double logoWidth = 166.0;
  static const double logoHeight = 166.0; // Square aspect ratio

  // Typography
  static const double appNameFontSize = 24.0;
  static const double appNameTopSpacing = 0.0; // Directly below logo
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  late final SplashStore _store;
  final _disposers = <ReactionDisposer>[];

  @override
  void initState() {
    super.initState();
    // Hide system UI for full-screen splash
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);

    _store = splashStore;

    _disposers.add(
      reaction(
        (_) => _store.nextRoute,
        (String? nextRoute) {
          if (nextRoute != null && mounted) {
            context.go(nextRoute);
          }
        },
      ),
    );

    _store.init();
  }

  @override
  void dispose() {
    // Restore system UI
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);

    for (var disposer in _disposers) {
      disposer();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final scaleFactor = screenSize.width / FigmaConstants.designWidth;

    return Scaffold(
      backgroundColor: AppColors.black,
      body: Observer(
        builder: (_) {
          if (_store.error != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    _store.error ?? localizations.splashError,
                    style: context.textTheme.bodyLarge?.copyWith(
                      color: AppColors.redLight,
                    ),
                  ),
                  SizedBox(height: FigmaHelper.scaleHeight(context, FigmaConstants.spacing16)),
                  ElevatedButton(
                    onPressed: _store.init,
                    child: Text(localizations.retry),
                  ),
                ],
              ),
            );
          }

          return Stack(
            children: [
              // Main Content (Logo + App Name)
              _buildMainContent(context, scaleFactor),
            ],
          );
        },
      ),
    );
  }

  Widget _buildMainContent(BuildContext context, double scaleFactor) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Logo/Icon
          SizedBox(
            width: FigmaHelper.scaleWidth(context, _SplashConstants.logoWidth),
            height: FigmaHelper.scaleWidth(context, _SplashConstants.logoHeight),
            child: _buildLogo(context),
          ),

          SizedBox(height: FigmaHelper.scaleHeight(context, _SplashConstants.appNameTopSpacing)),

          // App Name
          Text(
            appName,
            style: context.textTheme.headlineSmall?.copyWith(
              color: AppColors.white,
              fontSize: FigmaHelper.scaleFontSize(context, _SplashConstants.appNameFontSize),
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildLogo(BuildContext context) {
    return BovieAssets.images.clapperboard.image(fit: BoxFit.contain);
  }
}
