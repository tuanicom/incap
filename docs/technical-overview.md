# Technical Overview

## Architecture Overview

INCAP follows a modern, cloud-native architecture with clear separation between frontend and backend services.

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                          │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    HTTP/HTTPS │ REST API Calls
                               ↓
     ┌──────────────────────────────────────────────────────────┐
     │              Frontend Service (Port 8080)                 │
     │  ┌────────────────────────────────────────────────────┐  │
     │  │            Angular 21 Application                  │  │
     │  │  - Responsive UI with Bootstrap 5                 │  │
     │  │  - Component-based architecture                   │  │
     │  │  - Lazy-loaded feature modules                    │  │
     │  │  - HttpClient for API communication              │  │
     │  │  - Lazy routing (Admin, Articles)                 │  │
     │  └────────────────────────────────────────────────────┘  │
     └──────────────────────┬────────────────────────────────────┘
                            │
                 HTTP/REST  │  JSON
                            ↓
     ┌──────────────────────────────────────────────────────────┐
     │              Backend Service (Port 4000)                  │
     │  ┌────────────────────────────────────────────────────┐  │
     │  │         Express.js REST API Server                 │  │
     │  │  - Articles Router                                 │  │
     │  │  - Categories Router                               │  │
     │  │  - Users Router                                    │  │
     │  │  - Middleware (CORS, Logging, Async)              │  │
     │  │  - Controllers (Request handling)                  │  │
     │  │  - Process Layer (Business logic)                  │  │
     │  └────────────────────────────────────────────────────┘  │
     │                      │                                     │
     │      Mongoose ODM    ↓                                     │
     │  ┌────────────────────────────────────────────────────┐  │
     │  │          Models (Data Schemas)                     │  │
     │  │  - Article Model                                   │  │
     │  │  - Category Model                                  │  │
     │  │  - User Model                                      │  │
     │  │  - Input validation & transformations              │  │
     │  └────────────────────────────────────────────────────┘  │
     └──────────────────────┬────────────────────────────────────┘
                            │
                      MongoDB Wire
                      Protocol
                            ↓
     ┌──────────────────────────────────────────────────────────┐
     │              Database Service                             │
     │  ┌────────────────────────────────────────────────────┐  │
     │  │         MongoDB (Port 27017)                       │  │
     │  │  - Articles Collection                             │  │
     │  │  - Categories Collection                           │  │
     │  │  - Users Collection                                │  │
     │  │  - Persistence Layer                               │  │
     │  └────────────────────────────────────────────────────┘  │
     └──────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Stack
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Angular | 21.1 | Component-based SPA framework |
| **Language** | TypeScript | 5.9 | Type-safe JavaScript |
| **UI Components** | ng-bootstrap | 20.0 | Angular Bootstrap components |
| **Styling** | Bootstrap | 5.3 | Responsive CSS framework |
| **Icons** | Font Awesome | 7.1 | Icon library |
| **HTTP** | HttpClient | Built-in | REST API communication |
| **Routing** | @angular/router | 21.1 | Client-side routing |
| **Reactive** | RxJS | 7.8 | Reactive programming |
| **Build Tool** | Angular CLI | 21.1 | Development & production builds |

### Backend Stack
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 24.x | JavaScript runtime |
| **Framework** | Express.js | 5.2 | Web server framework |
| **Language** | TypeScript | 5.9 | Type-safe JavaScript |
| **Database** | MongoDB | Latest | NoSQL document database |
| **ODM** | Mongoose | 9.1 | MongoDB object modeling |
| **Logging** | Morgan | 1.10 | HTTP request logging |
| **CORS** | cors | 2.8 | Cross-Origin Resource Sharing |
| **Bundler** | esbuild | 0.27 | Fast JavaScript bundler |
| **Body Parser** | body-parser | 2.2 | Request body parsing |

### Development & Testing Stack
| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Testing Framework** | Vitest | 4.0 | Fast unit test runner |
| **Assertion** | Chai | 4.5 | BDD assertion library |
| **Mocking** | Sinon | 21.0 | Spies, stubs, mocks |
| **API Testing** | Supertest | 7.2 | HTTP assertion library |
| **Code Coverage** | @vitest/coverage-v8 | 4.0 | V8 coverage provider |
| **Linting** | ESLint | 9.39 | Code quality & style |
| **Type Checking** | TypeScript | 5.9 | Static type analysis |

### Infrastructure & DevOps
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Containerization** | Docker | Container images for all services |
| **Orchestration** | Docker Compose | Local development environment |
| **Kubernetes** | K8s YAML manifests | Production orchestration |
| **CI/CD** | AppVeyor | Build and test automation |
| **Code Analysis** | SonarCloud | Code quality analysis |
| **Security Scanning** | Snyk | Vulnerability detection |
| **Coverage Tracking** | Coveralls | Code coverage reporting |
| **Code Review** | Codacy | Automated code review |

## Service Architecture

### Service Decomposition

```
┌─────────────────────────────────────────────────────────┐
│                   Backend (Port 4000)                   │
├─────────────────┬─────────────────┬─────────────────────┤
│   Articles      │   Categories    │      Users          │
│   Service       │   Service       │      Service        │
├─────────────────┼─────────────────┼─────────────────────┤
│ • Controller    │ • Controller    │ • Controller        │
│ • Routes       │ • Routes        │ • Routes            │
│ • Process      │ • Process       │ • Process           │
│ • Model        │ • Model         │ • Model             │
└─────────────────┴─────────────────┴─────────────────────┘
                         │
                MongoDB Database
```

### Three-Layer Backend Architecture

**1. Route Layer**
- Defines HTTP endpoints
- Handles request routing
- Uses `express-async-handler` for async/await support
- Decouples HTTP concerns from business logic

**2. Controller Layer**
- Processes incoming requests
- Orchestrates business logic via Process layer
- Handles parameter extraction
- Returns formatted JSON responses

**3. Service Layers**
- **Process Layer**: Business logic and data manipulation
- **Model Layer**: Data schemas, validation, and persistence
- Mongoose models provide MongoDB integration

### Data Flow

```
HTTP Request
    ↓
Routes (article.routes.ts)
    ↓
Controller (article.controller.ts)
    ↓
Process (article.process.ts)
    ↓
Model (article.model.ts)
    ↓
MongoDB Database
    ↓
Response (JSON)
```

## Frontend Architecture

### Module Structure

```
src/app/
├── app.component        # Root component
├── app.module          # Root module declaration
├── app-routing         # Root routing module
├── admin/              # Admin feature module (lazy-loaded)
│   ├── admin.component
│   └── admin.module
├── articles/           # Articles feature module (lazy-loaded)
│   ├── articles.component
│   └── articles.module
└── asset/              # Static assets
    └── settings.json   # Configuration
```

### Component Hierarchy

```
AppComponent (Root)
├── AppRoutingModule
│   ├── Route: '' → AppComponent
│   ├── Route: 'admin' → AdminModule (lazy)
│   │   └── AdminComponent
│   └── Route: 'articles' → ArticlesModule (lazy)
│       └── ArticlesComponent
└── ng-bootstrap & Font Awesome (Global imports)
```

## Deployment Architecture

### Development Environment
```
Docker Compose:
- Frontend (localhost:8080)
- Backend (localhost:4000)
- MongoDB (localhost:27017)
```

### Production Environment
```
Kubernetes:
- Frontend Deployment + Service
- Backend Deployment + Service
- MongoDB StatefulSet + Service
- Network Policies
- Resource Limits
```

## Communication Patterns

### Frontend-Backend Communication
- **Protocol**: HTTP/REST
- **Data Format**: JSON
- **Configuration**: Dynamic via `settings.json`
- **API URLs**:
  - Categories: `/categories`
  - Users: `/users`
  - Articles: `/articles`

### Backend-Database Communication
- **Protocol**: MongoDB Wire Protocol
- **ODM**: Mongoose for abstraction
- **Connection**: Configurable via `MONGO_DB_URL` environment variable

## Development Workflow

```
                     Feature Development
                            ↓
                    Git Branch (feature/*)
                            ↓
                    Local Development
                     (npm install, npm run test:watch)
                            ↓
                    Commit & Push to GitHub
                            ↓
                    AppVeyor CI Pipeline
                            ↓
            ┌───────────┬──────────────┬──────────────┐
            ↓           ↓              ↓              ↓
         Build       Test        Static Analysis   Security
         (npm run    (vitest)     (ESLint, Sonar)  (Snyk)
          build)
            ↓           ↓              ↓              ↓
            └───────────┴──────────────┴──────────────┘
                            ↓
                    Coverage Report
                    (Coveralls, Codacy)
                            ↓
                    Pull Request Review
                            ↓
                    Merge to Master
                            ↓
                    Deploy to Production
```

## Key Design Patterns

1. **Controller-Service-Repository Pattern**: Clear separation of concerns
2. **Dependency Injection**: Implicit in constructor parameters
3. **Lazy Loading**: Angular feature modules loaded on demand
4. **Reactive Programming**: RxJS observables for async operations
5. **Type Safety**: Full TypeScript implementation
6. **Environment Configuration**: Settings via environment variables

---

For detailed implementation specifics, see:
- [Frontend Technical Details](./frontend-technical-details.md)
- [Backend Technical Details](./backend-technical-details.md)
