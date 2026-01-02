import 'dart:math';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:bovie/ui/user/domain/user_id_repository.dart';

/// Implementation of UserIdRepository using SharedPreferences
/// 
/// Data layer implementation - handles persistence
class UserIdRepositoryImpl implements UserIdRepository {
  final SharedPreferences _prefs;
  static const String _userIdKey = 'ab_testing_user_id';
  static final _random = Random();

  UserIdRepositoryImpl(this._prefs);

  @override
  Future<String> getUserId() async {
    String? userId = _prefs.getString(_userIdKey);

    if (userId == null || userId.isEmpty) {
      userId = _generateUniqueId();
      await _prefs.setString(_userIdKey, userId);
    }

    return userId;
  }

  @override
  Future<void> resetUserId() async {
    await _prefs.remove(_userIdKey);
  }

  /// Generate a unique ID (UUID-like format without external dependency)
  String _generateUniqueId() {
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    final random = _random.nextInt(1000000);
    return '${timestamp}_$random';
  }
}

