import 'package:mobx/mobx.dart';
import 'package:bovie/core/ab_testing/paywall_variant_constants.dart';

part 'paywall_store.g.dart';

class PaywallStore = _PaywallStoreBase with _$PaywallStore;

abstract class _PaywallStoreBase with Store {
  _PaywallStoreBase();

  @observable
  bool isFreeTrialEnabled = false;

  @observable
  SubscriptionPlan selectedPlan = SubscriptionPlan.weekly;

  @action
  void setFreeTrialEnabled(bool value) {
    isFreeTrialEnabled = value;
  }

  @action
  void selectPlan(SubscriptionPlan plan) {
    selectedPlan = plan;
  }
}

