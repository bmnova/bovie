# Build Environments & CI/CD (Challenge 1)

This project uses **Flutter Flavors** to manage different environments (Dev, Staging, Prod).

## 1. Flavors Overview

### Android
- **Dev**: 
    - App ID: `com.busramercan.bovie.bovie.dev`
    - App Name: `Bovie Dev`
    - Entry point: `lib/main_dev.dart`
    - Icon: Green clapperboard with "DEV" tag.
- **Staging**: 
    - App ID: `com.busramercan.bovie.bovie.staging`
    - App Name: `Bovie Staging`
    - Entry point: `lib/main_staging.dart`
    - Icon: Orange clapperboard with "STG" tag.
- **Prod**: 
    - App ID: `com.busramercan.bovie.bovie`
    - App Name: `Bovie`
    - Entry point: `lib/main_prod.dart`
    - Icon: Original app icon.

### iOS
- **Dev**: 
    - Bundle ID: `com.busramercan.bovie.bovie.dev`
    - App Name: `Bovie Dev` (via `APP_DISPLAY_NAME` in `Dev.xcconfig`)
    - Entry point: `lib/main_dev.dart`
    - Scheme: `dev`
    - Icon: Green clapperboard with "DEV" tag.
- **Staging**: 
    - Bundle ID: `com.busramercan.bovie.bovie.staging`
    - App Name: `Bovie Staging` (via `APP_DISPLAY_NAME` in `Staging.xcconfig`)
    - Entry point: `lib/main_staging.dart`
    - Scheme: `staging`
    - Icon: Orange clapperboard with "STG" tag.
- **Prod**: 
    - Bundle ID: `com.busramercan.bovie.bovie`
    - App Name: `Bovie` (via `APP_DISPLAY_NAME` in `Prod.xcconfig`)
    - Entry point: `lib/main_prod.dart`
    - Scheme: `prod`
    - Icon: Original app icon.

**Note**: You need to create build configurations in Xcode for iOS flavors. See the `ios_setup_flavors.md` file for detailed instructions.

## 2. How to Run
Use the `--flavor` and `-t` (target) flags:

```bash
# Run Dev flavor
flutter run --flavor dev -t lib/main_dev.dart

# Run Staging flavor
flutter run --flavor staging -t lib/main_staging.dart

# Run Prod flavor (release mode)
flutter run --flavor prod -t lib/main_prod.dart --release
```

## 3. App Icons

### Android
Flavor-based icon switching works automatically on Android. A different icon file is used for each flavor.

### iOS
For scheme-based icon switching on iOS, you need to create a separate asset catalog for each flavor or use `flutter_launcher_icons`.

Each flavor has a distinct app icon configured via `flutter_launcher_icons`. The configuration files are:
- `flutter_launcher_icons-dev.yaml`
- `flutter_launcher_icons-staging.yaml`
- `flutter_launcher_icons-prod.yaml`

To regenerate icons for a specific flavor, run:
```bash
flutter pub run flutter_launcher_icons:main -f flutter_launcher_icons-<flavor>.yaml
```

**iOS Icon Setup**: After generating icons, you may need to configure Xcode build settings to use the correct icon set for each scheme. See `ios_setup_flavors.md` for details.

## 4. iOS Configuration Files

The following xcconfig files have been created for iOS flavors:
- `ios/Flutter/Dev.xcconfig` - Dev environment configuration
- `ios/Flutter/Staging.xcconfig` - Staging environment configuration
- `ios/Flutter/Prod.xcconfig` - Production environment configuration

Each file contains:
- `FLUTTER_TARGET`: Main entry point
- `APP_DISPLAY_NAME`: App name (used in Info.plist)
- `PRODUCT_BUNDLE_IDENTIFIER`: Bundle identifier

**Important**: You need to create build configurations in Xcode and link these xcconfig files. See the `ios_setup_flavors.md` file for detailed instructions.

## 5. CI/CD Considerations
For a professional production environment:
- **Environment Secrets**: Sensitive data like `TMDB_TOKEN` should be stored in CI/CD variables (e.g., GitHub Actions Secrets) and injected during the build process.
- **Automated Workflows**:
    - **Development**: Triggered on push to `dev` branch. Builds the `dev` flavor and deploys to Firebase App Distribution or TestFlight.
    - **Staging**: Triggered on push to `staging` or `main` (pre-release). Builds the `staging` flavor for QA verification.
    - **Production**: Triggered on a version tag (e.g., `v1.0.0`). Builds the `prod` flavor and uploads to the App Store or Google Play Console.
- **Code Isolation**: The `AppConfig` injection pattern ensures that environment-specific settings (API URLs, logging levels) are decoupled from the core application logic. Changing an endpoint only requires updating the entry point or an environment variable, not the UI code.
- **iOS Build**: iOS builds require Xcode build configurations to be set up. The schemes (dev, staging, prod) are already created, but build configurations must be configured in Xcode. See `ios_setup_flavors.md` for setup instructions.
