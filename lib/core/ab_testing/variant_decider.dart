import 'package:bovie/core/ab_testing/remote_variant_config.dart';

/// Decides which paywall variant to show for a user
/// 
/// This class implements a deterministic variant assignment strategy:
/// - Same user always gets the same variant (consistent experience)
/// - Random distribution across all variants
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
  /// 2. Deterministic local assignment (based on user ID hash)
  PaywallVariant decide() {
    // Check remote config first
    if (_remoteConfig.isRemoteConfigEnabled) {
      final remoteVariant = _remoteConfig.getVariantForUser(_userId);
      if (remoteVariant != null) {
        return remoteVariant;
      }
    }

    // Fallback to deterministic local assignment
    return _decideLocally();
  }

  /// Deterministic variant assignment based on user ID
  /// 
  /// Uses hash of user ID to ensure:
  /// - Same user always gets same variant
  /// - Even distribution across variants
  /// - Works with any number of variants (extensible)
  PaywallVariant _decideLocally() {
    final hash = _userId.hashCode.abs();
    final variantCount = PaywallVariant.values.length;
    final variantIndex = hash % variantCount;
    return PaywallVariant.values[variantIndex];
  }
}
