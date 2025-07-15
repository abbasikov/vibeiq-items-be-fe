# VibeIQ Items Frontend

## Overview

This is the frontend application for the VibeIQ Items system, built with Angular. It provides a user interface for creating, viewing, and managing items, including image uploads and item details. The frontend communicates with the backend API to perform CRUD operations and display item data.

## Design Decisions

- **Framework**: Chose Angular for its strong typing, modularity, and built-in tooling (CLI, testing, routing).
- **Component Structure**: The UI is organized into reusable components (item list, item detail, item form, create item) to promote maintainability and scalability.
- **Service Layer**: All API interactions are abstracted into Angular services, enabling separation of concerns and easier testing.
- **State Management**: Local component state is used for simplicity, as the app's state requirements are minimal. For larger apps, a state management library (e.g., NgRx) would be considered.
- **Styling**: Utilizes Angular's component-scoped CSS for modular and maintainable styles.
- **Routing**: Angular Router is used to manage navigation between item list, detail, and creation views.

## System Design

- **Component Hierarchy**:
  - `item-list`: Displays a paginated list of items.
  - `item-detail`: Shows details and images for a selected item.
  - `item-form` / `create-item`: Handles item creation and editing.
- **Service Layer**:
  - `item.service.ts`: Handles all HTTP requests to the backend API for item and image operations.
- **API Integration**:
  - Communicates with the backend via RESTful endpoints for item management and image uploads.
- **Environment Configuration**:
  - Uses Angular's environment files for API base URLs and environment-specific settings.
- **Testing**:
  - Includes basic unit tests for components and services using Jasmine and Karma.

## Tradeoffs & Production Considerations

This project was developed as an assignment, so certain tradeoffs were made:

- **Authentication & Authorization**: No user authentication is implemented. A production frontend would require secure login, session management, and role-based access control.
- **Error Handling**: Error messages are basic. Production apps should provide user-friendly error feedback and robust error boundaries.
- **Form Validation**: Basic validation is present. More comprehensive validation and user feedback would be needed for production.
- **Accessibility**: Accessibility (a11y) features are minimal. Production apps should follow WCAG guidelines for inclusive design.
- **Testing**: Only basic unit tests are included. Production systems require comprehensive unit, integration, and end-to-end tests.
- **Performance Optimization**: No advanced optimizations (lazy loading, code splitting, image optimization) are implemented. These would be essential for a production-ready app.
- **UI/UX**: The UI is functional but basic. A production app would require a polished, responsive, and accessible design.
- **Error Logging & Monitoring**: No client-side logging or monitoring is set up. Production apps should integrate tools like Sentry or LogRocket.
- **Internationalization**: The app is single-language. Production systems should support i18n for broader reach.

If this were a fully production-ready frontend, these areas would be addressed to ensure security, scalability, maintainability, and a better user experience.

## Usage

### Development server

To start a local development server, run:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

### Running unit tests

To execute unit tests with Karma, use:

```bash
ng test
```

### Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
