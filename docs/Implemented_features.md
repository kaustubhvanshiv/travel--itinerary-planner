# TripPilot - AI Travel Itinerary Planner 
# Implementation Details

This file documents all the features, technical decisions, and components implemented so far in the `travel-itinerary-planner` project.

## 1. Project Architecture & Setup
- **Technology Stack:** Pure HTML, CSS (Vanilla), and JavaScript.
- **Backend Simulation:** Used browser `localStorage` as a mock database/backend to handle state management, user authentication, and itinerary storage. This fulfills the "optional simulation" requirement perfectly without needing a separate server environment.
- **Styling Method:** Applied a custom design system inside `css/styles.css` using modern aesthetic principles: CSS Variables, Flexbox, CSS Grid, utility classes, and glassmorphism UI touches.

## 2. Shared Components
- **Responsive Navbar:** Displays intelligent links based on authentication state (e.g., hiding "Login"/"Register" when logged in, and displaying user name & avatar). Also includes a mobile hamburger menu. 
- **Footer:** A consistent layout across all core marketing pages.
- **Auth Simulation (`js/auth.js`):** Contains mock functions (`registerUser`, `loginUser`, `logoutUser`, `getCurrentUser`, `requireAuth`) to securely capture user details in localStorage.

## 3. Core Pages Implemented

### A. Marketing & Authentication
1. **Landing Page (`index.html`)**
   - Hero banner with tagline and background imagery.
   - Initial "Where to?" and "Dates" search hook (`id="destination-search"`).
   - "How it works" steps, featured destinations, and user testimonials.
2. **Register Page (`register.html`)**
   - Form for name, email, password, and password confirmation.
   - Real-time password matching validation and interactive "show/hide password" eye icon.
   - Simulated account creation triggering success alerts and redirecting to login.
3. **Login Page (`login.html`)**
   - Clean gradient interface requesting email and password.
   - LocalStorage lookups to verify credentials and set the active session. Redirects to the Dashboard on success.

### B. User Application & Planning
4. **Dashboard (`dashboard.html` & `js/dashboard.js`)**
   - Main control hub populated with personalized dashboard stats based on user data.
   - Dynamic calculations for "Upcoming Trips" and "Past Trips".
   - Sidebar navigation framework used across all internal app pages.
5. **Trip Planner (`create-trip.html` & `js/planner.js`)**
   - Comprehensive form asking for Destination, Dates, Budget, Travelers, and Travel Style.
   - Submit button connected to `generateMockItineraryAndSave()` which simulates AI generation time with a loading overlay.
6. **Generated Itinerary (`itinerary.html` & `js/planner.js`)**
   - Displays the mock structural daily plan generated for the user's specific trip duration.
   - Uses expandable/collapsible accordions for each day showing activities, times, descriptions, and costs.
   - Top-level actions for Mock Share Link and Mock PDF Export.

### C. Discovery & Management
7. **Explore Destinations (`explore.html` & `js/explore.js`)**
   - Grid layout of popular destinations powered by a mock JavaScript object array.
   - Real-time client-side search filtering by text input (`id="destination-search"`) or Continent and Budget dropdowns.
8. **Budget Tracker (`budget.html`)**
   - Visual dashboard illustrating a static mock breakdown of expenses (Flights, Hotels, Food, Activities, Transport).
   - Simulates a list of recent expense line-items to demonstrate UI layout possibilities.
9. **My Trips (`my-trips.html`)**
   - Full list view of all itineraries created by the active user.
   - Sorts chronologically, provides quick action buttons (View, Edit, Copy, Share), and includes a functioning "Delete" method connecting to localStorage.
10. **Profile Settings (`profile.html`)**
    - Account settings page rendering the active user's name and email dynamically.
    - Forms to update personal details and default travel preferences (simulated frontend UI).

## 4. Testing Requirements
Implemented all functional hooks explicitly requested for Selenium testing stability:
- `id="login-button"`
- `id="register-form"`
- `id="create-trip-btn"`
- `id="destination-search"`
- `id="generate-itinerary"`
