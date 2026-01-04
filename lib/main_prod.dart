import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:desktop_window/desktop_window.dart';
import 'package:bovie/main.dart';
import 'package:bovie/app/config/app_config.dart';
import 'package:bovie/core/utils/figma_constants.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  if (Platform.isMacOS || kIsWeb) {
    const windowSize = Size(FigmaConstants.designWidth, FigmaConstants.designHeight);
    await DesktopWindow.setWindowSize(windowSize);
  }
  
  await dotenv.load(fileName: ".env");
  
  final prefs = await SharedPreferences.getInstance();

  final config = AppConfig(
    appName: dotenv.env['APP_NAME'] ?? 'Bovie',
    environment: AppEnvironment.prod,
    baseUrl: 'https://api.themoviedb.org/3',
    tmdbToken: dotenv.env['TMDB_TOKEN'] ?? '',
    logEnabled: false, // Logging disabled in Prod
  );

  bootstrap(config, prefs);
}
