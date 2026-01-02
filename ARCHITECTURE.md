# Bovie App - Architecture & Project Structure

## Overview

This project follows **Clean Architecture** principles with strict separation of layers: **Data**, **Domain**, and **Presentation**. The architecture ensures maintainability, testability, and scalability.

## Project Structure

```
lib/
├── app/                          # Application-level configuration
│   ├── config/                   # App configuration (environment, API keys)
│   ├── di/                       # Dependency Injection setup (get_it)
│   ├── router/                   # Navigation routing (go_router)
│   └── theme/                    # App-wide theming (colors, typography)
│
├── core/                         # Shared core functionality
│   ├── ab_testing/               # A/B testing infrastructure
│   │   ├── ab_testing.dart      # A/B testing enums and types
│   │   ├── variant_decider.dart # Variant selection logic
│   │   ├── variant_factory.dart # Variant property factory
│   │   └── paywall_variant_constants.dart # Pricing and plan constants
│   ├── data/                     # Core data transfer objects
│   │   └── dto/                  # DTOs for API responses
│   │       ├── movie_dto.dart
│   │       └── genre_dto.dart
│   ├── domain/                   # Core business entities and interfaces
│   │   ├── movie.dart            # Movie entity
│   │   ├── genre.dart            # Genre entity
│   │   ├── movies_repository.dart # Repository interface
│   │   ├── genres_repository.dart # Repository interface
│   │   ├── get_popular_movies_usecase.dart
│   │   └── get_genres_usecase.dart
│   ├── network/                  # API client (TMDB)
│   │   └── tmdb_api.dart
│   ├── repository/               # Core repository implementations
│   │   ├── movies_repository_impl.dart
│   │   └── genres_repository_impl.dart
│   ├── result/                   # Result type for error handling
│   │   └── result.dart
│   ├── utils/                    # Utility functions
│   │   ├── figma_constants.dart  # Design system constants
│   │   ├── globals.dart          # Global accessors (DI, theme, l10n)
│   │   └── tmdb_image_url_builder.dart
│   └── widgets/                  # Reusable UI widgets
│       ├── basic/                 # Basic widgets (buttons, chips, etc.)
│       └── complex/               # Complex widgets (rows, tables, etc.)
│
└── ui/                           # Feature-based UI modules
    ├── home/                     # Home screen feature
    │   └── home_screen.dart
    │
    ├── onboarding/               # Onboarding feature
    │   ├── domain/               # Domain layer (repository interface)
    │   │   └── onboarding_repository.dart
    │   ├── data/                 # Data layer (repository implementation)
    │   │   └── onboarding_repository_impl.dart
    │   └── presentation/         # Presentation layer (UI + Stores)
    │       ├── onboarding_movies_screen.dart
    │       ├── onboarding_movies_store.dart
    │       ├── onboarding_genres_screen.dart
    │       └── onboarding_genres_store.dart
    │
    ├── paywall/                  # Paywall feature
    │   └── presentation/         # Presentation layer (UI + Stores + Widgets)
    │       ├── paywall_screen_a.dart
    │       ├── paywall_screen_b.dart
    │       ├── paywall_store.dart
    │       └── widgets/           # Feature-specific widgets
    │           ├── feature_comparison_table.dart
    │           ├── paywall_auto_renewable_text.dart
    │           ├── paywall_common_content.dart
    │           ├── paywall_screen_base.dart
    │           └── subscription_plan_row.dart
    │
    ├── splash/                   # Splash screen feature
    │   └── presentation/         # Presentation layer (UI + Store)
    │       ├── splash_screen.dart
    │       └── splash_store.dart
    │
    └── user/                      # User feature
        ├── domain/               # Domain layer (repository interface)
        │   └── user_id_repository.dart
        └── data/                 # Data layer (repository implementation)
            └── user_id_repository_impl.dart
```

## Layer Responsibilities

### 1. **Domain Layer** (`core/domain/`, `ui/*/domain/`)
- **Purpose**: Business logic and entities, framework-agnostic
- **Contains**:
  - Entities (Movie, Genre)
  - Repository interfaces
  - Use cases
- **Rules**:
  - ❌ NO Flutter imports
  - ❌ NO Dio, SharedPreferences, or framework-specific code
  - ✅ Pure Dart classes

### 2. **Data Layer** (`core/data/`, `core/repository/`, `ui/*/data/`)
- **Purpose**: Data sources, API clients, persistence
- **Contains**:
  - DTOs (Data Transfer Objects)
  - Repository implementations
  - API clients
  - Local storage (SharedPreferences)
- **Rules**:
  - ✅ Implements Domain interfaces
  - ✅ Maps DTOs to Domain entities
  - ✅ Handles network errors and parsing

### 3. **Presentation Layer** (`ui/*/presentation/`)
- **Purpose**: UI and state management
- **Contains**:
  - Screens (StatelessWidget/StatefulWidget)
  - Stores (MobX ViewModels)
  - Feature-specific widgets
- **Rules**:
  - ✅ Depends ONLY on Domain layer
  - ❌ NEVER imports DTOs or Data layer directly
  - ✅ All business logic in Stores (MobX)
  - ❌ NO setState for business logic

## Feature Structure Pattern

Each feature in `ui/` follows this structure:

```
ui/feature_name/
├── domain/              # Repository interface (if needed)
│   └── feature_repository.dart
├── data/                # Repository implementation (if needed)
│   └── feature_repository_impl.dart
└── presentation/        # UI + Stores
    ├── feature_screen.dart
    ├── feature_store.dart
    └── widgets/         # Feature-specific widgets (optional)
```

**Examples:**
- **Onboarding**: Has domain/data (persists onboarding state)
- **Paywall**: Only presentation (no persistence, uses UserIdRepository)
- **Splash**: Only presentation (orchestrates initialization)
- **User**: Only domain/data (provides UserIdRepository for A/B testing)

## Dependency Flow

```
Presentation → Domain ← Data
     ↓
   MobX Stores
     ↓
  Use Cases
     ↓
 Repositories (interface)
     ↓
Repositories (implementation)
     ↓
   API/Storage
```

## Key Principles

1. **Dependency Rule**: Dependencies point inward (Presentation → Domain ← Data)
2. **Interface Segregation**: Domain defines interfaces, Data implements them
3. **Single Responsibility**: Each layer has one clear purpose
4. **Dependency Injection**: All dependencies resolved via `get_it` in `app/di/`
5. **State Management**: MobX stores manage all business state (no setState)

## Global Accessors

Global accessors are defined in `core/utils/globals.dart`:
- Repositories: `moviesRepo`, `genresRepo`, `onboardingRepository`
- Use Cases: `getPopularMovies`, `getGenres`
- Stores: `splashStore`, `paywallStore`
- Theme: `theme`, `colorScheme`, `textTheme`
- Localizations: `localizations`

These provide convenient access while maintaining DI through `get_it`.

## State Management (MobX)

- **Stores**: Located in `ui/*/presentation/*_store.dart`
- **Pattern**: ViewModel pattern - stores contain business logic
- **Constraint**: NO `setState` for business logic
- **Observables**: UI state (loading, errors, selections, lists)
- **Actions**: Business operations (fetch, select, toggle)
- **Computed**: Derived state (canContinue, isSelected)

## A/B Testing Architecture

A/B testing is implemented for paywall variants:
- **Variant Determination**: In `SplashStore.init()` via `PaywallStore.determineVariant()`
- **Variant Decider**: Uses `UserIdRepository` for deterministic assignment
- **Variant Factory**: Provides variant-specific properties (pricing, plans)
- **Variant Constants**: Centralized pricing and plan configuration

## File Naming Conventions

- **Screens**: `*_screen.dart` (e.g., `paywall_screen_a.dart`)
- **Stores**: `*_store.dart` (e.g., `paywall_store.dart`)
- **Repositories (interface)**: `*_repository.dart` (e.g., `onboarding_repository.dart`)
- **Repositories (implementation)**: `*_repository_impl.dart` (e.g., `onboarding_repository_impl.dart`)
- **DTOs**: `*_dto.dart` (e.g., `movie_dto.dart`)
- **Use Cases**: `get_*.dart` or `*_usecase.dart` (e.g., `get_popular_movies_usecase.dart`)

