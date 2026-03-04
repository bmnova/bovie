# Assessment Project — Mobile Developer Case Study

This project was completed as part of a mobile developer job assessment. The requirements covered Clean Architecture, MobX state management, and architectural resilience under changing requirements.

## App Definition & Flow

1. **Splash Screen**: All initial data fetching happens here for a smooth user experience.
2. **Onboarding Flow**:
   - Screen 1: Users select favorite movies (infinite scroll, max 3 selections).
   - Screen 2: Users select genres of interest (max 2 selections).
3. **Paywall Screen**: Comparative paywall showcasing subscription options with high-fidelity animations.
4. **Home Screen**:
   - "For You" section: Personalized movie list based on onboarding selections.
   - Category Feed: Vertically stacked categories, each showing 9 movies horizontally.
   - Scroll sync: Active category chip updates dynamically as the user scrolls vertically.
   - Tap interaction: Tapping a category scrolls to that section (no filtering).

## Technical Requirements

- **Clean Architecture**: Strict separation of layers (Data, Domain, Presentation).
- **SOLID Principles**: Strong adherence throughout the codebase.
- **State Management**: MobX — no `setState` for business logic.
- **API**: TMDB (The Movie Database) API integration.

## Bonus Challenges

**Challenge 1 — Build Environments**: Set up Flutter Flavors/Schemes (Dev, Staging, Prod) with distinct app icons and environment-specific configuration injection.

**Challenge 2 — Breaking Change Scenario**: Simulate a backend API structure change (field renames, nesting changes) and adapt the app with changes isolated exclusively to the Data/Mapper layers (`refactor: adapt to api v2 structure`).

**Challenge 3 — A/B Testing**: Support multiple paywall variants (A/B) via an extensible `VariantFactory` infrastructure, scalable to future variants without rewriting screen logic.
