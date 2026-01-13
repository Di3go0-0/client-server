# Chat Hub - Frontend

A modern, real-time chat application frontend built with React, TypeScript, and Material-UI. This application provides an intuitive interface for users to communicate in real-time through WebSocket connections.

## 🚀 Features

- **Real-time Messaging** - Instant message delivery and updates
- **Room Management** - Create, join, and leave chat rooms
- **User Authentication** - Secure login and registration system
- **Online Status** - Track who's online in each room
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Dark/Light Theme** - Customizable theme support
- **Modern UI** - Built with Material-UI components
- **Type Safety** - Full TypeScript implementation

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ThemeToggle.tsx     # Theme switching component
│   └── UserAvatar.tsx      # User avatar display
├── config/             # Application configuration
│   └── constants.ts       # API endpoints and constants
├── context/            # React Context providers
│   ├── AuthContext.tsx    # Authentication state management
│   ├── ThemeProvider.tsx  # Theme management
│   └── WSContext.tsx      # WebSocket connection management
├── guards/             # Route protection components
│   ├── RequiredAuth.tsx    # Protected routes
│   └── RequiredUnauth.tsx # Public routes
├── services/           # Business logic and API calls
│   ├── apiClient.ts       # HTTP client with interceptors
│   └── roomService.ts     # Room-related operations
├── types/              # TypeScript type definitions
│   └── api.types.ts       # API response types
├── utils/              # Utility functions
│   └── ColorGenerator.ts  # Color generation utilities
├── views/              # Page components
│   ├── Login.tsx         # Login page
│   ├── Register.tsx      # Registration page
│   └── rooms/           # Chat room interface
│       ├── Rooms.tsx        # Main chat interface
│       ├── RoomForm.tsx     # Create room dialog
│       └── RoomUpdateForm.tsx # Edit room dialog
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

### Architecture Principles

- **Component Composition** - Reusable, composable components
- **State Management** - Context API for global state
- **Service Layer** - Separated business logic
- **Type Safety** - Full TypeScript coverage
- **Responsive Design** - Mobile-first approach

## 🛠️ Technology Stack

- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.2
- **UI Library**: Material-UI (MUI) 7.3.5
- **Routing**: React Router DOM 7.9.6
- **WebSocket**: Socket.IO Client 4.8.1
- **HTTP Client**: Axios 1.13.2
- **Styling**: Emotion (MUI's CSS-in-JS)
- **Icons**: Lucide React & MUI Icons
- **Development**: ESLint, TypeScript

## 📦 Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/Di3go0-0/chat-hub
   cd chat-hub/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   # Copy and configure environment variables
   cp .env.example .env
   
   # Edit .env with your API endpoints
   VITE_API_URI=http://localhost:3100
   VITE_WS_URI=http://localhost:3100
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables

```env
# API Configuration
VITE_API_URI=http://localhost:3100     # Backend API URL
VITE_WS_URI=http://localhost:3100      # WebSocket server URL
```

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Chrome for Android 90+

## 📚 Usage Examples

### Authentication

```typescript
import { useAuth } from './context/AuthContext';

const { login, register, logout, user, isAuthenticated } = useAuth();

// Login
await login('user@example.com', 'password');

// Register
await register('user@example.com', 'password', 'username');

// Logout
logout();
```

### WebSocket Integration

```typescript
import { useWebSocket } from './context/WSContext';

const { socket, isConnected, emit, on } = useWebSocket();

// Listen to events
const unsubscribe = on('new_message', (message) => {
  console.log('New message:', message);
});

// Send events
emit('send_message', { roomId: 1, message: 'Hello!' });
```

### API Service Usage

```typescript
import { RoomService } from './services/roomService';

const roomService = new RoomService();

// Get user rooms
const rooms = await roomService.getUserRooms();

// Create new room
const newRoom = await roomService.createRoom({
  name: 'General Chat',
  description: 'General discussion'
});
```

## 🎨 UI Components

### Theme System

The application includes a comprehensive theme system with:

- **Light/Dark Mode** - System preference detection
- **Custom Colors** - Consistent color palette
- **Responsive Breakpoints** - Mobile-first design
- **Typography Scale** - Readable text hierarchy

### Key Components

- **UserAvatar** - Consistent user avatars with initials
- **ThemeToggle** - Smooth theme switching
- **RoomList** - Room navigation and management
- **MessageList** - Real-time message display
- **MessageInput** - Message composition interface

## 🔄 State Management

### AuthContext

Manages authentication state including:
- User profile information
- Login/logout functionality
- Token management
- Protected route access

### WSContext

Handles WebSocket connection:
- Connection state management
- Event subscription/unsubscription
- Message emission
- Reconnection logic

### ThemeProvider

Controls UI theming:
- Theme switching (light/dark)
- CSS custom properties
- Component theming
- System preference detection

## 📱 Responsive Design

### Breakpoints

- **xs**: 0px - 599px (Mobile)
- **sm**: 600px - 959px (Tablet)
- **md**: 960px - 1279px (Desktop)
- **lg**: 1280px+ (Large Desktop)

### Adaptive Features

- **Mobile Navigation** - Drawer-based navigation on mobile
- **Responsive Chat** - Adaptive layout for different screen sizes
- **Touch-Friendly** - Optimized for touch interactions
- **Keyboard Support** - Full keyboard navigation

## 🔐 Security Features

- **Token Management** - Secure storage and transmission
- **Automatic Logout** - Token expiration handling
- **Input Validation** - Client-side validation
- **XSS Protection** - Safe content rendering
- **CSRF Protection** - Request validation

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Preview build
npm run preview
```

## 🚀 Deployment

### Build Configuration

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Analyze bundle size (optional)
npm run build -- --analyze
```

### Environment Setup

```bash
# Development
VITE_API_URI=http://localhost:3100 npm run dev

# Production
VITE_API_URI=https://api.yourdomain.com npm run build
```

## 🐛 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Check backend server is running
   - Verify WebSocket URL in environment
   - Check network restrictions

2. **Authentication Errors**
   - Verify token is stored in localStorage
   - Check API endpoints are correct
   - Ensure backend is accessible

3. **Build Errors**
   - Install all dependencies
   - Check TypeScript configuration
   - Verify environment variables

### Debug Mode

Enable debug logging by setting:
```javascript
localStorage.setItem('debug', 'true');
```

## 📈 Performance

### Optimization Techniques

- **Code Splitting** - Lazy loading of components
- **Bundle Analysis** - Optimized package imports
- **Image Optimization** - Efficient image loading
- **Caching Strategy** - Service worker implementation
- **Tree Shaking** - Eliminated unused code

### Bundle Size

The production bundle is optimized for:
- **Fast Loading** - Minimal JavaScript payload
- **Tree Shaking** - Only necessary code included
- **Compression** - Gzip/Brotli support
- **Caching** - Optimized asset caching

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Development Guidelines

- **TypeScript** - All code must be typed
- **Components** - Functional components with hooks
- **Styling** - Use MUI theme system
- **Testing** - Test your changes
- **Documentation** - Update relevant docs

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Open an issue in the repository
- Contact the development team

---

**Built with ❤️ using React, TypeScript, and Material-UI**