MOBILE DEVELOPER ASSESSMENT

Project: Movie App — Architecture & Resilience Case Study

OVERVIEW

This assessment is designed to evaluate your proficiency in Clean Architecture, State Management (MobX), and your ability to write maintainable code under changing requirements.
Deadline: 7 days from project kickoff
Deliverables:
Public GitHub Repository (Add boby@boby.ai as a collaborator).
Screen-recorded walkthrough of the app.
Git Commit History proving the incremental refactoring (See Bonus Section).

APP DEFINITION & FLOW

All designs are provided on Figma (375 × 812 reference).

1. Splash Screen
All initial data fetching must happen here to ensure a smooth user experience.
2. Onboarding Flow
Screen 1: Users select their favorite movies (Infinity Scroll implementation).
Screen 2: Users select categories/genres of interest.
3. Paywall Screen
A comparative paywall showcasing subscription options.
Crucial: High-fidelity animation implementation (refer to Video1, Video2 references).
4. Main Screen (Home)
"For You" Section: Personalized movie list based on onboarding selections.
Category Feed: Below "For You", display vertically stacked categories.
Each category row showcases 9 movies horizontally.
Scroll Interaction: As the user scrolls vertically, the active category chip/tab at the top must update dynamically (similar to the Getir or Uber Eats menu experience).
Tap Interaction: Tapping a category simply scrolls the view to that section (no filtering).

TECHNICAL REQUIREMENTS

1. Architecture & Principles
Clean Architecture: Strict separation of layers (Data, Domain, Presentation).
SOLID Principles: Code must demonstrate strong adherence to SOLID.
ViewModel Pattern: Logic must be decoupled from the View.
2. State Management
Library: MobX.
Constraint: No setState (or equivalent local ephemeral state) for business logic. All state must be managed through Store structures.
3. API Integration
Provider: TMDB API (https://developer.themoviedb.org/reference/intro/getting-started)
Auth: Use the provided Bearer Token.

UI/UX REQUIREMENTS
Design to Code Accuracy: Ensure a pixel-perfect implementation based on the 375 × 812 design specs, with precise spacing, alignment, and component sizing.
Asset Optimization: Export and implement assets at appropriate resolutions for different device sizes.
Animation Fidelity: Recreate animations exactly as specified in the Figma prototypes, especially for the paywall screen (Video1, Video2)
Responsive Layout: Ensure designs adapt properly to different screen sizes beyond what may be explicitly shown in Figma.
Component Reusability: Identify and implement reusable components from the Figma design system to maintain consistency.
Visual Consistency & Branding: Maintain consistent design language, color schemes, and typography throughout the app.

CHALLENGES (BONUS REQUIREMENTS)
These tasks are designed to test architectural robustness and DevOps awareness.

Challenge 1: Build Environments (DevOps)
Set up proper Build Flavors/Schemes (Dev, Staging, Prod).
Each environment must have a distinct App Icon.
Configure different API endpoints (You may use the same URL for this demo, but the configuration injection must be distinct and easily replaceable).
Documentation: Briefly explain your CI/CD considerations for this setup in the README.

Challenge 2: The "Breaking Change" Scenario (Architecture Test)
This is the critical test of your Clean Architecture implementation.
Scenario: Imagine that after you finish the core implementation, the Backend Team changes the API response structure.
Task: Create a mock scenario where the Movie JSON format changes significantly (e.g., nesting changes, field names change). You can simulate this by creating a local JSON wrapper or mocking the response.
Requirement: Update your application to handle this new format WITHOUT breaking existing functionality and with MINIMAL changes to the UI code.
Proof: This must be clearly visible in your Git History. We want to see a commit named refactor: adapt to api v2 structure showing that changes were isolated to the Data/Mapper layers, leaving the UI/ViewModel untouched.

Challenge 3: A/B Testing Infrastructure
The Paywall screen needs to support remote configuration for A/B testing.
Implement logic to randomly display Variant A or Variant B of the Paywall (designs provided).
This logic should be extensible (scalable to Variant C, D in the future) without rewriting the screen logic.

Api integration:https://developer.themoviedb.org/reference/intro/getting-started
Api key: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzc1ZDI0ZjE4OWUwYjRjNWM1YTRhNDQ1ODRhOWU5ZSIsIm5iZiI6MTc0NTMwMTI4OC41NzEsInN1YiI6IjY4MDcyZjI4YjJiNzIyYWVkZjg5OWU1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q0h_PLOIPKNYi0QcFXmewt1f-jK6hReeyg3nPr4zBqo

UI/UX Design

LOGO



