import 'package:flutter/material.dart';

import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:go_router/go_router.dart';
import 'package:bovie/app/di/di.dart';
import 'package:bovie/features/splash/splash_store.dart';
import 'package:mobx/mobx.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  late final SplashStore _store;
  final _disposers = <ReactionDisposer>[];

  @override
  void initState() {
    super.initState();
    _store = getIt<SplashStore>();
    
    _disposers.add(
      reaction(
        (_) => _store.nextRoute,
        (String? nextRoute) {
          if (nextRoute != null && mounted) {
            context.go(nextRoute);
          }
        },
      ),
    );

    _store.init();
  }

  @override
  void dispose() {
    for (var disposer in _disposers) {
      disposer();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Observer(
        builder: (_) {
          if (_store.error != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(_store.error!, style: const TextStyle(color: Colors.red)),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: _store.init,
                    child: const Text('Retry'),
                  ),
                ],
              ),
            );
          }
          return const Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                FlutterLogo(size: 100),
                SizedBox(height: 24),
                CircularProgressIndicator(),
              ],
            ),
          );
        },
      ),
    );
  }
}
