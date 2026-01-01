/// Paywall variant types for A/B testing
/// 
/// Variants represent different design/layout options for the paywall screen.
/// Based on README: "Implement logic to randomly display Variant A or Variant B 
/// of the Paywall (designs provided)" - these are primarily design variants.
/// 
/// This enum is designed to be extensible - new variants (testC, testD, etc.)
/// can be added without changing the core decision logic.
enum PaywallVariant {
  /// Control variant (baseline design)
  control,
  
  /// Test variant A (design variant A)
  testA,
  
  /// Test variant B (design variant B)
  testB,
  
  // Future variants can be added here:
  // testC,
  // testD,
  // etc.
}

/// Interface for remote variant configuration
/// 
/// This interface allows for future integration with remote config services
/// (e.g., Firebase Remote Config, custom backend) without changing the core
/// variant decision logic.
abstract class RemoteVariantConfig {
  /// Get the variant assignment for a specific user
  /// Returns null if remote config is not available or disabled
  PaywallVariant? getVariantForUser(String userId);

  /// Check if remote config is enabled
  bool get isRemoteConfigEnabled;
}

/// Default implementation that disables remote config
/// Can be replaced with actual remote config implementation
class DefaultRemoteVariantConfig implements RemoteVariantConfig {
  const DefaultRemoteVariantConfig();

  @override
  PaywallVariant? getVariantForUser(String userId) => null;

  @override
  bool get isRemoteConfigEnabled => false;
}

