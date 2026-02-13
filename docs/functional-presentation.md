# Functional Presentation

## Application Purpose

INCAP is a collaborative blogging platform that allows a community to share knowledge and ideas through articles and discussions. It's designed to be a multidisciplinary knowledge-sharing platform where users can contribute content across various topics.

## Core Features

### 1. Article Management

**Capabilities:**
- **Create Articles**: Authenticated users can create new articles with title and content
- **Read Articles**: All visitors can browse and read published articles
- **Update Articles**: Authors can modify their articles
- **Delete Articles**: Authors can remove their articles
- **Filter by Category**: Articles can be filtered by their assigned category

**Key Attributes:**
- Title
- Content
- Category assignment
- Author identification
- Timestamps (implicit)

### 2. Category Management

**Capabilities:**
- **Create Categories**: Organize topics into logical categories
- **List Categories**: Display all available categories
- **Update Categories**: Modify category information
- **Delete Categories**: Remove categories (with cascade rules)

**Purpose:** 
Categories serve as a taxonomy system to organize articles thematically, making content discovery intuitive.

### 3. User Management

**Capabilities:**
- **User Registration**: New users can create accounts
- **User Profiles**: Store user information and preferences
- **User Authentication**: Framework for securing endpoints
- **User Listing**: Administrative view of registered users

**User Attributes:**
- Username/Email
- User profile information
- Role/permission framework

### 4. Frontend Interface

**Main Pages:**
- **Home Page**: Landing page with featured content
- **Articles Section**: Browse, search, and view articles
- **Admin Panel**: Management interface for content and users
- **Navigation**: Responsive navigation across all sections

**User Experience:**
- Responsive Bootstrap 5 design
- Mobile-friendly interface
- Intuitive navigation
- Font Awesome icons for visual clarity

## User Workflows

### Content Creator Workflow
```
1. User logs in/registers
2. Navigates to Admin panel → Create Article
3. Selects category and writes content
4. Publishes article (becomes visible to all)
5. Can later edit or delete the article
```

### Content Consumer Workflow
```
1. User visits the site
2. Browses articles on the home page
3. Filters articles by category
4. Reads individual articles
5. No credentials required for viewing
```

### Administrator Workflow
```
1. Admin logs in with elevated privileges
2. Accesses the Admin panel
3. Manages articles, categories, and users
4. Monitors and moderates content
5. Generates reports and exports
```

## Content Organization

### Articles
- Associated with a single category
- Have an author
- Contain title and content
- Are timestamped

### Categories
- Have a unique name
- Can contain multiple articles
- Are editable and deletable
- Drive the site's taxonomy

### Users
- Can be authors
- Have profiles
- May have different roles/permissions
- Track activity and contributions

## API Endpoints

All endpoints are RESTful and follow standard HTTP methods:

### Articles
- `GET /articles` - List articles (filterable by category)
- `GET /articles/:id` - Get specific article
- `POST /articles` - Create new article
- `PUT /articles` - Update article
- `DELETE /articles/:id` - Delete article

### Categories
- `GET /categories` - List all categories
- `GET /categories/:id` - Get specific category
- `POST /categories` - Create new category
- `PUT /categories` - Update category
- `DELETE /categories/:id` - Delete category

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get specific user
- `POST /users` - Create new user
- `PUT /users` - Update user
- `DELETE /users/:id` - Delete user

## Data Model Overview

```
┌─────────────────┐
│    Category     │
├─────────────────┤
│ id              │
│ name            │
│ description     │
└────────┬────────┘
         │
         │ 1:* relationship
         ↓
┌─────────────────┐      ┌──────────────┐
│     Article     │◄─────┤    Author    │
├─────────────────┤      │   (User)     │
│ id              │      └──────────────┘
│ title           │
│ content         │
│ category (FK)   │
│ author (FK)     │
└─────────────────┘
```

## Security Considerations

- API endpoints accept JSON payloads
- CORS enabled for cross-origin requests
- Environment-based configuration for sensitive data
- JWT framework ready (in user management)
- Rate limiting considerations for future
- Input validation framework in place

---

For technical implementation details, see [Backend Technical Details](./backend-technical-details.md) and [Frontend Technical Details](./frontend-technical-details.md).
