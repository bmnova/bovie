enum AppEnvironment { dev, staging, prod }

class AppConfig {
  final String appName;
  final AppEnvironment environment;
  final String baseUrl;
  final String tmdbToken;
  final bool logEnabled;

  AppConfig({
    required this.appName,
    required this.environment,
    required this.baseUrl,
    required this.tmdbToken,
    this.logEnabled = true,
  });
}
