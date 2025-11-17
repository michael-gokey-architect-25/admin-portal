# AdminPortal v1 - Angular 16 Module-Based Architecture Build Guide



## Project Overview

AdminPortal v1 is an enterprise-grade web application built with **Angular 16** using a **traditional module-based architecture** (not standalone components). The application focuses on authentication, role-based access control (RBAC), and user management, with **NgRx** as the central state management solution.


## Core Architecture Principles

### Technology Stack
- **Angular 16.2.x** - Module-based architecture (no standalone components or signals)
- **NgRx 16.3.x** - Complete state management suite (@ngrx/store, @ngrx/effects, @ngrx/entity, @ngrx/router-store, @ngrx/store-devtools)
- **RxJS 7.8.x** - Reactive programming
- **TypeScript 5.1.x** - Type safety
- **SCSS** - Styling
- **Jest** - Testing framework (no Karma/Jasmine)

### Module Breakdown 

1. **App Module** - Root module with routing configuration
2. **Core Module** - Singleton services (AuthService, HTTP interceptors, guards)
3. **Shared Module** - Reusable components, pipes, directives
4. **Layout Module** - Header, sidebar, footer components
5. **Auth Module** (Feature) - Login, register, password reset
6. **Dashboard Module** (Feature) - Role-based dashboards
7. **Admin Module** (Feature) - User management
8. **NgRx Store Setup** - Actions, reducers, effects, selectors


### Key Angular 16 Characteristics I'm using:
- ✅ **NgModule-based** (no standalone components)
- ✅ **NgRx** for state management (auth, user, roles)
- ✅ **Lazy loading** for feature modules
- ✅ **Route guards** for RBAC
- ✅ **HTTP interceptors** for JWT tokens
- ✅ **Jest** testing mindset (no Karma/Jasmine references)
- ✅ **Traditional module imports** (CommonModule, RouterModule, etc.)


### Build Order Strategy:
1. Start with **NgRx store** (foundation for state)
2. Build **Core Module** (auth service, guards, interceptors)
3. Create **Shared Module** (UI components)
4. Build **Layout Module** (shell structure)
5. Implement **Auth Module** (login flow)
6. Add **Dashboard Module** (role-based views)
7. Complete **Admin Module** (user management)
8. Wire everything together in **App Module**


--------------------------------------


🏗️ AdminPortal v1: Modular Architecture and Structure

The application's core design philosophy is to break the system into smaller, focused, and loosely-coupled Angular Modules (following the v14-v16 style). This structure prevents a single, monolithic codebase and facilitates lazy loading for better initial performance.

Core Module Categories
The architecture is split into five primary types of modules:
| Module Category | Contained Modules | Primary Responsibilities |
|---|---|---|
| Root | App Module | The primary bootstrap module. It brings all other modules together, sets up the application-level routing, and initializes core services. |
| Foundation | Core Module | Contains essential, application-wide singleton services that are loaded once (e.g., Authentication service, HTTP interceptors for auth tokens, Global error handling). |
| UI/Utilities | Shared Module | Holds reusable components (buttons, cards, form controls), common pipes, directives, and shared models/interfaces. It is imported by feature modules. |
| Structure | Layout Module | Manages the overall page structure that wraps the application content (Header with navigation, Sidebar, Footer). |
| Functional | Feature Modules | Lazy-loaded modules that contain specific, encapsulated features. |

Feature Modules (Lazy-Loaded)
Feature modules only load their code when a user navigates to their routes, which is a key performance benefit.
 * Auth Module: Handles all authentication flows (Login, Registration, Password Reset).
 * Dashboard Module: Contains user-specific views and profiles (Admin Dashboard, Manager Dashboard, User Dashboard).
 * Admin Module: Contains tools for User Management (editing users, changing permissions, etc.).

🔒 Key Requirements and Features
The AdminPortal v1 application manages user interaction and access based on two main mechanisms: Authentication and Role-Based Access Control.

1. Authentication System
 * Login/Logout: Standard credential entry.
 * Token Management: Uses JWT tokens that are stored and sent with every API request via the HTTP Interceptors in the Core Module.
 * Session Handling: Manages token expiration and prompts re-login.
 * Shared State: The authentication status and user profile are centrally managed using NgRx so that it can be accessed by any module (e.g., the Layout Module for displaying the username in the header, or Route Guards for route protection).

2. Role-Based Access Control (RBAC)
Access is highly restricted based on a user's role: Administrators, Managers, or Users.
 * Route Guards: These are the primary security gates. They check the user's role/permissions stored in NgRx before allowing access to a page (e.g., preventing a regular user from accessing the /admin/users URL).
 * UI Customization: Roles determine what is shown or hidden in the application (e.g., the "User Management" link only appears in the Layout Module for administrators).
 * Feature Control: Roles enable or disable specific features within a view (e.g., allowing an Admin to edit a user, but only allowing a Manager to view team data).

3. Dynamic Dashboards
The Dashboard Module adapts its content based on the logged-in user's role:
 * Admin Dashboard: System-wide statistics and management links.
 * Manager Dashboard: Team activity and metrics.
 * User Dashboard: Personal profile and basic features.

⚙️ NgRx State Management
NgRx is used as the single source of truth to solve the problem of limited sharing and data consistency between separate modules.
 * Purpose: It provides a central, application-wide repository for data that multiple modules need to know about.
 * Key Shared Data:
   * User Information (Profile details, User ID).
   * Authentication Status (Logged In/Out).
   * User Role/Permissions.

By centralizing the state, the feature modules (Auth, Admin, Dashboard) can operate independently, updating the central state without directly communicating with each other. The Layout Module and Route Guards simply read the data from the shared NgRx state.

✅ Modular Design Principles Applied
The AdminPortal's module-based architecture is successful because it adheres to key principles:
 * Single Responsibility: Each module, component, and service has one clear job (e.g., the Auth Module only handles login/logout).
 * Encapsulation: Modules expose only what is absolutely necessary, hiding their implementation details to prevent changes in one module from accidentally breaking another.
 * Reusability: The Shared Module allows the same UI elements (buttons, forms) to be used consistently across the entire application, saving time and ensuring a consistent user experience.
   
AdminPortal v1. Authentication and Authorized. State management is primary.

*Lets see how well I do, shall we?*

-------------------

## **NgRx Store**

### ✅ **What We've Built**
- ✅ `auth.actions.ts` (models, action creators)
- ✅ `auth.reducer.ts` (state shape, state transitions)
- ✅ `auth.selectors.ts` (memoized state queries)
- ✅ `auth.effects.ts` (side effects, API calls)


-------------------

## **Core Module**

### ✅ **What We Have**

### 1. **AuthService** (`auth.service.ts`)
- ✅ Login/Register/Logout API calls (with mock implementations)
- ✅ Token management (set, get, clear, check expiration)
- ✅ User profile fetching
- ✅ Token refresh logic
- 📝 **Note**: Replace mock methods with real API calls when backend is ready


### 2. **AuthInterceptor** (`auth.interceptor.ts`)
- ✅ Automatically attaches JWT token to HTTP requests
- ✅ Excludes auth endpoints (login, register)
- ✅ Handles 401 errors (expired token → logout)
- ✅ Handles 403 errors (insufficient permissions)


### 3. **AuthGuard** (`auth.guard.ts`)
- ✅ Protects routes requiring authentication
- ✅ Redirects to login if not authenticated
- ✅ Stores return URL for post-login redirect


### 4. **RoleGuard** (`role.guard.ts`)
- ✅ Protects routes based on user role
- ✅ Checks route data for required roles
- ✅ Redirects to appropriate dashboard if unauthorized


### 5. **CoreModule** (`core.module.ts`)
- ✅ Registers all services, guards, and interceptors
- ✅ Prevents re-import (singleton pattern)

