# Bovie - Movie Discovery App

A Flutter-based movie discovery application built with Clean Architecture, MobX state management, and comprehensive A/B testing infrastructure.

## 📱 Demo Videos

### Demo 1: App Flow & Features

[![Demo 1: App Flow & Features](https://img.youtube.com/vi/rXYybQ9kKuM/0.jpg)](https://www.youtube.com/shorts/rXYybQ9kKuM)

📥 [Download Demo 1 (126MB)](demo1.mov) - Direct download (Git LFS)

### Demo 2: Paywall Animations

[![Demo 2: Paywall Animations](https://img.youtube.com/vi/NOMd3PIkUoI/0.jpg)](https://www.youtube.com/shorts/NOMd3PIkUoI)

📥 [Download Demo 2 (14MB)](demo2.mov) - Direct download (Git LFS)

**Note**: Video files are managed with Git LFS. You can either watch them on YouTube (after setup) or download directly using the links above.

## 🎯 Project Overview

Bovie is a movie discovery app that provides personalized movie recommendations based on user preferences collected during onboarding. The app demonstrates:

- **Clean Architecture** with strict layer separation
- **MobX** for state management (no setState for business logic)
- **A/B Testing** infrastructure for paywall variants
- **Build Flavors** for Dev, Staging, and Production environments
- **Responsive Design** with pixel-perfect Figma implementation
- **High-fidelity Animations** for paywall interactions

## 🏗️ Architecture

This project follows **Clean Architecture** principles with three distinct layers:

### Layer Structure

```
Presentation → Domain ← Data
```

- **Domain Layer**: Business entities, repository interfaces, use cases (framework-agnostic)
- **Data Layer**: DTOs, repository implementations, API clients, local storage
- **Presentation Layer**: UI screens, MobX stores, feature-specific widgets

### Key Principles

1. **Dependency Rule**: Dependencies point inward (Presentation → Domain ← Data)
2. **Interface Segregation**: Domain defines interfaces, Data implements them
3. **Single Responsibility**: Each layer has one clear purpose
4. **Dependency Injection**: All dependencies resolved via `get_it`
5. **State Management**: MobX stores manage all business state (no setState)

For detailed architecture documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).

## 📋 Implementation Status

### ✅ Completed Features

#### 1. Splash Screen
- **Data Prefetching**: All initial data fetching happens during splash
  - Genres are loaded and cached
  - First page of popular movies is prefetched for onboarding
  - Onboarding status is checked
  - Home screen data is preloaded if onboarding is complete
- **Navigation Logic**: 
  - If onboarding incomplete → OnboardingMovies
  - If onboarding complete → Paywall → Home

#### 2. Onboarding Flow

**Screen 1: Movie Selection**
- Infinite scroll implementation for popular movies
- Users can select up to 3 favorite movies
- Pagination with scroll detection
- First page cached from splash for instant display
- Selected movies saved to local storage

**Screen 2: Genre Selection**
- Genre list displayed as circular chips
- Users can select up to 2 favorite genres
- Genres cached from splash (no API call needed)
- Bottom padding added for better scrollability
- Selected genres saved to local storage

**Data Persistence**
- All selections saved to SharedPreferences
- Onboarding completion status tracked
- Reset functionality available in dev mode

#### 3. Paywall Screen

**A/B Testing Infrastructure**
- Time-based random variant selection (different variant on each app launch)
- Extensible architecture (easy to add Variant C, D, etc.)
- Remote configuration interface ready for future integration
- Variant-specific configurations (default plans, feature availability)

**Variant A (PaywallScreenA)**
- Default plan: Weekly
- Feature comparison table with all features visible
- Dynamic feature activation based on selected plan and free trial status

**Variant B (PaywallScreenB)**
- Default plan: Yearly
- Simplified feature list (only active features shown)
- Full-screen background image with gradient overlay
- No padding on background image (full screen fit)

**Animations**
- High-fidelity animations for feature changes
- Elastic animation effects for weekly → monthly transitions
- 3rd and 4th features swap with cross-overlay animation
- Smooth transitions between plan selections

**Feature Configuration**
- Weekly plan: Features 1,2 active; Features 3,4 inactive
- Monthly plan: Features 1,2,3 active; Feature 4 inactive
- Yearly plan: All features active
- Free mode: All features always active

#### 4. Home Screen

**"For You" Section**
- Personalized movie recommendations based on:
  - Selected genres from onboarding
  - Selected movies' genres
  - Similar movies to selected favorites
- Maximum 5 movies displayed
- Shuffled for variety

**Category Feed**
- Vertically stacked category rows
- Each category shows 9 movies horizontally
- Dynamic scroll synchronization:
  - Active category chip updates as user scrolls vertically
  - Tapping a category scrolls to that section
- Pagination support for loading more movies per category

**Data Loading**
- Homepage movies loaded after onboarding completion
- Categories loaded with initial 9 movies per category
- Cache mechanism for genres (loaded once during splash)

#### 5. Build Environments (Challenge 1)

**Android Flavors**
- **Dev**: `com.busramercan.bovie.bovie.dev` - Green icon with "DEV" tag
- **Staging**: `com.busramercan.bovie.bovie.staging` - Orange icon with "STG" tag
- **Prod**: `com.busramercan.bovie.bovie` - Original app icon

**iOS Flavors**
- **Dev**: Bundle ID `com.busramercan.bovie.bovie.dev` - Scheme: `dev`
- **Staging**: Bundle ID `com.busramercan.bovie.bovie.staging` - Scheme: `staging`
- **Prod**: Bundle ID `com.busramercan.bovie.bovie` - Scheme: `prod`
- Xcode schemes and xcconfig files configured
- See [ios_setup_flavors.md](ios_setup_flavors.md) for manual setup steps

**Configuration**
- Environment-specific API endpoints (configurable via AppConfig)
- Distinct app icons for each flavor
- Environment-specific app names
- See [BUILD_ENVIRONMENTS.md](BUILD_ENVIRONMENTS.md) for details

#### 6. Responsive Layout System

**Figma-Based Scaling**
- Reference design: 375 × 812 (iPhone X/11/12/13/14)
- Responsive extensions for all dimensions:
  - `.w(context)` - Width scaling (based on screen width / 375)
  - `.h(context)` - Height scaling (based on screen height / 812)
  - `.f(context)` - Font size scaling (based on screen height / 812)
  - `.sw(context)` - Horizontal spacing/padding (based on screen width)
  - `.sh(context)` - Vertical spacing/padding (based on screen height)

**Implementation**
- All FigmaConstants values use responsive extensions
- Widget-specific constants also scaled appropriately
- Consistent scaling across all screen sizes

#### 7. Asset Optimization

**Image Assets**
- Raster images (PNG/JPG) provided in multiple resolutions:
  - 1x (base)
  - 2x (for @2x displays)
  - 3x (for @3x displays)
- Vector images (SVG) scale automatically

**Icon Assets**
- SVG icons for crisp rendering at any size
- Generated asset classes for type-safe access

#### 8. Cache Mechanisms

**Genres Cache**
- Genres loaded once during splash
- Cached in `GenresRepositoryImpl`
- Subsequent calls return cached data instantly
- No API calls needed in onboarding genres screen

**Movies Cache**
- First page of popular movies cached during splash
- Onboarding movies screen uses cached first page
- Subsequent pages loaded via pagination

**Benefits**
- Instant display of genres in onboarding
- Faster initial movie loading
- Reduced API calls
- Better user experience

#### 9. Challenge 2: API v2 Breaking Change (Architecture Test) ✅

**Objective**: Demonstrate Clean Architecture resilience by adapting to API structure changes without breaking existing functionality.

**Implementation**:
- **API v2 Simulation**: Created transformation layer in `TmdbApi` that converts v1 responses to v2 format
  - `id` → `film_id`
  - `title` → `film_title`
  - `poster_path` → `poster_image`
  - `release_date` → `release`
- **DTO Updates**: Updated `MovieDto` with new `@JsonKey` annotations for v2 field names
  - **Key Point**: Property names remained unchanged (`id`, `title`, `posterPath`, `releaseDate`)
  - This ensures mapper code doesn't need changes
- **Repository Layer**: `MoviesRepositoryImpl` mapper code **remained completely unchanged**
  - Still uses `e.id`, `e.title`, `e.posterPath`, `e.releaseDate`
  - Works because DTO property names stayed the same
- **Domain Layer**: No changes required ✅
- **Presentation Layer**: No changes required ✅

**Result**: 
- Only Data layer (DTO + API transformation) changed
- Domain and Presentation layers untouched
- Zero breaking changes to business logic or UI
- Demonstrates true Clean Architecture isolation

**Git Commit**: `refactor: adapt to api v2 structure`

## 🚀 Getting Started

### Prerequisites

- Flutter SDK (latest stable version)
- Dart SDK
- Android Studio / Xcode (for platform-specific builds)
- TMDB API Bearer Token (provided in assessment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bovie
```

2. Install dependencies:
```bash
flutter pub get
```

3. Generate code (MobX, Freezed, etc.):
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### Running the App

#### Android

```bash
# Dev environment
flutter run --flavor dev -t lib/main_dev.dart

# Staging environment
flutter run --flavor staging -t lib/main_staging.dart

# Production environment
flutter run --flavor prod -t lib/main_prod.dart --release
```

#### iOS

**Important**: iOS requires manual Xcode setup for flavors. See [ios_setup_flavors.md](ios_setup_flavors.md) for detailed instructions.

After Xcode setup:
```bash
# Dev environment
flutter run --flavor dev -t lib/main_dev.dart

# Staging environment
flutter run --flavor staging -t lib/main_staging.dart

# Production environment
flutter run --flavor prod -t lib/main_prod.dart --release
```

### Development Mode Features

- **Reset Button**: In dev mode, a reset button appears on the home screen (top-right)
  - Resets all onboarding selections
  - Clears local storage
  - Navigates back to splash to restart flow

## 📁 Project Structure

```
lib/
├── app/                    # Application-level configuration
│   ├── config/            # AppConfig with environment settings
│   ├── di/                # Dependency Injection (get_it)
│   ├── router/            # Navigation (go_router)
│   └── theme/             # App-wide theming
│
├── core/                  # Shared core functionality
│   ├── ab_testing/        # A/B testing infrastructure
│   ├── data/             # DTOs
│   ├── domain/           # Business entities & interfaces
│   ├── network/          # API client (TMDB)
│   ├── repository/       # Repository implementations
│   ├── result/           # Result type for error handling
│   ├── utils/            # Utilities (Figma constants, globals)
│   └── widgets/          # Reusable UI widgets
│
└── ui/                    # Feature-based UI modules
    ├── home/             # Home screen feature
    ├── onboarding/       # Onboarding feature (domain/data/presentation)
    ├── paywall/          # Paywall feature (presentation)
    ├── splash/           # Splash screen feature
    └── user/             # User feature (domain/data)
```

For detailed structure, see [ARCHITECTURE.md](ARCHITECTURE.md).

## 🧪 A/B Testing

The paywall screen supports A/B testing with time-based random variant selection:

- **Variant Selection**: Time-based random (different variant on each app launch)
- **Extensibility**: Easy to add new variants without code changes
- **Remote Config Ready**: Interface prepared for remote configuration services
- **Variant-Specific Configs**: Default plans, feature availability per variant

See `lib/core/ab_testing/` for implementation details.

## 🔧 Technical Stack

- **Framework**: Flutter
- **State Management**: MobX
- **Dependency Injection**: GetIt
- **Navigation**: GoRouter
- **Network**: Dio
- **Local Storage**: SharedPreferences
- **Code Generation**: Freezed, MobX Codegen
- **API**: TMDB (The Movie Database)

## 📝 TODO / Roadmap

### Pending Tasks

Based on the original roadmap, the following items are planned for future implementation:

#### Phase 1: Core Foundation ✅
- [x] Project setup and architecture
- [x] Dependencies configuration
- [x] Core infrastructure (Result, AppError)
- [x] Network layer (TMDB API)
- [x] Dependency Injection
- [x] AppConfig with Flavors

#### Phase 2: Navigation & Onboarding ✅
- [x] Router setup
- [x] Splash screen with prefetch
- [x] Onboarding movies (infinite scroll)
- [x] Onboarding genres
- [x] Local persistence

#### Phase 3: Paywall & A/B Testing ✅
- [x] A/B testing infrastructure
- [x] Paywall UI with animations
- [x] PaywallStore implementation

#### Phase 4: Home & Scroll Sync ✅
- [x] "For You" personalized section
- [x] Category feed with horizontal rows
- [x] Dynamic scroll synchronization
- [x] Category chip tap interaction

#### Phase 5: Polishing & Bonus
- [x] Flavor-specific app icons
- [x] **Challenge 2: API v2 Breaking Change Simulation** ✅
  - ✅ Created mock scenario with changed JSON structure (film_id, film_title, poster_image, release)
  - ✅ Refactored Data layer only (DTO @JsonKey annotations and API transformation)
  - ✅ Proved architecture isolation (Domain and Presentation layers unchanged)
  - ✅ Mapper code remained unchanged (property names stayed the same)
  - ✅ Git commit: `refactor: adapt to api v2 structure`
- [x] Documentation
- [x] Final verification

### Future Enhancements

- [x] Implement Challenge 2 (API v2 breaking change scenario) ✅
- [ ] Add unit tests for stores and use cases
- [ ] Add widget tests for critical UI components
- [ ] Implement remote configuration for A/B testing
- [ ] Add analytics integration
- [ ] Performance optimization for large movie lists
- [ ] Add pull-to-refresh functionality
- [ ] Implement search functionality
- [ ] Add movie detail screen
- [ ] Implement favorites/watchlist feature

## 🎨 Design System

### Figma Reference
- Design size: 375 × 812 (iPhone X/11/12/13/14)
- All spacing, sizes, and typography based on Figma specs
- Responsive scaling for different screen sizes

### Colors
- Primary: Red Light (`AppColors.redLight`)
- Background: Black (`AppColors.black`)
- Text: White (`AppColors.white`)
- Surface: Gray Dark (`AppColors.grayDark`)

### Typography
- Font Family: Inter (Regular, Medium, SemiBold, Bold)
- Font sizes scale with screen height for readability

## 🔐 API Configuration

The app uses TMDB (The Movie Database) API for movie data.

**API Endpoint**: `https://api.themoviedb.org/3`

**Authentication**: Bearer Token (configured in `AppConfig`)

**Endpoints Used**:
- `/genre/movie/list` - Get movie genres
- `/movie/popular` - Get popular movies
- `/discover/movie` - Discover movies by genre
- `/movie/{movie_id}/similar` - Get similar movies

## 📚 Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed architecture documentation
- [BUILD_ENVIRONMENTS.md](BUILD_ENVIRONMENTS.md) - Build flavors and CI/CD setup
- [ASSET_OPTIMIZATION_GUIDE.md](ASSET_OPTIMIZATION_GUIDE.md) - Asset optimization guidelines
- [ios_setup_flavors.md](ios_setup_flavors.md) - iOS flavor setup instructions
- [ASSESMENT.md](ASSESMENT.md) - Original assessment requirements


## 📄 License

This project is part of a mobile developer assessment.

---

**Built with ❤️ using Flutter and Clean Architecture**

