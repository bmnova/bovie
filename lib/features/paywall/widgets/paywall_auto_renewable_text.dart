import 'package:flutter/material.dart';
import 'package:bovie/core/utils/globals.dart';
import 'package:bovie/app/theme/app_colors.dart';
import 'package:bovie/core/utils/figma_constants.dart';

import '../../../generated/assets.gen.dart';

/// Auto renewable text widget shared between paywall variants
class PaywallAutoRenewableText extends StatelessWidget {
  const PaywallAutoRenewableText({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        BovieAssets.icons.shieldGreen.svg(
          width: FigmaConstants.iconSize16,
          height: FigmaConstants.iconSize16,
        ),
        const SizedBox(width: FigmaConstants.spacing4),
        Text(
          localizations.autoRenewableCancelAnytime,
          style: context.textTheme.bodySmall?.copyWith(
            color: AppColors.white,
            fontSize: FigmaConstants.fontSize10,
            fontWeight: FontWeight.normal,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}

