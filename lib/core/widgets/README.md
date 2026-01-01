# Common UI Widgets

Reusable UI components based on Figma design system.

## Components

### AppButton
Primary button with enabled/disabled states.

```dart
import 'package:bovie/core/widgets/widgets.dart';

AppButton(
  text: 'Continue',
  onPressed: () => {},
  isEnabled: true,
)
```

### MoviePosterCard
Movie poster card with selection state. Used for displaying movie posters in grids.

```dart
import 'package:bovie/core/widgets/widgets.dart';

MoviePosterCard(
  imageUrl: 'https://...',
  isSelected: false,
  onTap: () => {},
  width: 140,
  height: 196,
)
```

### MovieGenreCard
Circular genre card with selection state. Used for genre selection.

```dart
import 'package:bovie/core/widgets/widgets.dart';

MovieGenreCard(
  imageUrl: 'https://...',
  isSelected: false,
  onTap: () => {},
  size: 140,
)
```

### AppChip
Chip component with selection state. Used for category tags and filters.

```dart
import 'package:bovie/core/widgets/widgets.dart';

AppChip(
  label: 'Action',
  isSelected: false,
  onTap: () => {},
)
```

## Usage

Import the widgets:

```dart
import 'package:bovie/core/widgets/widgets.dart';
```

All widgets use the app's theme (`colorScheme` and `textTheme`) automatically, ensuring consistency across the app.

## Assets

When using local assets (icons, images), use generated assets:

```dart
import 'package:bovie/generated/assets.gen.dart';

// SVG Icons
BovieAssets.icons.checkmark.svg(
  width: 24,
  height: 24,
)

// Images
BovieAssets.images.logo.image(
  width: 100,
  height: 100,
)
```

Never use hardcoded paths like `'assets/images/logo.png'`.
