import 'package:flutter/material.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/generated/l10n.dart';

/// Global context provider
BuildContext get currentContext => rootNavigatorKey.currentContext!;

/// Global accessors for theme and localizations
ThemeData get theme => Theme.of(currentContext);
ColorScheme get colorScheme => theme.colorScheme;
TextTheme get textTheme => theme.textTheme;
S get localizations => S.of(currentContext);

extension LocalizationExtension on BuildContext {
  S get localizations => S.of(this);
}
