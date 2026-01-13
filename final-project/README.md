# Chat Hub

A modern, full-stack real-time chat application built with React, TypeScript, and NestJS. This project demonstrates real-time communication through WebSocket connections, user authentication, and room-based messaging with a clean, professional architecture.

## 🚀 Project Overview

This is a complete chat application that allows users to:
- Create and join chat rooms
- Send real-time messages
- See who's online
- Manage their profile
- Experience seamless real-time communication

### Live Demo

Experience the application with both frontend and backend working together to provide instant messaging capabilities.

## 🏗️ Architecture Overview

```
chat-hub/
├── api/                    # Backend API (NestJS)
│   ├── src/
│   │   ├── core/           # Core infrastructure
│   │   ├── modules/        # Business logic modules
│   │   ├── websockets/     # WebSocket implementation
│   │   └── main.ts         # Application entry point
│   ├── sql/                # Database schema
│   ├── package.json         # Backend dependencies
│   └── README.md          # Backend documentation
├── app/                   # Frontend application (React)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── context/        # React Context providers
│   │   ├── services/       # API services
│   │   ├── views/          # Page components
│   │   └── types/         # TypeScript definitions
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── README.md          # Frontend documentation
└── README.md              # Project documentation (this file)
```

## 🛠️ Technology Stack

### Backend (API)
- **Framework**: NestJS with TypeScript
- **WebSocket**: Socket.IO for real-time communication
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **Validation**: class-validator for input validation
- **API Documentation**: Swagger/OpenAPI
- **Password Security**: bcrypt for hashing

### Frontend (App)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development
- **UI Library**: Material-UI (MUI) components
- **State Management**: React Context API
- **Routing**: React Router DOM
- **WebSocket**: Socket.IO client
- **HTTP Client**: Axios with interceptors
- **Styling**: Emotion (CSS-in-JS)

### Infrastructure
- **Development**: Docker Compose for local development
- **Database**: MySQL database
- **Real-time**: WebSocket connections
- **Security**: JWT tokens and input validation

## 🚀 Features

### Core Features
- ✅ **Real-time Messaging** - Instant message delivery
- ✅ **Room Management** - Create, join, and leave rooms
- ✅ **User Authentication** - Secure login and registration
- ✅ **Online Status** - Track who's online
- ✅ **Message History** - Persistent message storage
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark/Light Theme** - Theme customization

### Technical Features
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **API Documentation** - Comprehensive Swagger docs
- ✅ **Error Handling** - Robust error management
- ✅ **Performance Optimized** - Efficient WebSocket management
- ✅ **Security** - Authentication and validation
- ✅ **Scalable Architecture** - Clean separation of concerns

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/Di3go0-0/chat-hub
cd chat-hub
```

### 2. Backend Setup
```bash
cd api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database configuration

# Setup database
mysql -u username -p database_name < sql/script.sql

# Start development server
npm run start:dev
```

### 3. Frontend Setup
```bash
cd ../app

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API endpoints

# Start development server
npm run dev
```

### 4. Docker Setup (Optional)
```bash
# From project root
docker-compose up -d
```

## 🔧 Configuration

### Backend Environment
```env
API_PORT=3000
SWAGGER_RUTE=/api
SECRET_KEY=your-super-secret-jwt-key
RESEND_API_KEY=your-email-service-key
DATABASE_URL=mysql://username:password@localhost:3306/chat_db
```

### Frontend Environment
```env
VITE_API_URI=http://localhost:3000
VITE_WS_URI=http://localhost:3000
```

## 📚 API Documentation

### Backend API
Once the backend is running, access the interactive API documentation at:
```
http://localhost:3000/api
```

### Key Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile

#### Rooms
- `GET /rooms` - Get all rooms
- `POST /rooms` - Create room
- `POST /rooms/join` - Join room
- `DELETE /rooms/exit` - Leave room

#### Messages
- `GET /messages/room/:id` - Get room messages
- `POST /messages` - Send message

### WebSocket Events

#### Connection Events
- `connect` - Client connection
- `disconnect` - Client disconnection

#### Room Events
- `get_rooms` - Get all rooms
- `room.join` - Join a room
- `room.leave` - Leave a room
- `room.created` - Room created notification
- `room.updated` - Room updated notification

#### Message Events
- `message.send` - Send message to room
- `messages.subscribe` - Subscribe to room messages
- `messages.subscription` - Receive messages

#### User Events
- `users.global.subscribe` - Subscribe to all users
- `users.room.subscribe` - Subscribe to room users
- `users.updated` - User list updates

## 🎨 UI/UX Features

### Design System
- **Material Design** - Following Material Design principles
- **Responsive Layout** - Mobile-first design approach
- **Theme Support** - Light and dark themes
- **Accessibility** - WCAG compliance
- **Smooth Animations** - Micro-interactions and transitions

### User Experience
- **Intuitive Navigation** - Clear room management
- **Real-time Updates** - Instant message delivery
- **Status Indicators** - Online/offline user status
- **Message History** - Persistent conversation history
- **Error Handling** - User-friendly error messages

## 🔐 Security Features

### Authentication
- **JWT Tokens** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Token Expiration** - Automatic token refresh
- **Protected Routes** - Route-based authentication

### Data Security
- **Input Validation** - Server-side validation
- **SQL Injection Prevention** - Parameterized queries
- **XSS Protection** - Safe content rendering
- **CORS Configuration** - Secure cross-origin requests

## 📊 Performance

### Backend Optimizations
- **Single WebSocket Gateway** - Consolidated connection handling
- **Connection Pooling** - Database connection optimization
- **Event-driven Architecture** - Efficient event handling
- **Caching Strategy** - Redis-ready architecture

### Frontend Optimizations
- **Code Splitting** - Lazy loading of components
- **Bundle Optimization** - Minimal JavaScript payload
- **Tree Shaking** - Eliminated unused code
- **Efficient State Management** - Optimized re-renders

## 🧪 Testing

### Backend Testing
```bash
cd api
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Coverage reports
```

### Frontend Testing
```bash
cd app
npm run lint              # Code linting
npm run type-check        # Type checking
npm run build             # Production build test
```

## 🚀 Deployment

### Production Deployment

#### Backend
```bash
cd api
npm run build
npm run start:prod
```

#### Frontend
```bash
cd app
npm run build
# Deploy dist/ folder to your web server
```

#### Docker Production
```bash
# Build production images
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Configuration
- **Development**: Local development with hot reload
- **Staging**: Production-like testing environment
- **Production**: Optimized for performance and security

## 📈 Monitoring & Analytics

### Application Health
- **WebSocket Connection Status** - Real-time monitoring
- **API Response Times** - Performance tracking
- **Error Rates** - Application stability
- **User Activity** - Usage analytics

### Logging
- **Structured Logging** - Consistent log format
- **Log Levels** - Debug, info, warn, error
- **Request/Response Logging** - API debugging
- **Error Tracking** - Comprehensive error reporting

## 🤝 Contributing

### Development Guidelines
1. **Fork** the repository
2. **Create** a feature branch
3. **Follow** coding standards
4. **Write** tests for new features
5. **Document** your changes
6. **Submit** a pull request

### Code Standards
- **TypeScript** - Strong typing required
- **ESLint** - Code linting and formatting
- **Conventional Commits** - Standard commit messages
- **Testing** - Test coverage for new code
- **Documentation** - Update relevant documentation

## 🔧 Development Tools

### Recommended Extensions
- **VS Code Extensions**:
  - TypeScript and JavaScript Language Features
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint - Linting
  - Material Icon Theme - UI consistency

### Debugging
- **Backend Debug** - VS Code debugging with launch.json
- **Frontend Debug** - React Developer Tools
- **WebSocket Debug** - Browser DevTools Network tab
- **API Testing** - Postman collection included

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support & Troubleshooting

### Common Issues

#### Backend Issues
- **Database Connection** - Check MySQL service
- **Port Conflicts** - Ensure ports are available
- **Environment Variables** - Verify all variables are set

#### Frontend Issues
- **WebSocket Connection** - Verify backend is running
- **CORS Errors** - Check CORS configuration
- **Build Failures** - Clear node_modules and reinstall

### Getting Help
1. **Check Documentation** - Review README files
2. **Search Issues** - Check existing GitHub issues
3. **Debug Mode** - Enable debug logging
4. **Community** - Join our Discord/Slack
5. **Contact** - Email support team

## 📊 Project Status

### Development Status
- ✅ **MVP Complete** - Core features implemented
- ✅ **Documentation** - Comprehensive documentation
- ✅ **Testing** - Basic test coverage
- 🚧 **Advanced Features** - In development
- 📋 **Mobile App** - Planned

### Roadmap
- [ ] **Mobile Applications** - React Native apps
- [ ] **File Sharing** - Image and file uploads
- [ ] **Voice/Video Calls** - WebRTC integration
- [ ] **Advanced Moderation** - Admin features
- [ ] **Analytics Dashboard** - Usage analytics
- [ ] **Multi-language Support** - Internationalization

---

**Built with ❤️ by the development team using modern web technologies**

---

## Quick Start Guide

```bash
# Clone and setup
git clone https://github.com/Di3go0-0/chat-hub
cd chat-hub

# Start both services (with Docker)
docker-compose up -d

# Or start individually
cd api && npm run start:dev &
cd app && npm run dev

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000/api
```

Enjoy building and customizing your real-time chat application! 🎉