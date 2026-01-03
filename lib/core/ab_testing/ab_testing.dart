/// A/B Testing infrastructure for Paywall variants
/// 
/// This module provides:
/// - Variant decision logic (deterministic, extensible)
/// - Remote configuration support (interface for future integration)
/// - Variant properties factory (no magic numbers)
/// 
/// Usage:
/// ```dart
/// final decider = VariantDecider(userId);
/// final variant = decider.decide();
/// final props = VariantFactory.getProps(variant);
/// ```
library;

export 'paywall_variant_constants.dart';
export 'paywall_config.dart';
export 'remote_variant_config.dart';
export 'variant_decider.dart';
export 'variant_factory.dart';

