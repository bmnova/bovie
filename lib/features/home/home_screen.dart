import 'package:bovie/generated/l10n.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/router/router.dart';
import 'package:bovie/core/widgets/widgets.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(S.of(context).home),
            const SizedBox(height: 24),
            AppButton(
              text: 'Open Paywall',
              onPressed: () {
                context.push(AppRoutes.paywall);
              },
            ),
          ],
        ),
      ),
    );
  }
}
