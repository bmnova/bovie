import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:desktop_window/desktop_window.dart';
import 'package:bovie/generated/l10n.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/app/config/app_config.dart';
import 'package:bovie/app/theme/app_theme.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:bovie/core/utils/globals.dart';

import 'core/utils/figma_constants.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set window size for macOS
  if (Platform.isMacOS || kIsWeb) {
    const windowSize = Size(FigmaConstants.designWidth, FigmaConstants.designHeight);
    await DesktopWindow.setWindowSize(windowSize);
  }
  
  // Load .env file
  await dotenv.load(fileName: ".env");
  
  final prefs = await SharedPreferences.getInstance();

  final config = AppConfig(
    appName: '${dotenv.env['APP_NAME'] ?? 'Bovie'} (Dev)',
    environment: AppEnvironment.dev,
    baseUrl: dotenv.env['TMDB_BASE_URL'] ?? 'https://api.themoviedb.org/3',
    tmdbToken: dotenv.env['TMDB_TOKEN'] ?? '',
    logEnabled: true,
  );

  bootstrap(config, prefs);
}

void bootstrap(AppConfig config, SharedPreferences prefs) {
  setupDI(config, prefs);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp.router(
      title: config.appName,
      routerConfig: router,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.light,
      localizationsDelegates: const [
        S.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: S.delegate.supportedLocales,
    );
}
