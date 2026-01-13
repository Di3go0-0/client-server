# 🏗️ Client-Server Architecture Course Repository

This repository contains all the practical work developed during the **Client-Server Architecture** course, including hands-on workshops and a comprehensive final project. The focus is on understanding and implementing modern software architecture patterns, design principles, and real-world applications.

## 📁 Repository Structure

```
client-server/
├── 📂 workshop-1/              # C# Design Patterns & SOLID Principles
│   ├── point-1/               # Strategy Pattern & Sorting Algorithms
│   ├── point-2/               # Basic C# Fundamentals
│   ├── point-3/               # Inventory System with Dynamic Algorithms
│   ├── point-4/               # Decorator Pattern & Logging
│   └── point-5/               # Behavioral, Creational & Structural Patterns
├── 📂 workshop-2/              # Multi-Language Programming Concepts
│   ├── point-1/               # Interfaces & Shapes (C#)
│   ├── point-2/               # Threading Exercise (C#)
│   ├── point-3/               # Basic Programming (Python)
│   ├── point-4/               # Advanced Programming (Python)
│   ├── point-5/               # Number Processing & Data Sharing (C#)
│   ├── point-6/               # Game Development (C#)
│   ├── point-7/               # Process Management (C#)
│   ├── point-8/               # [Additional Exercise]
│   └── point-9/               # [Additional Exercise]
├── 📂 final-project/ 📦        # Real-Time Chat Application (Git Submodule)
│   └── [External Repository]  # 📎 chat-hub → Full-stack chat application
├── 📂 app/                     # Supporting Application Files
│   ├── auth.js                 # Authentication testing
│   ├── messages1.js & messages2.js  # Message testing clients
│   ├── room.js                 # Room management testing
│   ├── users.js                # User management testing
│   └── room-toggle.js         # Room operations testing
├── 📄 .gitmodules              # Git submodule configuration
└── 📄 README.md               # This file
```

## 🚀 Projects Overview

### 🛠️ Workshop 1: C# & Design Patterns
**Focus**: Object-oriented programming, SOLID principles, and design patterns implementation in C#.

- **Point 1**: Strategy pattern implementation for sorting algorithms with configurable comparers
- **Point 2**: Basic C# programming fundamentals
- **Point 3**: Dynamic inventory system with runtime algorithm switching
- **Point 4**: Decorator pattern for enhanced logging capabilities
- **Point 5**: Comprehensive design patterns covering behavioral, creational, and structural categories

### 🔧 Workshop 2: Multi-Language Programming
**Focus**: Programming concepts across different languages including C# and Python.

- **Point 1**: Interface implementation with geometric shapes (C#)
- **Point 2**: Multi-threading concepts and worker threads (C#)
- **Point 3**: Programming fundamentals implementation (Python)
- **Point 4**: Advanced programming techniques (Python)
- **Point 5**: Data processing and inter-thread communication (C#)
- **Point 6**: Game development with random number generation (C#)
- **Point 7**: System process management and control (C#)

### 🌐 Final Project: Real-Time Chat Application 📦
**Focus**: Full-stack web development with real-time communication capabilities.

> **Note**: This is implemented as a **Git Submodule** pointing to the dedicated `chat-hub` repository.

A complete chat application featuring:
- **Backend**: NestJS with WebSocket support for real-time messaging
- **Frontend**: React with TypeScript for responsive UI
- **Database**: MySQL with Prisma ORM for data persistence
- **Authentication**: JWT-based secure user authentication
- **Real-time Features**: Instant messaging, room management, online status

**📌 Repository**: [chat-hub](https://github.com/Di3go0-0/chat-hub) (External Submodule)

## 🛠️ Technology Stack

### **Languages & Frameworks**
- **C#** (.NET) - Design patterns and object-oriented programming
- **Python** - Algorithm implementation and data structures
- **TypeScript** - Frontend and backend type safety
- **JavaScript** - Frontend interactivity

### **Backend Technologies**
- **NestJS** - Node.js framework for REST APIs
- **Socket.IO** - Real-time WebSocket communication
- **Prisma ORM** - Database abstraction layer
- **MySQL** - Relational database management
- **JWT** - Authentication and authorization

### **Frontend Technologies**
- **React 19** - Modern UI framework
- **Material-UI (MUI)** - Component library
- **Vite** - Fast development build tool
- **Axios** - HTTP client library

## 🎯 Learning Objectives

Through this repository, I've developed expertise in:

- **Software Architecture**: Client-server patterns, separation of concerns
- **Design Patterns**: Strategy, Decorator, Observer, Factory, and more
- **SOLID Principles**: Writing maintainable and extensible code
- **Multi-language Development**: C#, Python, JavaScript/TypeScript
- **Real-time Communication**: WebSocket implementation
- **Full-stack Development**: End-to-end application development
- **Database Design**: Schema design and ORM usage
- **Modern Tooling**: Version control, build systems, testing frameworks

## 📊 Project Status

| Project | Language/Stack | Status | Key Features |
|---------|---------------|--------|--------------|
| Workshop 1 | C#/.NET | ✅ Complete | SOLID principles, Design patterns |
| Workshop 2 | C#/Python | ✅ Complete | Multi-language programming |
| Final Project 📦 | Node.js/React | ✅ Complete | Real-time chat, Full-stack (Submodule) |

## 📦 Git Submodule Management

The final project is managed as a Git submodule to maintain separation between the course work and the dedicated project repository.

### Submodule Commands

```bash
# Initialize submodule (first time setup)
git submodule update --init --recursive

# Update submodule to latest changes
git submodule update --remote final-project

# Navigate into submodule directory
cd final-project

# Work within submodule (it's a separate repository)
git status
git pull origin main

# Return to main repository
cd ..
```

### Why Use Submodules?

- **Separation of Concerns**: Keeps the final project's own development history separate
- **Independent Development**: Allows the chat application to evolve independently
- **Clean Repository**: Maintains a clean structure for the course materials
- **Version Control**: Each repository maintains its own commit history and releases

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** for final project
- **.NET 6+** for C# projects
- **Python 3.8+** for Python exercises
- **MySQL 8.0+** for final project database

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client-server
   ```

2. **Explore workshops**
   - Check [Workshop 1](./workshop-1/) for C# and design patterns
   - Check [Workshop 2](./workshop-2/) for multi-language exercises
   - Check [Final Project](./final-project/) for full-stack application (submodule)

3. **Initialize and run the final project (submodule)**
   ```bash
   # Initialize submodule (first time only)
   git submodule update --init --recursive
   
   # Navigate to submodule
   cd final-project
   
   # Run the application
   docker-compose up -d
   ```

## 📚 Documentation Links

- [Workshop 1 Documentation](./workshop-1/) - C# design patterns and SOLID principles
- [Workshop 2 Documentation](./workshop-2/) - Multi-language programming exercises
- [Final Project Documentation](./final-project/) 📦 - Real-time chat application (submodule)
- [External Project Repository](https://github.com/Di3go0-0/chat-hub) - Dedicated chat-hub repository
- [Supporting App Files](./app/) - WebSocket testing and debugging tools

## 💡 Key Takeaways

This repository represents my journey through understanding and implementing:

- **Clean Architecture**: Building maintainable and scalable applications
- **Design Patterns**: Practical application of Gang of Four patterns
- **Real-time Systems**: WebSocket implementation for live communication
- **Full-stack Development**: Complete application from database to UI
- **Professional Practices**: Documentation, testing, and code organization

## 🤝 Contact & Collaboration

As a  developer, this repository showcases my ability to:

- Implement complex software architecture
- Work with multiple programming languages and frameworks
- Apply design principles and patterns effectively
- Build complete full-stack applications
- Maintain clean, documented, and professional code

---

**Built with passion for software engineering and continuous learning** 🚀
