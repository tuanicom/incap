# Frontend Technical Details

## Overview

The INCAP frontend is an Angular 21 Single Page Application (SPA) built with TypeScript, featuring a responsive Bootstrap 5 UI and modern Component-driven architecture.

## Technology Stack

### Core Technologies
- **Angular**: 21.1 - Modern framework for building SPAs
- **TypeScript**: 5.9 - Type-safe language
- **Bootstrap**: 5.3 - Responsive CSS framework
- **ng-bootstrap**: 20.0 - Native Bootstrap components for Angular
- **Font Awesome**: 7.1 - Comprehensive icon library
- **RxJS**: 7.8 - Reactive programming with Observables
- **SCSS**: Sass for stylesheets

### Build & Development
- **Angular CLI**: 21.1 - Build tooling and development server
- **Vitest**: 4.0 - Fast unit test runner
- **TypeScript Compiler**: 5.9 - Type checking and compilation

## Project Structure

```
frontend/
├── src/
│   ├── index.html                 # Entry HTML file
│   ├── main.ts                    # Bootstrap entry point
│   ├── styles.scss                # Global styles
│   ├── proxy.conf.json            # Dev proxy configuration
│   ├── app/
│   │   ├── app.component.ts       # Root component
│   │   ├── app.component.html     # Root template
│   │   ├── app.component.scss     # Root styles
│   │   ├── app.module.ts          # Root module
│   │   ├── app-routing.module.ts  # Root routing
│   │   ├── app.settings.ts        # Configuration service
│   │   │
│   │   ├── admin/                 # Admin feature module
│   │   │   ├── admin.component.ts
│   │   │   ├── admin.component.html
│   │   │   ├── admin.module.ts
│   │   │   └── ...
│   │   │
│   │   ├── articles/              # Articles feature module
│   │   │   ├── articles.component.ts
│   │   │   ├── articles.component.html
│   │   │   ├── articles.module.ts
│   │   │   └── ...
│   │   │
│   │   └── assets/
│   │       └── settings.json      # Environment configuration
│   │
│   ├── environments/               # Environment files
│   │   ├── environment.ts         # Development config
│   │   └── environment.prod.ts    # Production config
│   │
│   ├── browserslist               # Browser support definition
│   └── proxy.conf.json            # API proxy config
│
├── angular.json                   # Angular CLI config
├── tsconfig.json                  # TypeScript config
├── vitest.config.ts               # Vitest configuration
├── vitest.setup.ts                # Vitest setup file
├── nginx.conf                     # Nginx configuration
├── Dockerfile                     # Container definition
├── package.json                   # Dependencies
└── README.md                      # README
```

## Module Architecture

### Root Module (app.module.ts)

```typescript
AppModule
├── BrowserModule
├── AppRoutingModule
├── NgbModule (ng-bootstrap)
├── FontAwesomeModule
└── AppComponent (Root Component)
```

**Configuration:**
```typescript
@NgModule({
  declarations: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule,
    AppComponent // Standalone component
  ],
  providers: [
    provideAppInitializer(...),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
```

### Routing Structure

```typescript
const routes: Routes = [
  { path: '', component: AppComponent },                    // Home
  { path: 'admin', loadChildren: () => AdminModule },      // Lazy-loaded
  { path: 'articles', loadChildren: () => ArticlesModule } // Lazy-loaded
];
```

**Routing Features:**
- Lazy-loading for feature modules (reduce initial bundle size)
- Component-based routing
- Standalone components support
- Future redirect capability for 404 handling

## Key Components

### App Component
**Purpose**: Root application component

**Responsibilities**:
- Application shell
- Global navigation
- Layout structure
- Component composition

### App Settings Service

**Location**: `app/app.settings.ts`

**Purpose**: Configuration management and initialization

```typescript
// Configuration interface
export class AppSettings {
  categoriesApiUrl: string;
  usersApiUrl: string;
  articlesApiUrl: string;
}

// Service for configuration
@Injectable({ providedIn: 'root' })
export class AppSettingsService {
  public settings: AppSettings;
}

// HTTP-based initialization
@Injectable({ providedIn: 'root' })
export class AppSettingsHttpService {
  public initializeApp(): void {
    this.http.get('assets/settings.json')
      .subscribe((res: AppSettings) => 
        this.appSettingsService.settings = res);
  }
}
```

**Configuration File** (`assets/settings.json`):
```json
{
  "categoriesApiUrl": "http://backend:4000/categories",
  "usersApiUrl": "http://backend:4000/users",
  "articlesApiUrl": "http://backend:4000/articles"
}
```

**Initialization Strategy**:
```typescript
export function app_Init(appSettingsHttpService: AppSettingsHttpService): () => void {
  return () => appSettingsHttpService.initializeApp();
}

// Used in providers
provideAppInitializer(() => {
  const initializerFn = app_Init(inject(AppSettingsHttpService));
  return initializerFn();
})
```

### Admin Module
**Purpose**: Content management interface (lazy-loaded)

**Features**:
- Article management
- Category management
- User management

### Articles Module
**Purpose**: Article browsing and display (lazy-loaded)

**Features**:
- Article list display
- Category filtering
- Article detail view

## Styling Strategy

### Bootstrap 5 Integration
```typescript
// In app.module.ts
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Provides:
// - Modal components
// - Accordion/collapse
// - Pagination
// - Dropdowns
// - Tabs
```

### Global Styles
**File**: `styles.scss`

**Includes**:
- Bootstrap CSS customization
- Global theme variables
- Application-wide styling
- Font definitions

### Component Styles
```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
```

## HTTP Communication

### HttpClient Integration

**Configuration** in app.module.ts:
```typescript
providers: [
  provideHttpClient(withInterceptorsFromDi())
]
```

**Usage Pattern**:
```typescript
constructor(private http: HttpClient) {}

// GET request
this.http.get<Article[]>(this.settings.articlesApiUrl)
  .subscribe((articles) => this.articles = articles);

// POST request
this.http.post<Article>(this.settings.articlesApiUrl, newArticle)
  .subscribe((created) => this.articles.push(created));
```

### API URLs
Dynamically configured from `settings.json`:
- Articles API: `${articlesApiUrl}`
- Categories API: `${categoriesApiUrl}`
- Users API: `${usersApiUrl}`

## Testing Strategy

### Test Framework: Vitest

**Configuration** (vitest.config.ts):
```typescript
{
  environment: 'jsdom',
  include: ['**/*.spec.ts', '**/*.spec.tsx', 'src/**/*.spec.ts'],
  globals: true,
  setupFiles: ['./vitest.setup.ts'],
  coverage: {
    provider: 'v8',
    reporter: ['text', 'lcov'],
    reportsDirectory: 'coverage'
  }
}
```

### Test Patterns

**Component Testing**:
```typescript
describe('ArticlesComponent', () => {
  it('should fetch articles on init', () => {
    // Arrange
    const mockArticles = [...];
    
    // Act
    component.ngOnInit();
    
    // Assert
    expect(component.articles).toEqual(mockArticles);
  });
});
```

### Running Tests
```bash
# Unit tests
npm run test:unit

# Watch mode
npm test

# Coverage report
npm run coverage
```

## Build Process

### Development Build
```bash
npm start
```
- Starts ng serve on port 8080
- Features:
  - Hot module reloading
  - Source maps
  - Full TypeScript compilation
  - Proxy to backend (via `proxy.conf.json`)

### Production Build
```bash
npm run build
```
- Generates optimized bundle in `dist/`
- Features:
  - TreeShaking for dead code elimination
  - Minification and compression
  - AOT compilation
  - Small bundle size

### Proxy Configuration (proxy.conf.json)
```json
{
  "/categories": {
    "target": "http://localhost:4000",
    "secure": false
  },
  "/users": {
    "target": "http://localhost:4000",
    "secure": false
  },
  "/articles": {
    "target": "http://localhost:4000",
    "secure": false
  }
}
```

## Deployment

### Docker Deployment

**Dockerfile**:
- Multi-stage build (angular build → nginx serve)
- Builds production artifacts
- Serves via nginx
- Exposes port 8080

**nginx Configuration** (nginx.conf):
- Serves static files
- Redirects SPA routes to index.html
- Configures caching policies
- Sets security headers

## Code Quality

### ESLint Configuration

**Features**:
- TypeScript-specific rules
- Angular best practices
- Import organization
- JSDoc enforcement

### Coverage Goals
- Aim for high code coverage
- Vitest provides incremental coverage reports
- Integration with CI/CD pipeline

## Development Best Practices

### Standalone Components
```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
```

### Lazy-Loading
```typescript
{ 
  path: 'admin', 
  loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule) 
}
```

### Dependency Injection
```typescript
constructor(private http: HttpClient) {}
```

### Reactive Programming
```typescript
articles$ = this.articles.asObservable();

ngOnInit() {
  this.articles$
    .pipe(
      map(articles => articles.filter(a => a.category === this.selectedCategory)),
      tap(filtered => console.log(filtered))
    )
    .subscribe();
}
```

## Environment Configuration

### Development Environment (`environment.ts`)
- API server: `http://localhost:4000`
- Development mode: True
- Remote service URLs configurable

### Production Environment (`environment.prod.ts`)
- API server: Production URL
- Development mode: False
- Optimizations enabled

## Angular Version Features

### Angular 21 Capabilities Used
- Standalone components
- Standalone API for modules
- Improved change detection
- Enhanced dependency injection
- Typed reactive forms (planned)
- Signal-based reactivity compatibility

---

For API implementation details, see [Backend Technical Details](./backend-technical-details.md).
