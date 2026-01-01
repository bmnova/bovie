import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/core/ab_testing/remote_variant_config.dart';

/// Properties for a paywall variant
/// 
/// Contains all UI-relevant data for displaying a specific variant.
/// Prices are stored as double values - formatting should be done in UI layer.
/// 
/// Note: Variants represent different designs/layouts only.
/// All variants use the same pricing.
class PaywallVariantProps {
  final double weeklyPrice;
  final double yearlyPrice;
  final String currencyCode;
  final String currencySymbol;
  final bool hasTrial;
  final PaywallVariant variantType;

  const PaywallVariantProps({
    required this.weeklyPrice,
    required this.yearlyPrice,
    required this.currencyCode,
    required this.currencySymbol,
    required this.variantType,
    this.hasTrial = true,
  });

  /// Format weekly price as string with currency symbol
  /// Example: formatWeeklyPrice() returns "$4.99"
  String formatWeeklyPrice() {
    return '$currencySymbol${weeklyPrice.toStringAsFixed(2)}';
  }

  /// Format yearly price as string with currency symbol
  /// Example: formatYearlyPrice() returns "$29.99"
  String formatYearlyPrice() {
    return '$currencySymbol${yearlyPrice.toStringAsFixed(2)}';
  }
}

/// Factory for creating variant-specific properties
/// 
/// This factory is extensible - adding new variants only requires:
/// 1. Adding the variant to PaywallVariant enum
/// 2. Adding constants to PaywallVariantConstants
/// 3. Adding a case to the switch statement
/// 
/// No changes needed to the paywall screen logic.
class VariantFactory {
  VariantFactory._();

  /// Get properties for a specific variant
  /// 
  /// All pricing and configuration values come from PaywallVariantConstants
  /// to avoid magic numbers in the codebase.
  /// 
  /// All variants use the same pricing - only the variantType differs.
  static PaywallVariantProps getProps(PaywallVariant variant) {
    return PaywallVariantProps(
      weeklyPrice: PaywallVariantConstants.weeklyPrice,
      yearlyPrice: PaywallVariantConstants.yearlyPrice,
      currencyCode: PaywallVariantConstants.currencyCode,
      currencySymbol: PaywallVariantConstants.currencySymbol,
      variantType: variant,
      hasTrial: PaywallVariantConstants.hasTrial,
    );
  }
}
