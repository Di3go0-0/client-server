# Chat Hub API

A real-time chat application API built with NestJS, featuring WebSocket support for instant messaging, room management, and user authentication.

## 🚀 Features

- **Real-time Messaging** - Instant message delivery using WebSockets
- **Room Management** - Create, join, and leave chat rooms
- **User Authentication** - JWT-based authentication system
- **Online Status** - Track user online/offline status
- **Message History** - Persistent message storage
- **User Presence** - See who's online in each room
- **RESTful API** - Complete REST endpoints for all operations
- **Database Integration** - MySQL database with Prisma ORM

## 🏗️ Architecture

### Core Architecture

```
├── src/
│   ├── core/                    # Core infrastructure
│   │   ├── database/           # Database connection and services
│   │   ├── jwt/                # JWT token management
│   │   ├── jwt-guard/         # Authentication guards
│   │   └── constants/          # Application constants
│   ├── modules/                # Business logic modules
│   │   ├── auth/               # Authentication module
│   │   ├── messages/           # Message handling
│   │   └── rooms/              # Room management
│   ├── websockets/             # WebSocket implementation
│   │   ├── chat.gateway.ts     # Main WebSocket gateway
│   │   ├── constants/          # WebSocket constants
│   │   ├── gateways/           # Gateway services
│   │   └── types/              # Type definitions
│   └── app.module.ts           # Root application module
```

### WebSocket Architecture

The API uses a single, optimized WebSocket gateway (`ChatGateway`) that handles:

- **Connection Management** - User authentication and session handling
- **Message Broadcasting** - Real-time message delivery to rooms
- **User Presence** - Online/offline status tracking
- **Room Events** - Room creation, updates, and user management

### Database Schema

- **Users** - User accounts and authentication
- **Rooms** - Chat rooms and metadata
- **Messages** - Message history and content
- **User_Rooms** - Many-to-many relationship between users and rooms

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | User login |
| `POST` | `/auth/register` | User registration |
| `GET` | `/auth/profile` | Get user profile |

### Rooms

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/rooms` | Get all rooms |
| `POST` | `/rooms` | Create new room |
| `PUT` | `/rooms/:id` | Update room |
| `DELETE` | `/rooms/:id` | Delete room |
| `POST` | `/rooms/join` | Join a room |
| `POST` | `/rooms/leave` | Leave a room |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/messages/room/:id` | Get messages by room |
| `POST` | `/messages` | Send message |

## 🔌 WebSocket Events

### Connection Events

- **`connect`** - Client connection with JWT authentication
- **`disconnect`** - Client disconnection and cleanup

### Authentication Events

- **`auth.login`** - Login via WebSocket
- **`auth.register`** - Register via WebSocket

### Room Events

- **`get_rooms`** - Get all available rooms
- **`room.join`** - Join a specific room
- **`room.leave`** - Leave a room
- **`room.created`** - Broadcast when room is created
- **`room.updated`** - Broadcast when room is updated

### Message Events

- **`messages.subscribe`** - Subscribe to room messages
- **`message.send`** - Send message to room
- **`messages.subscription`** - Receive messages in room

### User Events

- **`users.global.subscribe`** - Subscribe to global user list
- **`users.room.subscribe`** - Subscribe to room user list
- **`users.updated`** - Broadcast when user list changes

## 🛠️ Technology Stack

- **Backend Framework**: NestJS
- **Language**: TypeScript
- **WebSocket**: Socket.IO
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT
- **API Documentation**: Swagger
- **Validation**: class-validator
- **Password Hashing**: bcrypt-ts

## 📦 Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/Di3go0-0/chat-hub
   cd chat-hub/api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Configure your database and JWT settings
   ```

4. **Database setup**
   ```bash
   # Run the SQL script
   mysql -u username -p database_name < sql/script.sql
   ```

5. **Start application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## 🔧 Configuration

### Environment Variables

```env
API_PORT=3000
SWAGGER_RUTE=/api
SECRET_KEY=your-secret-key
RESEND_API_KEY=your-resend-api-key
DATABASE_URL=mysql://username:password@localhost:3306/database_name
```

### Database Configuration

The API uses MySQL with the following main tables:

- **users** - User authentication and profile data
- **rooms** - Chat room information
- **messages** - Message content and metadata
- **user_rooms** - User-room relationships

## 📚 Usage Examples

### Client Connection

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});

// Listen for connection
socket.on('connect', () => {
  console.log('Connected to chat server');
});
```

### Join a Room

```javascript
// Join room
socket.emit('room.join', roomId);

// Listen for room users
socket.on(`users.room.updated:${roomId}`, (users) => {
  console.log('Users in room:', users);
});
```

### Send Messages

```javascript
// Subscribe to room messages
socket.emit('messages.subscribe', { id: roomId });

// Send message
socket.emit('message.send', {
  roomId: roomId,
  message: 'Hello, world!'
});

// Listen for messages
socket.on('messages.subscription', (message) => {
  console.log('New message:', message);
});
```

## 🔐 Security

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - class-validator for request validation
- **CORS Configuration** - Configurable cross-origin resource sharing
- **SQL Injection Prevention** - Parameterized queries

## 📊 Performance Optimizations

- **Single WebSocket Gateway** - Consolidated connection handling
- **Efficient User Management** - Optimized user-to-client mapping
- **Room-based Broadcasting** - Targeted message delivery
- **Connection Pooling** - Database connection optimization
- **Event-driven Architecture** - Efficient event handling

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:cov
```

## 📖 API Documentation

Once running, access the Swagger documentation at:
```
http://localhost:3000/api
```

## 🚀 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For support and questions:
- Check the API documentation at `/api`
- Review the code comments
- Open an issue in the repository

---

**Built with ❤️ using NestJS and Socket.IO**