import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';
import 'package:bovie/features/splash/splash_store.dart';
import 'package:bovie/generated/assets.gen.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:mobx/mobx.dart';

import '../../app/config/app_config.dart';
import 'package:bovie/app/config/app_config.dart';

class _SplashConstants {
  // Layout from Figma (375 × 812)
  static const double logoTopOffset = 309.0; // From top
  static const double logoWidth = 166.0;
  static const double logoHeight = 166.0; // Square aspect ratio
  static const double logoHorizontalOffset = 104.0; // From left (centered: (375-166)/2 = 104.5)
  
  // Typography
  static const double appNameFontSize = 24.0;
  static const double appNameTopSpacing = 0.0; // Directly below logo
  
  // Status bar
  static const double statusBarHeight = 50.0;
  static const double statusBarTopPadding = 21.0;
  
  // Home indicator
  static const double homeIndicatorTop = 778.0;
  static const double homeIndicatorHeight = 34.0;
  static const double homeIndicatorWidth = 144.0;
  static const double homeIndicatorBottomPadding = 8.0;
  static const double homeIndicatorBarHeight = 5.0;
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  late final SplashStore _store;
  late final AppConfig _appConfig;
  final _disposers = <ReactionDisposer>[];

  @override
  void initState() {
    super.initState();
    // Hide system UI for full-screen splash
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    
    _store = getIt<SplashStore>();
    _appConfig = getIt<AppConfig>();
    
    _disposers.add(
      reaction(
        (_) => _store.nextRoute,
        (String? nextRoute) {
          if (nextRoute != null && mounted) {
         //   context.go(nextRoute);
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
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
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
            'Bovie', 
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
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
