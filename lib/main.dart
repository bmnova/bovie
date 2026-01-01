import 'package:flutter/material.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/app/config/app_config.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Load .env file
  await dotenv.load(fileName: ".env");
  
  final prefs = await SharedPreferences.getInstance();

  final config = AppConfig(
    environment: AppEnvironment.dev,
    baseUrl: dotenv.env['TMDB_BASE_URL'] ?? 'https://api.themoviedb.org/3',
    tmdbToken: dotenv.env['TMDB_TOKEN'] ?? '',
    logEnabled: true,
  );

  setupDI(config, prefs);

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp.router(
      title: 'Bovie',
      routerConfig: router,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
    );
}
