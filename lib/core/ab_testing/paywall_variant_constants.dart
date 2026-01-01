/// Constants for Paywall A/B testing variants
/// 
/// This file contains all pricing and configuration constants for paywall variants.
/// No magic numbers should exist in variant_factory.dart or variant_decider.dart
/// 
/// Prices are stored as double values for mathematical operations.
/// Currency/metric formatting should be handled in the UI layer.
/// 
/// Note: All variants use the same pricing. Variants represent different designs/layouts only.
class PaywallVariantConstants {
  PaywallVariantConstants._();

  // Currency/Metric
  static const String currencyCode = 'USD';
  static const String currencySymbol = '\$';

  // Common Pricing (all variants use the same prices)
  static const double weeklyPrice = 4.99;
  static const double yearlyPrice = 29.99;
  static const bool hasTrial = true;
}

