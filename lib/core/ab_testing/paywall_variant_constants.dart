/// Constants for Paywall A/B testing variants
/// 
/// This file contains all pricing and configuration constants for paywall variants.
/// No magic numbers should exist in variant_factory.dart or variant_decider.dart
/// 
/// Prices are stored as double values for mathematical operations.
/// Currency/metric formatting should be handled in the UI layer.
/// 
/// Note: All variants use the same pricing. Variants represent different designs/layouts only.
library;

/// Subscription plan types
enum SubscriptionPlan {
  weekly,
  monthly,
  yearly,
}

/// Subscription plan properties
class SubscriptionPlanProps {
  final SubscriptionPlan plan;
  final String title;
  final String subtitle;
  final double price;
  final String priceDisplay; // Formatted price string (e.g., "$4,99 / week")
  final bool hasBestValueBadge;

  const SubscriptionPlanProps({
    required this.plan,
    required this.title,
    required this.subtitle,
    required this.price,
    required this.priceDisplay,
    this.hasBestValueBadge = false,
  });
}

class PaywallVariantConstants {
  PaywallVariantConstants._();

  // Currency/Metric
  static const String currencyCode = 'USD';
  static const String currencySymbol = '\$';

  // Common Pricing (all variants use the same prices)
  static const double weeklyPrice = 4.99;
  static const double monthlyPrice = 11.99;
  static const double yearlyPrice = 49.99;
  static const bool hasTrial = true;

  // Subscription Plan Properties
  static SubscriptionPlanProps getWeeklyPlan() => SubscriptionPlanProps(
      plan: SubscriptionPlan.weekly,
      title: 'Weekly',
      subtitle: 'Only \$${_formatPrice(weeklyPrice)} per week',
      price: weeklyPrice,
      priceDisplay: '\$${_formatPrice(weeklyPrice)} / week',
      hasBestValueBadge: false,
    );

  static SubscriptionPlanProps getMonthlyPlan() {
    const weeklyEquivalent = monthlyPrice / 4;
    return SubscriptionPlanProps(
      plan: SubscriptionPlan.monthly,
      title: 'Monthly',
      subtitle: 'Only \$${_formatPrice(weeklyEquivalent)} per week',
      price: monthlyPrice,
      priceDisplay: '\$${_formatPrice(monthlyPrice)} / month',
      hasBestValueBadge: false,
    );
  }

  static SubscriptionPlanProps getYearlyPlan() {
    const weeklyEquivalent = yearlyPrice / 52;
    return SubscriptionPlanProps(
      plan: SubscriptionPlan.yearly,
      title: 'Yearly',
      subtitle: 'Only \$${_formatPrice(weeklyEquivalent)} per week',
      price: yearlyPrice,
      priceDisplay: '\$${_formatPrice(yearlyPrice)} / year',
      hasBestValueBadge: true,
    );
  }

  /// Format price with comma as decimal separator (Figma design uses comma)
  static String _formatPrice(double price) => price.toStringAsFixed(2).replaceAll('.', ',');

  /// Get properties for a specific subscription plan
  static SubscriptionPlanProps getPlanProps(SubscriptionPlan plan) {
    switch (plan) {
      case SubscriptionPlan.weekly:
        return getWeeklyPlan();
      case SubscriptionPlan.monthly:
        return getMonthlyPlan();
      case SubscriptionPlan.yearly:
        return getYearlyPlan();
    }
  }
}

