## 🖥️ Book Finder: Server API

The backend application for Book Finder, built with **Node.js**, **TypeScript**, and **Express.js**. This server currently tracks book visit counts and is being developed to support user ratings and recommendations.

---

## 🏗️ Technical Architecture

### Core Technologies

- **Runtime:** Node.js with ES modules (`"type": "module"`)
- **Framework:** Express.js 5.x
- **Language:** TypeScript 5.9 with strict type checking
- **Execution:** tsx for direct TypeScript execution

### Project Structure

```
src/
├── app.ts                   # Express app configuration & middleware
├── server.ts                # Server entry point
└── visits/                  # Book visits tracking module
    ├── visits-controller.ts # Request handlers
    ├── visits-routes.ts     # Route definitions
    └── visits-service.ts    # Business logic
types.ts                     # Shared TypeScript interfaces
```

### Design Patterns

- **MVC Architecture:** Clear separation between Routes → Controllers → Services
- **Service Layer:** Business logic isolated in service classes for testability
- **Type Safety:** Shared `types.ts` ensures consistent data structures
- **In-Memory Storage:** Currently uses `Map` for temporary data persistence

---

## 📦 Dependencies

### Production

- `express` (5.2.1) - Web application framework
- `cors` (2.8.5) - Cross-origin resource sharing middleware

### Development

- `typescript` (5.9.3) - Type checking and compilation
- `tsx` (4.21.0) - TypeScript execution engine
- `prettier` (3.7.4) - Code formatting
- `jest` (30.2.0) - Testing framework
- `supertest` (7.1.4) - HTTP assertions for API testing
- `@types/*` - TypeScript definitions

---

## 🚀 Current Features

### Book Visits Tracking

The server tracks how many times each book has been visited/viewed:

**Implemented Endpoints:**

```http
POST /api/visits/increment
Content-Type: application/json

{
  "id": "book-id-123"
}

Response: {
  "id": "book-id-123",
  "count": 5
}
```

```http
GET /api/visits/:id

Response: {
  "message": "Ok",
  "ok": true,
  "data": 5
}
```

**Implementation Details:**
- Uses in-memory `Map<string, number>` for storage
- Data persists only during server runtime (resets on restart)
- No database currently - temporary solution for development

### CORS Configuration

- Configured to allow requests from `http://localhost:5173` (client dev server)
- Origin validation middleware in place
- Easy to extend for production domains

---

## 🔮 Upcoming Features

### Book Rating System _(Planned)_

The next phase will add user rating capabilities:

**Goals:**
- Only positive ratings (stars/recommendations)
- One rating per user per book
- Aggregated counts visible to all users
- Persistent storage (database integration required)

### Schema Design

```typescript
// Books Table
interface Book {
    id: string; // Google Books ID
    title: string;
    authors: string[];
    thumbnail?: string;
    ratingCount: number; // Cached aggregation
}

// Ratings Table
interface Rating {
    id: string;
    userId: string;
    bookId: string;
    type: "star" | "recommend";
    createdAt: Date;
}
```

**Database Options Under Consideration:**

- PostgreSQL (with Prisma ORM)
- MongoDB (with Mongoose)
- SQLite (for development/demo)

---

## 🔧 Development Workflow

### Available Scripts

```bash
# Start the server with tsx (auto-reload on file changes)
pnpm start

# Run tests
pnpm test

# Format code with Prettier
pnpm format
```

### Development Setup

1. **Install dependencies**
   ```bash
   cd server
   pnpm install
   ```

2. **Configure environment (optional)**
   
   Create a `.env` file if needed:
   ```ini
   PORT=3000
   ```
   
   By default, the server runs on port 3000.

3. **Start the server**
   ```bash
   pnpm start
   ```

The server will start on `http://localhost:3000`.

### Modifying CORS Origins

Edit [src/app.ts](src/app.ts) to add allowed origins:

```typescript
const allowedOrigins = ["http://localhost:5173", "https://your-domain.com"];
```

---

## 🧪 Testing

### Test Setup

Testing dependencies are already installed:
- `jest` - Testing framework
- `supertest` - HTTP endpoint testing
- `@types/jest` & `@types/supertest` - TypeScript support

### Running Tests

```bash
pnpm test
```

**Note:** _Tests are in development._

---

## 🔮 Next Steps & Roadmap

### Immediate Priorities
- [ ] Add database integration (MongoDB)
- [ ] Implement rating system endpoints
- [ ] Write unit and integration tests
- [ ] Add request validation middleware

### Future Enhancements
- [ ] User authentication (JWT)
- [ ] Rate limiting
- [ ] Structured logging
- [ ] Environment-based configuration
- [ ] Docker containerization
