import 'dart:math';
import 'package:mobx/mobx.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';
import 'package:bovie/core/ab_testing/ab_testing.dart';
import 'package:bovie/ui/user/domain/user_id_repository.dart';

part 'paywall_store.g.dart';

class PaywallStore = _PaywallStoreBase with _$PaywallStore;

abstract class _PaywallStoreBase with Store {
  final UserIdRepository _userIdRepository;

  _PaywallStoreBase(this._userIdRepository);

  @observable
  bool isFreeTrialEnabled = false;

  @observable
  SubscriptionPlan selectedPlan = SubscriptionPlan.weekly;

  @observable
  PaywallVariant? variant;

  @observable
  bool isVariantLoading = false;

  @action
  void setFreeTrialEnabled(bool value) {
    isFreeTrialEnabled = value;
  }

  @action
  void selectPlan(SubscriptionPlan plan) {
    selectedPlan = plan;
  }

  @action
  Future<void> determineVariant() async {
    if (isVariantLoading || variant != null) {
      return; // Already determining or already determined
    }
    
    isVariantLoading = true;
    try {
      final userId = await _userIdRepository.getUserId();
      final decider = VariantDecider(userId);
      variant = decider.decide();
    } catch (e) {
      // Fallback to testA if error occurs
      variant = PaywallVariant.testA;
    } finally {
      isVariantLoading = false;
    }
  }

  /// Reset variant to test different variants (for testing purposes)
  /// Resets user ID so a new variant can be determined
  @action
  Future<void> resetAndDetermineVariant() async {
    variant = null;
    isVariantLoading = false;
    // Reset user ID to get a new variant
    await _userIdRepository.resetUserId();
    await determineVariant();
  }

  /// Select a random variant (for testing purposes)
  /// Completely independent of user ID
  @action
  void selectRandomVariant() {
    final random = Random();
    final variants = PaywallVariant.values;
    variant = variants[random.nextInt(variants.length)];
  }
}

