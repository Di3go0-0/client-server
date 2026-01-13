# 🔧 Workshop 1: C# Design Patterns & SOLID Principles

This workshop focuses on **Object-Oriented Programming** in C#, with a strong emphasis on **SOLID principles** and **design patterns**. Each point explores different aspects of software design, from basic concepts to advanced architectural patterns.

## 📁 Workshop Structure

```
workshop-1/
├── 📂 point-1/           # Strategy Pattern & Sorting Algorithms
├── 📂 point-2/           # Basic C# Fundamentals  
├── 📂 point-3/           # Dynamic Inventory System
├── 📂 point-4/           # Decorator Pattern & Logging
└── 📂 point-5/           # Comprehensive Design Patterns
```

---

## 🎯 Point-by-Point Overview

### 📌 Point 1: Strategy Pattern & Sorting Algorithms
**Focus**: Behavioral patterns and flexible algorithm implementation.

**Key Concepts**:
- **Strategy Pattern**: Encapsulating algorithms and making them interchangeable
- **Comparers**: Custom comparison logic for sorting
- **Factory Pattern**: Creating appropriate sorting strategies
- **Context Management**: Using strategies through context classes

**Files**: `point-1/src/comparers/`, `point-1/src/infrastructure/`

**Highlights**:
- `AscComparer.cs` & `DescComparer.cs`: Custom comparison strategies
- `sortContext.cs`: Context class for strategy execution
- `sortFactory.cs`: Factory for creating sorting strategies

---

### 📌 Point 2: Basic C# Fundamentals
**Focus**: Core C# programming concepts and syntax.

**Key Concepts**:
- Basic C# syntax and structure
- Object-oriented fundamentals
- Class design and implementation

**Files**: `point-2/Program.cs`

**Highlights**:
- Simple, focused C# implementation
- Foundation for advanced concepts

---

### 📌 Point 3: Dynamic Inventory System
**Focus**: Advanced OOP with runtime algorithm switching and SOLID principles.

**Key Concepts**:
- **Dependency Inversion Principle (DIP)**: Decoupling through abstractions
- **Open/Closed Principle (OCP)**: Open for extension, closed for modification
- **Dynamic Algorithm Registration**: Runtime algorithm management
- **Factory Pattern**: Creating configured system instances

**Files**: `point-3/src/Interfaces/`, `point-3/src/Managers/`, `point-3/src/Services/`

**Highlights**:
- `IAlgorithmProvider.cs`: Dynamic algorithm management interface
- `InventorySystemFactory.cs`: Decoupled factory implementation
- Runtime algorithm switching without code modification
- Full SOLID principles compliance

---

### 📌 Point 4: Decorator Pattern & Logging
**Focus**: Structural patterns and dynamic functionality enhancement.

**Key Concepts**:
- **Decorator Pattern**: Adding responsibilities dynamically
- **Service Enhancement**: Extending functionality without modification
- **Logging Systems**: Implementing cross-cutting concerns
- **Account Management**: Practical decorator application

**Files**: `point-4/src/Services/`, `point-4/src/Interfaces/`

**Highlights**:
- `ConsoleLoggerService.cs`: Decorator implementation
- `Account.cs` & `SavingsAccount.cs`: Core domain models
- Dynamic logging capability addition

---

### 📌 Point 5: Comprehensive Design Patterns
**Focus**: Complete implementation of Gang of Four design patterns.

**Categories & Patterns**:

#### 🔄 Behavioral Patterns
- **Observer**: Event-driven subscription model (`observer/`)

#### 🏗️ Creational Patterns  
- **Factory**: Object creation encapsulation (`factory/`)

#### 🎨 Structural Patterns
- **Decorator**: Dynamic responsibility addition (`decorator/`)

**Files**: `point-5/design-patterns/`

**Highlights**:
- Complete pattern implementations with class diagrams
- Real-world use cases and examples
- Mermaid diagrams for visualization
- Comprehensive documentation for each pattern

---

## 🛠️ Technologies Used

- **Language**: C# (.NET 6+)
- **Architecture**: Object-Oriented Design
- **Design Patterns**: Strategy, Factory, Decorator, Observer
- **Principles**: SOLID principles implementation
- **Documentation**: Class diagrams, Mermaid charts

## 🎓 Learning Objectives

After completing this workshop, you'll master:

- **SOLID Principles**: Writing maintainable and extensible code
- **Design Patterns**: Practical implementation of GoF patterns
- **OOP Concepts**: Encapsulation, inheritance, polymorphism, abstraction
- **Architectural Thinking**: Designing flexible and scalable systems
- **Code Organization**: Proper separation of concerns
- **Documentation**: Creating clear technical documentation

## 🚀 Getting Started

### Prerequisites
- **.NET 6 SDK** or later
- **IDE**: Visual Studio, VS Code, or JetBrains Rider

### Running Individual Exercises

Each point can be run independently:

```bash
# Point 1 - Strategy Pattern
cd point-1
dotnet run

# Point 2 - Basic C#
cd point-2  
dotnet run

# Point 3 - Inventory System
cd point-3
dotnet run

# Point 4 - Decorator Pattern
cd point-4
dotnet run

# Point 5 - Design Patterns (run individual patterns)
cd point-5/design-patterns/observer
dotnet run
```

## 📊 Key Achievements

| Point | Main Focus | Patterns Used | SOLID Principles |
|-------|------------|---------------|------------------|
| Point 1 | Strategy Pattern | Strategy, Factory | S, O, D |
| Point 2 | Basic Concepts | - | - |
| Point 3 | Dynamic System | Factory, Strategy | **All 5** |
| Point 4 | Decorator | Decorator | S, O, L, I |
| Point 5 | Patterns Collection | **All 3 categories** | **All applied** |

## 💡 Key Insights

### SOLID Principles in Practice
- **S (Single Responsibility)**: Each class has one clear purpose
- **O (Open/Closed)**: Systems are extensible without modification
- **L (Liskov Substitution)**: Implementations are interchangeable
- **I (Interface Segregation)**: Interfaces are focused and minimal
- **D (Dependency Inversion)**: High-level modules don't depend on low-level details

### Pattern Selection Criteria
- **Strategy Pattern**: When algorithms need to be interchangeable
- **Factory Pattern**: When object creation logic needs to be centralized
- **Decorator Pattern**: When responsibilities need to be added dynamically
- **Observer Pattern**: When one-to-many dependency relationships are needed

## 📈 Complexity Progression

1. **Point 1**: Introduction to behavioral patterns
2. **Point 2**: Language fundamentals
3. **Point 3**: Complex system with full SOLID implementation
4. **Point 4**: Structural patterns for enhancement
5. **Point 5**: Comprehensive pattern catalog

---

## 🔗 Related Resources

- [Main Repository README](../README.md)
- [Workshop 2: Multi-Language Programming](../workshop-2/)
- [Final Project Documentation](../final-project/)

---

**Workshop completed with focus on clean, maintainable, and extensible software design** 🎯