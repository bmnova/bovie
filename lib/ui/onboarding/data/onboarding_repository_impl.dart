import 'package:shared_preferences/shared_preferences.dart';
import '../domain/onboarding_repository.dart';

/// Implementation of OnboardingRepository using SharedPreferences
/// 
/// Data layer implementation - handles persistence
class OnboardingRepositoryImpl implements OnboardingRepository {
  final SharedPreferences _prefs;
  
  static const String _onboardingCompleteKey = 'onboarding_complete';
  static const String _selectedGenresKey = 'selected_genres';

  OnboardingRepositoryImpl(this._prefs);

  @override
  Future<bool> isOnboardingComplete() async {
    return _prefs.getBool(_onboardingCompleteKey) ?? false;
  }

  @override
  Future<void> setOnboardingComplete(bool value) async {
    await _prefs.setBool(_onboardingCompleteKey, value);
  }

  @override
  Future<List<int>> getSelectedGenreIds() async {
    final genreIdsString = _prefs.getStringList(_selectedGenresKey) ?? [];
    return genreIdsString.map((e) => int.tryParse(e) ?? 0).where((e) => e != 0).toList();
  }

  @override
  Future<void> setSelectedGenreIds(List<int> genreIds) async {
    await _prefs.setStringList(
      _selectedGenresKey,
      genreIds.map((e) => e.toString()).toList(),
    );
  }
}

