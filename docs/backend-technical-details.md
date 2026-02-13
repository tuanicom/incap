# Backend Technical Details

## Overview

The INCAP backend is a RESTful API server built with Express.js and TypeScript, providing complete CRUD operations for articles, categories, and users. It demonstrates a clean three-layer architecture with proper separation of concerns.

## Technology Stack

### Core Technologies
- **Node.js**: 24.x - JavaScript runtime
- **Express.js**: 5.2 - Web application framework
- **TypeScript**: 5.9 - Type-safe language
- **MongoDB**: Latest - NoSQL document database
- **Mongoose**: 9.1 - ODM (Object Document Mapper)

### Middleware & Utilities
| Package | Version | Purpose |
|---------|---------|---------|
| morgan | 1.10 | HTTP request logging |
| cors | 2.8 | Cross-Origin Resource Sharing |
| body-parser | 2.2 | Request body parsing |
| express-async-handler | 1.2 | Async/await error handling |

### Development & Testing
| Package | Version | Purpose |
|---------|---------|---------|
| Vitest | 4.0 | Unit test runner |
| Chai | 4.5 | Assertion library |
| Sinon | 21.0 | Mocking & stubbing |
| Supertest | 7.2 | HTTP assertion testing |
| TypeScript | 5.9 | Type checking |
| esbuild | 0.27 | Fast bundler |
| ESLint | 9.39 | Code quality |

## Project Structure

```
backend/
├── src/
│   ├── server.ts                  # Application bootstrap
│   ├── articles/                  # Articles domain
│   │   ├── article.controller.ts  # Request handling
│   │   ├── article.routes.ts      # Route definitions
│   │   ├── article.process.ts     # Business logic
│   │   ├── article.model.ts       # Data schema & validation
│   │   └── *.spec.ts              # Unit tests
│   │
│   ├── categories/                # Categories domain
│   │   ├── category.controller.ts
│   │   ├── category.routes.ts
│   │   ├── category.process.ts
│   │   ├── category.model.ts
│   │   └── *.spec.ts
│   │
│   ├── users/                     # Users domain
│   │   ├── user.controller.ts
│   │   ├── user.routes.ts
│   │   ├── user.process.ts
│   │   ├── user.model.ts
│   │   └── *.spec.ts
│   │
│   └── server.spec.ts             # Server integration tests
│
├── dist/                          # Compiled JavaScript
├── coverage/                      # Test coverage reports
├── tests-results/                 # JUnit test reports
├── tsconfig.json                  # TypeScript configuration
├── vitest.config.ts               # Vitest configuration
├── vitest.setup.ts                # Test setup
├── eslint.config.mjs              # ESLint configuration
├── Dockerfile                     # Container definition
├── package.json                   # Dependencies
└── README.md
```

## Application Bootstrap

### Server Initialization (server.ts)

```typescript
export class Server {
    public app: express.Application;
    private readonly router: express.Router;

    constructor() {
        this.app = express();
        this.router = express.Router();
        this.dbConnection();
        this.routes();
        this.config();
    }

    public static bootstrap(): Server {
        return new Server();
    }

    private dbConnection() { ... }
    private routes() { ... }
    private config() { ... }
}

// Bootstrap
Server.bootstrap();
```

### Startup Sequence

```
1. Import Express, MongoDB modules
2. Create Server instance
   ├── Initialize Express app
   ├── Connect to MongoDB
   ├── Register routes
   └── Apply middleware
3. Listen on port 4000
4. Server ready for requests
```

### Middleware Stack

```typescript
private config() {
    this.app.disable('x-powered-by');           // Security
    this.app.use(cors());                        // CORS
    this.app.use(express.json());                // JSON parsing
    this.app.use(morgan('combined'));            // Logging
    this.app.use("/", this.router);              // Route mounting
    this.app.listen(4000, () => ...);            // Server startup
}
```

**Middleware Order & Purpose**:
1. **Security**: Disable X-Powered-By header
2. **CORS**: Allow cross-origin requests
3. **Body Parsing**: Parse JSON request bodies
4. **Logging**: Log all HTTP requests
5. **Routing**: Mount route handlers

## Architecture Pattern: Three-Layer Model

Each domain (Articles, Categories, Users) follows this pattern:

```
HTTP Request
    ↓
┌─────────────────────────────────────────┐
│     1. ROUTES Layer                     │
│     (article.routes.ts)                 │
│     - Define HTTP endpoints             │
│     - Map to controllers                │
│     - Handle async/await                │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│     2. CONTROLLER Layer                 │
│     (article.controller.ts)             │
│     - Orchestrate request handling      │
│     - Call process layer                │
│     - Return formatted responses        │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│     3. SERVICE Layer                    │
│                                         │
│  a) PROCESS (article.process.ts)       │
│     - Business logic                    │
│     - Data manipulation                 │
│     - Validation                        │
│                                         │
│  b) MODEL (article.model.ts)           │
│     - MongoDB schema definition         │
│     - Data validation                   │
│     - Database operations               │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│     MongoDB Database                    │
│     - Collection: articles              │
│     - Collection: categories            │
│     - Collection: users                 │
└─────────────────────────────────────────┘
```

## Domain: Articles

### Routes Layer (article.routes.ts)

**Defined Endpoints**:
```typescript
router.get('/')                 // GET /articles?category=...
router.get('/:id')              // GET /articles/:id
router.post('/')                // POST /articles
router.put('/')                 // PUT /articles
router.delete('/:id')           // DELETE /articles/:id
```

**Example Route Handler**:
```typescript
this.router.route('/').get(
    asyncHandler(async (_req, res) => {
        const category = _req.query.category as string;
        const articles = await this.controller.getAll(category);
        res.json(articles);
    })
);
```

### Controller Layer (article.controller.ts)

**Responsibilities**:
- Extract request parameters
- Call service layer
- Handle business logic coordination
- Return data for response

```typescript
export class ArticleController {
    constructor(private process: ArticleProcess) {}

    public async getAll(category?: string): Promise<Article[]> {
        return this.process.getAll(category);
    }

    public async getById(id: string): Promise<Article> {
        return this.process.getById(id);
    }

    public async add(input: any): Promise<Article> {
        const newArticle = new articleModel(input);
        return this.process.save(newArticle);
    }

    public async update(input: any): Promise<Article> {
        const articleToUpdate = await this.process.getById(input._id);
        articleToUpdate.title = input.title;
        articleToUpdate.content = input.content;
        return this.process.save(articleToUpdate);
    }

    public async delete(id: string): Promise<Article> {
        return this.process.delete(id);
    }
}
```

### Service Layer

#### Process Layer (article.process.ts)

**Responsibilities**:
- Implement business rules
- Data validation
- Coordinate with models
- Handle error cases

**Typical Operations**:
- `getAll(category?: string)` - Retrieve articles, optionally filtered
- `getById(id: string)` - Find single article
- `save(article: Article)` - Create or update
- `delete(id: string)` - Remove article

#### Model Layer (article.model.ts)

**MongoDB Schema Definition**:
```typescript
export interface Article extends Document<string> {
    title: string;
    content: string;
    category: string;
    author: string;
}

export const articleSchema = new Schema({
    title: { type: String },
    content: { type: String },
    category: { type: String },
    author: { type: String }
});
```

**Mongoose Model Pattern**:
```typescript
function getArticleModel(): Model<Article> {
    // Check if model exists
    if (mongoose.models.Article) {
        return mongoose.models.Article;
    }
    // Create if doesn't exist
    return model<Article>('Article', articleSchema);
}

// Factory function for instantiation
const articleModelFactory = (...args) => 
    new (getArticleModel())(...args);
```

**Delegated Methods**:
```typescript
const staticMethods = [
    'find', 'findById', 'findOneAndDelete', 
    'findOne', 'create', 'findByIdAndUpdate', 
    'findOneAndUpdate', 'deleteOne'
];
for (const name of staticMethods) {
    articleModelFactory[name] = (...args) => 
        getArticleModel()[name](...args);
}
```

## Data Models

### Article Model

**Schema**:
```typescript
{
    title: String,
    content: String,
    category: String,      // Reference to category
    author: String         // Reference to user
}
```

**Index**: Document ID (auto-generated by MongoDB)

### Category Model

**Schema**:
```typescript
{
    name: String,
    description: String
}
```

**Relationships**: 1:Many with Articles

### User Model

**Schema**:
```typescript
{
    username: String,
    email: String,
    profile: {
        firstName: String,
        lastName: String
    }
}
```

**Relationships**: 1:Many with Articles (author)

## Database Layer

### MongoDB Connection

**Configuration**:
```typescript
private dbConnection() {
    const mongoDbUrl = process.env.MONGO_DB_URL || "localhost:27017";
    mongoose.connect(`mongodb://${mongoDbUrl}/incap`);
    mongoose.set('strictQuery', false);
    
    const connection = mongoose.connection;
    connection.once("open", () => {
        console.log("MongoDB connection established!");
    });
}
```

**Environment Variable**:
- `MONGO_DB_URL`: MongoDB connection string (default: localhost:27017)

### Collections

| Collection | Purpose | Documents |
|-----------|---------|-----------|
| articles | Store article content | Article documents |
| categories | Store category taxonomy | Category documents |
| users | Store user information | User documents |

## API Endpoints

### Articles API

```
GET    /articles
       - Query: ?category=categoryName
       - Returns: Article[]

GET    /articles/:id
       - Returns: Article

POST   /articles
       - Body: { title, content, category, author }
       - Returns: Article

PUT    /articles
       - Body: { _id, title, content, ... }
       - Returns: Article

DELETE /articles/:id
       - Returns: Deleted Article
```

### Categories API

```
GET    /categories
       - Returns: Category[]

GET    /categories/:id
       - Returns: Category

POST   /categories
       - Body: { name, description }
       - Returns: Category

PUT    /categories
       - Body: { _id, name, ... }
       - Returns: Category

DELETE /categories/:id
       - Returns: Deleted Category
```

### Users API

```
GET    /users
       - Returns: User[]

GET    /users/:id
       - Returns: User

POST   /users
       - Body: { username, email, ... }
       - Returns: User

PUT    /users
       - Body: { _id, username, ... }
       - Returns: User

DELETE /users/:id
       - Returns: Deleted User
```

## Error Handling

### Async Handler Middleware

**Purpose**: Catch async/await errors automatically

```typescript
import asyncHandler from 'express-async-handler';

router.route('/').get(asyncHandler(async (req, res) => {
    const articles = await controller.getAll();
    res.json(articles);
    // Errors automatically caught and passed to Express error handler
}));
```

### HTTP Response Pattern

**Success Response**:
```json
{
    "title": "Article Title",
    "content": "Article content",
    "category": "Technology",
    "author": "John Doe",
    "_id": "507f1f77bcf86cd799439011"
}
```

**Error Response** (Express default):
```json
{
    "status": 500,
    "message": "Internal Server Error"
}
```

## Testing Strategy

### Test Framework: Vitest

**Configuration**:
```typescript
export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.spec.ts'],
    globals: true,
    isolate: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      all: true
    },
    reporters: [
      'default',
      ['junit', { outputFile: 'tests-results/tests-results.xml' }]
    ]
  }
});
```

### Test Patterns

**Unit Test Example**:
```typescript
describe('ArticleController', () => {
    let controller: ArticleController;
    let mockProcess: SinonStub;

    beforeEach(() => {
        mockProcess = sinon.stub();
        controller = new ArticleController(mockProcess);
    });

    it('should get all articles', async () => {
        const expected = [{ title: 'Test', ... }];
        mockProcess.getAll.returns(expected);

        const result = await controller.getAll();

        expect(result).to.deep.equal(expected);
    });
});
```

### Running Tests

```bash
# All tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run coverage
```

## Build & Compilation

### TypeScript Compilation

**tsconfig.json**:
```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "sourceMap": true,
        "strict": true,
        "esModuleInterop": true
    }
}
```

### Production Build

**esbuild Configuration**:
```bash
esbuild server.ts --outdir=dist --bundle --platform=node
```

**Results**:
- Single bundled file at `dist/server.js`
- All dependencies included
- Optimized for Node.js environment

### Running the Application

**Development**:
```bash
npm run test:watch
```

**Production**:
```bash
npm run build
npm run start
```

## Logging

### Morgan HTTP Logger

**Configuration**:
```typescript
this.app.use(morgan('combined'));
```

**Logs Format**:
```
127.0.0.1 - - [timestamp] "GET /articles HTTP/1.1" 200 1234
```

**Information Captured**:
- Remote IP address
- Request timestamp
- HTTP method and path
- Status code
- Response size

## Security Considerations

### CORS Configuration
```typescript
this.app.use(cors());
```
- Allows requests from any origin
- Configurable for production (should restrict domains)

### Headers
```typescript
this.app.disable('x-powered-by');
```
- Hides Express version information

### Input Validation
- Express.json() built-in body size limits
- QueryString parsing by Express
- Type-safe through TypeScript

---

For deployment details, see [Deployment Guide](./deployment.md).
