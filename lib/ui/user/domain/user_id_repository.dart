/// Repository interface for managing user ID
/// 
/// Domain layer interface - framework agnostic
abstract class UserIdRepository {
  /// Get or create a unique user ID
  /// 
  /// If a user ID already exists, returns it.
  /// Otherwise, generates a new unique ID and stores it.
  Future<String> getUserId();
  
  /// Reset user ID (for testing purposes)
  /// 
  /// Removes the stored user ID, so next call to getUserId() will generate a new one.
  Future<void> resetUserId();
}

