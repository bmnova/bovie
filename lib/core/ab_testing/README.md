# A/B Testing Infrastructure

This module provides a clean, extensible A/B testing infrastructure for Paywall variants.

## Features

✅ **No Magic Numbers**: All pricing and configuration values are in `PaywallVariantConstants`  
✅ **Extensible**: Easy to add new variants (testC, testD, etc.) without rewriting screen logic  
✅ **Deterministic**: Same user always gets the same variant (consistent experience)  
✅ **Remote Config Ready**: Interface for future integration with remote config services  
✅ **Clean Architecture**: Separation of concerns, easy to test and maintain  
✅ **Design-Focused**: Variants represent different designs/layouts (as per README requirements)  
✅ **Unified Pricing**: All variants use the same pricing - variants differ only in design/layout

## Architecture

```
┌─────────────────────────────────────┐
│      PaywallScreen (UI)             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      VariantDecider                 │
│  - Decides variant for user         │
│  - Supports remote config override  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      VariantFactory                 │
│  - Gets props for variant           │
│  - Uses constants (no magic numbers)│
└─────────────────────────────────────┘
```

## Usage

### Basic Usage

```dart
import 'package:bovie/core/ab_testing/ab_testing.dart';

// In your paywall store or screen
final decider = VariantDecider(userId);
final variant = decider.decide();
final props = VariantFactory.getProps(variant);

// Use props in UI
// Option 1: Use formatted strings (recommended for simple cases)
Text(props.formatWeeklyPrice())   // e.g., "$4.99"
Text(props.formatYearlyPrice())   // e.g., "$29.99"

// Option 2: Use double values for custom formatting
Text('${props.currencySymbol}${props.weeklyPrice.toStringAsFixed(2)}')
Text('${props.currencyCode} ${props.yearlyPrice}')

// Option 3: Use double values for calculations
final monthlyEquivalent = props.yearlyPrice / 12;
final savings = (props.weeklyPrice * 52) - props.yearlyPrice;

// Option 4: Use variant type to determine which design/layout to show
switch (props.variantType) {
  case PaywallVariant.control:
    // Show control design
    break;
  case PaywallVariant.testA:
    // Show variant A design
    break;
  case PaywallVariant.testB:
    // Show variant B design
    break;
}

if (props.hasTrial) {
  // Show trial badge
}
```

### With Remote Config (Future)

```dart
// Create custom remote config implementation
class FirebaseRemoteVariantConfig implements RemoteVariantConfig {
  @override
  PaywallVariant? getVariantForUser(String userId) {
    // Fetch from Firebase Remote Config
    final remoteVariant = firebaseRemoteConfig.getString('paywall_variant_$userId');
    return PaywallVariant.values.firstWhere(
      (v) => v.name == remoteVariant,
      orElse: () => null,
    );
  }

  @override
  bool get isRemoteConfigEnabled => true;
}

// Use it
final decider = VariantDecider(
  userId,
  remoteConfig: FirebaseRemoteVariantConfig(),
);
```

## Adding New Variants

To add a new variant (e.g., testC):

1. **Add to enum** (`remote_variant_config.dart`):
```dart
enum PaywallVariant {
  control,
  testA,
  testB,
  testC,  // Add here
}
```

2. **That's it!** No changes needed to constants or factory since all variants use the same pricing.

**That's it!** No changes needed to the paywall screen logic.

## Variant Assignment Strategy

- **Deterministic**: Same user ID always gets the same variant
- **Even Distribution**: Uses hash-based modulo to distribute users evenly
- **Remote Override**: Remote config can override local assignment if enabled

## Variant Types

Based on README requirements, variants represent **different designs/layouts** for the paywall screen:
- **Control**: Baseline design
- **Test A**: Design variant A (from Figma)
- **Test B**: Design variant B (from Figma)

**All variants use the same pricing** ($4.99 weekly / $29.99 yearly). Variants differ only in their visual design and layout.

## Files

- `paywall_variant_constants.dart`: All pricing (double) and configuration constants, including currency/metric
- `remote_variant_config.dart`: PaywallVariant enum and remote config interface
- `user_id_service.dart`: Service for managing user ID for deterministic variant assignment
- `variant_decider.dart`: Logic for deciding which variant to show
- `variant_factory.dart`: Factory for getting variant-specific properties (with double prices and currency info)
- `ab_testing.dart`: Barrel file for easy imports

## Price Formatting

Prices are stored as `double` values for flexibility:
- **Mathematical operations**: Calculate savings, monthly equivalents, etc.
- **Custom formatting**: Format according to locale, currency rules
- **Helper methods**: `formatWeeklyPrice()` and `formatYearlyPrice()` for quick formatting

Currency information is available via:
- `currencyCode`: ISO currency code (e.g., "USD")
- `currencySymbol`: Currency symbol (e.g., "$")

