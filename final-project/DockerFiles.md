# Docker Files Guide

This guide explains how to use the Docker configuration for the Chat Hub project, including individual Dockerfiles and Docker Compose setups.

## 📁 Docker Files Structure

```
chat-hub/
├── api/
│   ├── Dockerfile              # Backend Dockerfile
│   └── .dockerignore           # API Docker ignore file
├── app/
│   ├── Dockerfile              # Frontend Dockerfile
│   └── .dockerignore           # App Docker ignore file
├── docker-compose.yml          # Development setup
├── docker-compose.prod.yml     # Production setup
├── .dockerignore              # Root Docker ignore file
└── DockerFiles.md             # This guide
```

## 🐳 Dockerfiles Overview

### Backend Dockerfile (`api/Dockerfile`)

Multi-stage build optimized for NestJS production:

#### Stages:
1. **base** - Node.js 18 Alpine foundation
2. **deps** - Install dependencies only
3. **builder** - Build the application
4. **runner** - Production runtime

#### Features:
- **Alpine Linux** - Small image size (~50MB)
- **Non-root user** - Security best practice
- **Health checks** - Container monitoring
- **Optimized layers** - Faster rebuilds

### Frontend Dockerfile (`app/Dockerfile`)

Multi-stage build optimized for React/Vite production:

#### Stages:
1. **base** - Node.js 18 Alpine foundation
2. **deps** - Install dependencies only
3. **builder** - Build the application
4. **runner** - Production runtime

#### Features:
- **Alpine Linux** - Minimal footprint
- **Non-root user** - Enhanced security
- **Static serving** - Optimized for SPA
- **Health checks** - Container monitoring

## 🚀 Usage Guide

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- At least 2GB RAM available

### Quick Start

#### 1. Development Environment
```bash
# Clone and navigate to project
git clone https://github.com/Di3go0-0/chat-hub
cd chat-hub

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### 2. Production Environment
```bash
# Start production services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Individual Service Management

#### Backend Only
```bash
# Build and run API
cd api
docker build -t chat-hub-api .
docker run -p 3000:3000 chat-hub-api

# With compose
docker-compose up -d api
```

#### Frontend Only
```bash
# Build and run app
cd app
docker build -t chat-hub-app .
docker run -p 80:80 chat-hub-app

# With compose
docker-compose up -d app
```

#### Database Only
```bash
# Start MySQL
docker-compose up -d mysql

# Connect to database
docker exec -it chat-hub-mysql mysql -u chatuser -p chat_db
```

## 🔧 Configuration

### Environment Variables

#### Backend (API)
```yaml
environment:
  API_PORT: 3000
  SWAGGER_RUTE: /api
  SECRET_KEY: your-super-secret-jwt-key
  RESEND_API_KEY: your-email-service-key
  DATABASE_URL: mysql://chatuser:chatpassword@mysql:3306/chat_db
```

#### Frontend (App)
```yaml
environment:
  VITE_API_URI: http://localhost:3000
  VITE_WS_URI: http://localhost:3000
```

#### Database (MySQL)
```yaml
environment:
  MYSQL_ROOT_PASSWORD: rootpassword
  MYSQL_DATABASE: chat_db
  MYSQL_USER: chatuser
  MYSQL_PASSWORD: chatpassword
```

### Custom Configuration

#### 1. Create Custom Environment File
```bash
# Create .env file
cp .env.example .env

# Edit with your values
nano .env
```

#### 2. Use Custom Compose File
```bash
# Create custom compose file
cp docker-compose.yml docker-compose.custom.yml

# Edit and use
docker-compose -f docker-compose.custom.yml up -d
```

## 🏗️ Build Process

### Multi-Stage Build Benefits

1. **Smaller Final Images**
   - Build tools excluded from production
   - Only runtime dependencies included
   - Reduced attack surface

2. **Faster Rebuilds**
   - Dependencies cached separately
   - Source code changes don't require reinstalling deps
   - Layer caching optimization

3. **Better Security**
   - Non-root user execution
   - Minimal attack surface
   - No build tools in production

### Build Layers Explanation

#### Backend Layers
```dockerfile
# Layer 1: Base system
FROM node:18-alpine AS base

# Layer 2: Dependencies (cached)
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Layer 3: Source code (rebuilt when changed)
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Layer 4: Production (minimal)
FROM base AS runner
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
```

#### Frontend Layers
Similar structure but optimized for static assets.

## 🔍 Health Checks

### Backend Health Check
```bash
# Test health endpoint
curl -f http://localhost:3000/api

# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Frontend Health Check
```bash
# Test frontend
curl -f http://localhost:80

# Check container health
docker inspect chat-hub-app | grep Health -A 10
```

### Database Health Check
```bash
# Test MySQL connection
docker exec chat-hub-mysql mysqladmin ping -h localhost

# Check container health
docker inspect chat-hub-mysql | grep Health -A 10
```

## 📊 Monitoring & Logs

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f app
docker-compose logs -f mysql

# Last 100 lines
docker-compose logs --tail=100 -f
```

### Resource Monitoring
```bash
# Container stats
docker stats

# Detailed container info
docker inspect chat-hub-api
docker inspect chat-hub-app
docker inspect chat-hub-mysql
```

## 🛠️ Development Workflow

### 1. Local Development
```bash
# Start with Docker Compose
docker-compose up -d

# Make code changes locally
# Changes reflect in containers (via volume mounts)

# Restart services if needed
docker-compose restart api
docker-compose restart app
```

### 2. Testing Builds
```bash
# Test build without cache
docker-compose build --no-cache

# Test specific service
docker-compose build --no-cache api

# Pull latest base images
docker-compose pull
```

### 3. Production Deployment
```bash
# Build and deploy
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Verify deployment
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f
```

## 🧹 Cleanup & Maintenance

### Remove Containers
```bash
# Stop and remove
docker-compose down

# Remove with volumes
docker-compose down -v

# Remove all (including images)
docker-compose down --rmi all
```

### Cleanup Unused Resources
```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune
```

### Update Images
```bash
# Pull latest base images
docker pull node:18-alpine
docker pull mysql:8.0

# Rebuild with latest
docker-compose build --no-cache
docker-compose up -d
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Conflicts
```bash
# Check port usage
netstat -tulpn | grep :3000
netstat -tulpn | grep :80

# Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Use different host port
```

#### 2. Database Connection Issues
```bash
# Check MySQL container
docker logs chat-hub-mysql

# Test connection
docker exec -it chat-hub-mysql mysql -u chatuser -p

# Restart database
docker-compose restart mysql
```

#### 3. Build Failures
```bash
# Clear build cache
docker builder prune

# Rebuild without cache
docker-compose build --no-cache

# Check disk space
df -h
```

#### 4. Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Clean up docker
docker system prune -a
```

### Debug Mode
```bash
# Run with shell access
docker run -it --entrypoint /bin/sh chat-hub-api

# Debug with compose
docker-compose run --rm api sh
docker-compose run --rm app sh
```

## 📚 Best Practices

### 1. Security
- Use non-root users
- Don't store secrets in images
- Regular base image updates
- Scan images for vulnerabilities

### 2. Performance
- Multi-stage builds
- Layer caching
- Minimal base images
- Health checks enabled

### 3. Maintainability
- Clear documentation
- Version tagging
- Environment-specific configs
- Automated testing

### 4. Production Readiness
- Resource limits
- Restart policies
- Logging configuration
- Monitoring setup

## 🔄 CI/CD Integration

### Example GitHub Actions
```yaml
name: Docker Build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker images
        run: |
          docker-compose build
          docker-compose -f docker-compose.prod.yml build
```

### Deployment Script
```bash
#!/bin/bash
# deploy.sh
set -e

echo "Building images..."
docker-compose -f docker-compose.prod.yml build

echo "Deploying..."
docker-compose -f docker-compose.prod.yml up -d

echo "Verifying..."
sleep 30
curl -f http://localhost:3000/api
curl -f http://localhost:80

echo "Deployment complete!"
```

---

## 📞 Support

For Docker-related issues:
1. Check this guide first
2. Review container logs
3. Test with fresh build
4. Check GitHub issues
5. Contact development team

**Happy Containerizing! 🐳**