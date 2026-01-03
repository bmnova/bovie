import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/core/ab_testing/remote_variant_config.dart';

/// Paywall configuration constants
/// 
/// Contains default plans, feature configurations, and variant-specific settings
/// for paywall screens. All paywall-related configuration should be centralized here.
class PaywallConfig {
  PaywallConfig._();

  /// Default subscription plan for each paywall variant
  /// 
  /// - PaywallScreenA (control/testA): Weekly plan
  /// - PaywallScreenB (testB): Yearly plan
  static SubscriptionPlan getDefaultPlanForVariant(PaywallVariant variant) {
    switch (variant) {
      case PaywallVariant.control:
      case PaywallVariant.testA:
        return SubscriptionPlan.weekly;
      case PaywallVariant.testB:
        return SubscriptionPlan.yearly;
    }
  }

  /// Feature availability configuration for each subscription plan
  /// Format: [feature1, feature2, feature3, feature4]
  /// 1 = enabled, 0 = disabled
  /// 
  /// - Weekly: [true, true, false, false] = 1,1,0,0
  /// - Monthly: [true, true, true, false] = 1,1,1,0
  /// - Yearly: [true, true, true, true] = 1,1,1,1
  static List<bool> getFeaturesForPlan(SubscriptionPlan plan) {
    switch (plan) {
      case SubscriptionPlan.weekly:
        return [true, true, false, false]; // 1,1,0,0
      case SubscriptionPlan.monthly:
        return [true, true, true, false]; // 1,1,1,0
      case SubscriptionPlan.yearly:
        return [true, true, true, true]; // 1,1,1,1
    }
  }

  /// Get feature availability for free trial mode
  /// Free mode always returns all features enabled: [true, true, true, true] = 1,1,1,1
  static List<bool> getFeaturesForFreeMode() {
    return [true, true, true, true]; // 1,1,1,1
  }
}

