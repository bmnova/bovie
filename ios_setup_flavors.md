# iOS Flavor Setup Instructions

Manual configuration in Xcode is required for iOS flavors. Follow the steps below:

## 1. Create Build Configurations

1. Open the `Runner.xcodeproj` file in Xcode
2. Select the `Runner` project in Project Navigator
3. Go to the `Info` tab
4. Click the `+` button in the `Configurations` section
5. Select `Duplicate "Debug" Configuration` and name it `Dev`
6. Select `Duplicate "Release" Configuration` and name it `Staging`
7. Select `Duplicate "Release" Configuration` and name it `Prod`

## 2. Link xcconfig Files

Select the corresponding xcconfig file for each configuration:

- **Dev**: `Flutter/Dev.xcconfig`
- **Staging**: `Flutter/Staging.xcconfig`
- **Prod**: `Flutter/Prod.xcconfig`

## 3. Set Bundle Identifiers

Set the bundle identifier for each configuration:

- **Dev**: `com.busramercan.bovie.bovie.dev`
- **Staging**: `com.busramercan.bovie.bovie.staging`
- **Prod**: `com.busramercan.bovie.bovie`

## 4. Update Schemes

The created schemes (dev.xcscheme, staging.xcscheme, prod.xcscheme) already exist. You can use these schemes in Xcode.

## 5. Configure App Icons

To use different app icons for each flavor:

1. Create a separate asset catalog for each flavor (AppIcon-dev, AppIcon-staging, AppIcon-prod)
2. Set the `ASSETCATALOG_COMPILER_APPICON_NAME` value in Build Settings:
   - Dev: `AppIcon-dev`
   - Staging: `AppIcon-staging`
   - Prod: `AppIcon`

Alternatively, you can generate icons using `flutter_launcher_icons`:

```bash
flutter pub run flutter_launcher_icons:main -f flutter_launcher_icons-dev.yaml
flutter pub run flutter_launcher_icons:main -f flutter_launcher_icons-staging.yaml
flutter pub run flutter_launcher_icons:main -f flutter_launcher_icons-prod.yaml
```

## 6. Flutter Build Commands

```bash
# Dev
flutter build ios --flavor dev -t lib/main_dev.dart

# Staging
flutter build ios --flavor staging -t lib/main_staging.dart

# Prod
flutter build ios --flavor prod -t lib/main_prod.dart --release
```
