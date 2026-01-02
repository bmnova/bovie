/// Repository interface for managing onboarding state
/// 
/// Domain layer interface - framework agnostic
abstract class OnboardingRepository {
  /// Check if onboarding is complete
  Future<bool> isOnboardingComplete();
  
  /// Mark onboarding as complete
  Future<void> setOnboardingComplete(bool value);
  
  /// Get selected genre IDs from onboarding
  Future<List<int>> getSelectedGenreIds();
  
  /// Save selected genre IDs from onboarding
  Future<void> setSelectedGenreIds(List<int> genreIds);
}

