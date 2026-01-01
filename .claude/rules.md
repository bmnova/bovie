# Claude Rules for Bovie Project

You are an experienced, pragmatic software engineer. You don't over-engineer a solution when a simple one is possible.

**Rule #1**: If you want exception to ANY rule, YOU MUST STOP and get explicit permission from me first. BREAKING THE LETTER OR SPIRIT OF THE RULES IS FAILURE.

## 🏗️ CORE ARCHITECTURE RULES

1. **Clean Architecture**: Strict boundaries: Data / Domain / Presentation.
2. **Presentation Layer**: UI + MobX stores MUST ONLY depend on Domain entities and usecases.
   - 🚫 DTOs / JSON models must NEVER be referenced in Presentation.
3. **Domain Layer**: Framework-agnostic.
   - 🚫 NO Flutter imports, NO Dio, NO JSON annotations, NO SharedPreferences.
4. **Data Layer**: API clients, DTOs, mappers, repository implementations, local data sources.
5. **Dependency Injection**: Resolve all through `get_it`. UI/Store obtain usecases via DI only.

## ⚛️ STATE MANAGEMENT RULES (MobX)

6. **Mandatory MobX**: NO `setState` for business logic.
   - Manage lists, loading, paging, selections, tabs, errors in stores.
7. **Stores as ViewModels**: Views contain no business logic.
8. **Async Safety**: Avoid duplicate concurrent fetches (guard with `isLoading`).

## 🌍 API RULES (TMDB)

9. **Environment Configuration**: Use Bearer token from environment (do not hardcode).
10. **Required Endpoints**:
    - Popular movies (pagination)
    - Genres list
    - Discover movies by genre
11. **Poster URLs**: Dedicated utility in Data/Core (not in UI).

## 🎨 UI/UX RULES

12. **Pixel Perfect**: Reference 375x812, but responsive for other sizes.
13. **Design System**: Use curated color palettes, modern typography, and reusable components.
14. **Route Constants**: NEVER use hardcoded route strings. Always use `AppRoutes` constants from `app/router/router.dart`.

## 🛤️ FLOW RULES

15. **Splash Prefetch**: Fetch genres + onboarding state in Splash.
16. **Onboarding**:
    - Screen 1: Infinite scroll popular movies, max 3 selections.
    - Screen 2: Genre selection, max 2 selections.
17. **Paywall**:
    - Support A/B variants via `VariantFactory`.
    - High-fidelity animations (Video1/Video2 reference).

## 🔄 HOME SCROLL SYNC (CRITICAL)

18. **Home Rows**: "For You" (personalized) + Category feed (9 movies per row).
19. **Scroll Sync**: Vertically scrolling updates active category chip.
20. **Tap Interaction**: Chip tap scrolls to section; NO filtering.

## 🎁 BONUS RULES

21. **Flavors**: Dev, Staging, Prod with distinct icons.
22. **Breaking Change Simulation**:
    - Adapt to API v2 DTO update by changing ONLY Data/Mapper.
    - Git commit: "refactor: adapt to api v2 structure".
    - DTO property names must stay the same, only `@JsonKey` mappings change.

## 🛠️ ENGINEERING PRACTICES

23. **SOLID**: Single responsibility, interfaces in Domain, impl in Data.
24. **Commits**: Small, incremental commits.
25. **Dependency Caution**: Bovie and `flutter_common` are separate. NO cross-project package dependencies. Only copy-paste is allowed from `flutter_common`.

## 📝 CODE WRITING RULES

26. **Clean Code Over Legacy** - Prioritize modern, clean code. DO NOT preserve old code for compatibility. YOU MUST get my explicit approval before implementing ANY backward compatibility.
27. **No Dead Code** - YOU MUST NEVER leave dead code behind. If you remove code, you MUST remove all references to it. If you create a new code block to replace an old one, you MUST remove the old code.
28. **Zero Warnings Policy** - Run `dart analyze --fatal-warnings` on modified files before committing and make sure there are no analysis issues.
29. **Prefer Existing Over New** - NEVER create new files unless absolutely necessary.
30. **Smallest Changes** - YOU MUST make the SMALLEST reasonable changes to achieve the desired outcome.
31. **Simplicity First** - We STRONGLY prefer simple, clean, maintainable solutions over clever or complex ones. Readability and maintainability are PRIMARY CONCERNS, even at the cost of conciseness or performance.
32. **No Unrelated Changes** - YOU MUST NEVER make code changes unrelated to your current task. If you notice something that should be fixed but is unrelated, document it rather than fixing it immediately.
33. **Reduce Duplication** - YOU MUST WORK HARD to reduce code duplication, even if the refactoring takes extra effort.
34. **Match Style** - YOU MUST MATCH the style and formatting of surrounding code, even if it differs from standard style guides. Consistency within a file trumps external standards.
35. **Preserve Comments** - YOU MUST NEVER remove code comments unless you can PROVE they are actively false. Comments are important documentation and must be preserved.
36. **Evergreen Comments** - YOU MUST NEVER refer to temporal context in comments (like "recently refactored" "moved") or code. Comments should be evergreen and describe the code as it is.
37. **No Deprecation Warnings** - Do not put deprecated warnings to the functions. If anything needs to be marked as deprecated, remove it instead.
38. **Clean Removal** - When removing a code block, simply remove it without adding comments explaining the removal.

## 📋 LINTING RULES

39. Use `analysis_options.yaml` for dart linting rules.
40. Do not leave any analysis issues even if they are minor style and linting issues.

## 🎨 UI DEVELOPMENT STANDARDS

### Dimensions
41. **NEVER use magic numbers** - Create constants class for all UI measurements.
42. Use descriptive names: `heightBottomBar`, `radiusCard`, `paddingHorizontal`.
43. Group related constants together.
44. Compose from existing when possible.

### Themes
45. Use `colorScheme` for all colors. DO NOT use constants for colors, you should strictly use `colorScheme` for all colors.
46. Use `textTheme` for all text styles. DO NOT use constants for text styles, you should strictly use `textTheme` for all text styles.

## 🧪 TESTING RULES

47. **Run Tests** - If the package you modified has tests, you MUST run them before ending your work.
48. **All Tests Pass** - Make sure all tests pass before ending your work.
49. **Fix Root Cause** - If any of the tests fail, you MUST investigate and fix the root cause. NEVER implement workarounds in tests to make them pass.
50. **Fix Source, Not Tests** - If the problem causing test failure is in the source code, then the source code MUST be fixed, not the test.
51. **Comprehensive Tests** - Tests MUST comprehensively cover ALL functionality.
52. **Document Tests** - Always document the tests you write. It should be clear what the test is testing and what the expected behavior is.
53. **Never Hack Tests** - **Important**: NEVER EVER EDIT TESTS TO JUST MAKE THEM PASS. In case of failing tests, you should fix the root cause of the problem. NEVER IMPLEMENT A HACK TO MAKE THE TESTS PASS.

