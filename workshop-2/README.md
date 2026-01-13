# 💻 Workshop 2: Multi-Language Programming Concepts

This workshop explores **programming concepts across multiple languages**, primarily focusing on **C#** and **Python**. The exercises cover fundamental programming principles, threading, system programming, and language-specific features to develop a versatile programming skillset.

## 📁 Workshop Structure

```
workshop-2/
├── 📂 point-1/           # Interfaces & Shapes (C#)
├── 📂 point-2/           # Threading Exercise (C#)
├── 📂 point-3/           # Basic Programming (Python)
├── 📂 point-4/           # Advanced Programming (Python)
├── 📂 point-5/           # Number Processing & Data Sharing (C#)
├── 📂 point-6/           # Game Development (C#)
├── 📂 point-7/           # Process Management (C#)
├── 📂 point-8/           # [Additional Exercise]
└── 📂 point-9/           # [Additional Exercise]
```

---

## 🎯 Point-by-Point Overview

### 📌 Point 1: Interfaces & Geometric Shapes (C#)
**Focus**: Interface implementation and polymorphism in C#.

**Key Concepts**:
- **Interface Design**: Defining contracts with `IShape`
- **Implementation**: Concrete classes (`Rectangle`, `Triangle`)
- **Polymorphism**: Working with shapes through interface abstractions
- **Object-Oriented Design**: Encapsulation and abstraction

**Files**: `point-1/src/interfaces/IShape.cs`, `point-1/src/shapes/`

**Highlights**:
- `IShape.cs`: Contract defining geometric behavior
- `rectangle.cs` & `triangle.cs`: Specific shape implementations
- Clean separation of interface from implementation

---

### 📌 Point 2: Multi-threading Concepts (C#)
**Focus**: Concurrent programming and thread management in .NET.

**Key Concepts**:
- **Thread Creation**: Spawning worker threads
- **Thread Synchronization**: Using `Join()` for thread coordination
- **Parameter Passing**: Command-line argument handling
- **Static Classes**: Utility class organization

**Files**: `point-2/src/utils/printer.cs`, `point-2/Program.cs`

**Highlights**:
- Worker thread execution with parameter passing
- Main thread and worker thread coordination
- Sequence printing with thread-safe operations
- Command-line argument validation

---

### 📌 Point 3: Programming Fundamentals (Python)
**Focus**: Basic programming concepts using Python syntax.

**Key Concepts**:
- **Python Syntax**: Language fundamentals and structure
- **Basic Operations**: Simple algorithms and logic
- **Python Best Practices**: Clean Python code organization

**Files**: `point-3/main.py`

**Highlights**:
- Pythonic approach to problem-solving
- Simple, readable implementation
- Foundation for Python programming

---

### 📌 Point 4: Advanced Programming (Python)
**Focus**: More complex Python programming concepts.

**Key Concepts**:
- **Advanced Python**: Higher-level programming constructs
- **Data Structures**: Python collection types
- **Algorithm Implementation**: Complex problem-solving

**Files**: `point-4/README.md`, `point-4/main.py`

**Highlights**:
- Comprehensive Python implementation
- Advanced algorithmic approaches
- Documentation and best practices

---

### 📌 Point 5: Number Processing & Data Sharing (C#)
**Focus**: Complex data processing and inter-thread communication.

**Key Concepts**:
- **Number Generation**: Random number creation and management
- **Data Replacement**: Number transformation and substitution
- **Data Sharing**: Thread-safe data sharing mechanisms
- **Supervision**: Process monitoring and control

**Files**: `point-5/src/utils/`

**Highlights**:
- `generateNumbers.cs`: Random number generation
- `numberReplacer.cs`: Number transformation logic
- `shareData.cs`: Thread-safe data sharing
- `supervisor.cs`: Process monitoring implementation

---

### 📌 Point 6: Game Development (C#)
**Focus**: Game programming concepts with random elements.

**Key Concepts**:
- **Game Logic**: Game state management
- **Random Generation**: Pseudo-random number usage
- **Score Calculation**: Game scoring algorithms
- **Game Management**: Game flow control

**Files**: `point-6/src/utils/`

**Highlights**:
- `gameManager.cs`: Core game logic
- `randomGenerator.cs`: Random number utilities
- `sumCalculator.cs`: Score and sum calculations
- Interactive game experience

---

### 📌 Point 7: Process Management (C#)
**Focus**: System programming and process control.

**Key Concepts**:
- **Process Enumeration**: System process discovery
- **Process Termination**: Process lifecycle management
- **User Input Handling**: Command-line interaction
- **System Operations**: Low-level system programming

**Files**: `point-7/src/utils/`

**Highlights**:
- `processLister.cs`: System process enumeration
- `processKiller.cs`: Process termination
- `userInputHandler.cs`: User interaction management
- System administration capabilities

---

## 🛠️ Technologies & Languages

### **C# (.NET)**
- **Points 1, 2, 5, 6, 7**: Advanced C# concepts
- **Threading**: Multi-threading and concurrent programming
- **System Programming**: Process and system management
- **Object-Oriented**: Interfaces, classes, and inheritance

### **Python**
- **Points 3, 4**: Python programming fundamentals
- **Data Structures**: Python collections and algorithms
- **Clean Code**: Pythonic code organization

## 🎓 Learning Objectives

After completing this workshop, you'll master:

- **Multi-language Proficiency**: Switching between C# and Python
- **Concurrent Programming**: Threading and synchronization
- **System Programming**: Process management and control
- **Interface Design**: Contract-first programming
- **Data Processing**: Complex data manipulation algorithms
- **Game Development**: Interactive application programming

## 🚀 Getting Started

### Prerequisites
- **.NET 6 SDK** or later (for C# exercises)
- **Python 3.8+** (for Python exercises)
- **IDE**: Visual Studio, VS Code, or JetBrains Rider
- **Terminal/Command Prompt**: For running exercises

### Running Individual Exercises

#### C# Exercises
```bash
# Point 1 - Interfaces & Shapes
cd point-1
dotnet run

# Point 2 - Threading
cd point-2
dotnet run -- 3 10

# Point 5 - Number Processing
cd point-5
dotnet run

# Point 6 - Game Development
cd point-6
dotnet run

# Point 7 - Process Management
cd point-7
dotnet run
```

#### Python Exercises
```bash
# Point 3 - Basic Python
cd point-3
python main.py

# Point 4 - Advanced Python
cd point-4
python main.py
```

## 📊 Exercise Matrix

| Point | Language | Focus Area | Difficulty | Key Concepts |
|-------|----------|------------|------------|--------------|
| Point 1 | C# | OOP | Beginner | Interfaces, Polymorphism |
| Point 2 | C# | Threading | Intermediate | Multi-threading, Synchronization |
| Point 3 | Python | Basics | Beginner | Python fundamentals |
| Point 4 | Python | Advanced | Intermediate | Complex algorithms |
| Point 5 | C# | Data Processing | Intermediate | Data sharing, Utilities |
| Point 6 | C# | Game Dev | Intermediate | Game logic, Random |
| Point 7 | C# | System | Advanced | Process management |

## 💡 Programming Concepts Covered

### **Object-Oriented Programming**
- Interface design and implementation
- Polymorphism and abstraction
- Class design and relationships

### **Concurrent Programming**
- Thread creation and management
- Thread synchronization techniques
- Shared data management

### **System Programming**
- Process enumeration and control
- System-level operations
- User input handling

### **Algorithm Development**
- Random number generation
- Data transformation and processing
- Game logic implementation

## 🎯 Real-World Applications

### **Business Applications**
- **Point 1**: Shape interfaces for graphics applications
- **Point 5**: Data processing for business analytics
- **Point 6**: Gaming mechanics for entertainment software

### **System Tools**
- **Point 2**: Multi-threaded data processing
- **Point 7**: System administration and monitoring tools

### **Cross-Language Development**
- **Points 3-4**: Python scripting and automation
- Language interoperability concepts

## 🔍 Code Quality Practices

### **C# Best Practices**
- Strong typing and type safety
- Proper exception handling
- Clean Code principles
- SOLID principles application

### **Python Best Practices**
- PEP 8 style guide compliance
- Pythonic code patterns
- Readability and maintainability
- Proper documentation

## 📈 Learning Progression

1. **Point 1**: Foundation in OOP and interfaces
2. **Point 2**: Introduction to concurrent programming
3. **Point 3**: Python basics for cross-language skills
4. **Point 4**: Advanced Python concepts
5. **Point 5**: Complex data processing
6. **Point 6**: Interactive application development
7. **Point 7**: System-level programming

## 🔗 Related Resources

- [Main Repository README](../README.md)
- [Workshop 1: Design Patterns](../workshop-1/)
- [Final Project Documentation](../final-project/)

---

**Workshop completed with comprehensive multi-language programming skills** 🌐