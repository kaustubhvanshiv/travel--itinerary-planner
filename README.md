# TripPilot - Travel Itinerary Planner

TripPilot is a frontend travel planning web app built with HTML, CSS, and JavaScript. It lets users register, log in, create trips, explore destinations, and manage saved itineraries using browser localStorage as a mock backend.

## Features

- User authentication simulation (register, login, logout)
- Personalized dashboard
- Trip creation form with itinerary generation flow
- Explore destinations with search and filters
- My Trips and Saved Destinations pages
- Responsive navigation and multi-page UI

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- localStorage (mock persistence)

## Project Structure

```
travel-itinerary-planner/
	web-app/                # Main frontend app (all HTML/CSS/JS)
	automation-tests/       # Selenium Java test files (.txt containing Java code)
	docs/                   # Implementation notes
	scripts/                # Utility scripts
```

## How To Run The Project

### 1. Go to the project folder

```bash
cd "travel-itinerary-planner"
```

### 2. Start a local server from the web-app directory

The app should be served from `web-app` because routes like `/index.html` and `/login.html` are used throughout the project and tests.

```bash
cd web-app
python3 -m http.server 8000
```

### 3. Open the app in your browser

Visit:

```text
http://localhost:8000/index.html
```

You can also access pages directly, for example:

- `http://localhost:8000/register.html`
- `http://localhost:8000/login.html`
- `http://localhost:8000/dashboard.html`

## Running Automation Tests (Selenium)

The automation tests in `automation-tests/` are Java Selenium scripts saved as `.txt` files.

### Prerequisites

- Java JDK installed
- Google Chrome installed
- ChromeDriver installed at `/usr/bin/chromedriver`
- Selenium Java dependencies configured in your IDE or build setup
- App running at `http://localhost:8000`

### Execute tests

1. Start the app server (see steps above).
2. Open one of the test files in `automation-tests/`.
3. Run the Java `main` method (for example `TripPilotAutomationTest`).

Note: Since files are `.txt`, you may need to copy/rename a test file to `.java` in your Java project before running.

## Documentation

- Feature and implementation details: `docs/Implemented_features.md`

## License

This project is licensed under the terms of the `LICENSE` file in this repository.
