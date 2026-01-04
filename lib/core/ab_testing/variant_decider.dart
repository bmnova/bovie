import 'package:bovie/core/ab_testing/remote_variant_config.dart';

/// Decides which paywall variant to show for a user
/// 
/// This class implements a time-based random variant assignment strategy:
/// - Different variant on each app launch (time-based randomness)
/// - Even distribution across all variants
/// - Supports remote configuration override
/// - Extensible for new variants without code changes
class VariantDecider {
  final String _userId;
  final RemoteVariantConfig _remoteConfig;

  VariantDecider(
    this._userId, {
    RemoteVariantConfig? remoteConfig,
  }) : _remoteConfig = remoteConfig ?? const DefaultRemoteVariantConfig();

  /// Decides which variant to show for the user
  /// 
  /// Priority:
  /// 1. Remote config (if enabled and available)
  /// 2. Time-based random local assignment
  PaywallVariant decide() {
    // Check remote config first
    if (_remoteConfig.isRemoteConfigEnabled) {
      final remoteVariant = _remoteConfig.getVariantForUser(_userId);
      if (remoteVariant != null) {
        return remoteVariant;
      }
    }

    // Fallback to time-based random local assignment
    return _decideLocally();
  }

  /// Time-based random variant assignment
  /// 
  /// Uses current time to ensure:
  /// - Different variant on each app launch (time-based randomness)
  /// - Even distribution across variants
  /// - Works with any number of variants (extensible)
  PaywallVariant _decideLocally() {
    // Use current time in milliseconds for randomness
    final timeBasedSeed = DateTime.now().millisecondsSinceEpoch;
    final variantCount = PaywallVariant.values.length;
    final variantIndex = timeBasedSeed % variantCount;
    return PaywallVariant.values[variantIndex];
  }
}
