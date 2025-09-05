# 📦 Inventory Optimization System (Control de Inventario con Algoritmos Dinámicos)

## 📌 Contexto del problema

El ejercicio planteaba un sistema de **control de inventario** en el que:

- Se necesitaba **agregar, eliminar o editar algoritmos de optimización**.
- Cada algoritmo debía poder ejecutarse en diferentes versiones del sistema (clientes distintos).
- El algoritmo debía poder **cambiarse en tiempo de ejecución** (escenario de simulación).

La primera implementación cumplía parcialmente, pero:

- La **fábrica (`InventorySystemFactory`) estaba acoplada al `AlgorithmManager`** mediante un `switch`.
- Esto violaba los principios **DIP** (Dependency Inversion Principle) y **OCP** (Open/Closed Principle), porque cada vez que había un algoritmo nuevo había que modificar el `switch`.

---

## 🔄 Solución propuesta

### ✅ Reestructuración del diseño

Para resolver el problema se introdujo un **proveedor de algoritmos (`IAlgorithmProvider`)** que desacopla la fábrica (`InventorySystemFactory`) de los algoritmos concretos.  
Esto permite **registrar dinámicamente algoritmos** y **crear versiones del sistema sin modificar código existente**.

---

## 📊 Diagrama de clases

### 🔹 Grupo A – Núcleo del inventario y algoritmos

Este grupo concentra la **lógica del dominio**:

- **Inventory**: gestiona productos y almacenes.
- **Product** y **Warehouse**: entidades básicas.
- **IAlgorithm**: contrato que define un algoritmo de optimización.
- **SimpleDeterministicAlgorithm** y **AdvancedStochasticAlgorithm**: implementaciones concretas.
- **InventorySystem**: orquesta el inventario y el algoritmo actual.

### 🔹 Grupo B – Configuración y creación dinámica

Este grupo se encarga de la **infraestructura/configuración**:

- **IAlgorithmProvider**: contrato para obtener y registrar algoritmos dinámicamente.
- **AlgorithmProvider**: implementación con un diccionario de **factories (`Func<IAlgorithm>`)**.
- **InventorySystemFactory**: usa el `IAlgorithmProvider` para crear instancias de `InventorySystem` sin acoplarse a implementaciones concretas.

⚡ Gracias a esta separación, el **Grupo B configura** y el **Grupo A ejecuta**.

---

## 📝 Ejemplo de código y uso

### Registro de algoritmos

```csharp
var provider = new AlgorithmProvider();

// Registro dinámico de algoritmos
provider.RegisterAlgorithm("SimpleDeterministic", () => new SimpleDeterministicAlgorithm());
provider.RegisterAlgorithm("AdvancedStochastic", () => new AdvancedStochasticAlgorithm());
```

### Creación del sistema

```csharp
var inventory = new Inventory();
inventory.AddProduct(new Product { Name = "Laptop", Quantity = 5, Price = 1200 });
inventory.AddWarehouse(new Warehouse { Name = "Central", Capacity = 100 });

var factory = new InventorySystemFactory(provider);

// Crear versión del sistema con un algoritmo específico
var system = factory.CreateSystem("AdvancedStochastic", inventory);

// Ejecutar simulación
system.GenerateReport();
system.RunOptimization();
system.SetAlgorithm(provider.GetAlgorithm("SimpleDeterministic")!);
system.RunOptimization();
```

---

## 🧩 Cumplimiento de principios SOLID

### **S – Single Responsibility Principle**

- Cada clase tiene **una sola responsabilidad**:
  - `Product` → representa un producto.
  - `Inventory` → gestiona colecciones de productos y almacenes.
  - `IAlgorithm` → define cómo optimizar.
  - `AlgorithmProvider` → administra algoritmos disponibles.
  - `InventorySystemFactory` → crea sistemas configurados.

### **O – Open/Closed Principle**

- El sistema está **abierto a extensión pero cerrado a modificación**:
  - Se pueden agregar nuevos algoritmos registrándolos en el `AlgorithmProvider`, sin modificar código existente.
  - La fábrica ya no usa `switch` ni necesita cambios.

### **L – Liskov Substitution Principle**

- Cualquier clase que implemente `IAlgorithm` puede sustituir otra sin romper el sistema (`SimpleDeterministicAlgorithm`, `AdvancedStochasticAlgorithm`, etc.).

### **I – Interface Segregation Principle**

- `IAlgorithm` define únicamente lo necesario (`Name` y `Execute`).
- `IAlgorithmProvider` define una interfaz mínima para registrar/obtener algoritmos.

### **D – Dependency Inversion Principle**

- `InventorySystemFactory` depende de la **abstracción `IAlgorithmProvider`**, no de implementaciones concretas.
- Esto permite cambiar la implementación de cómo se obtienen algoritmos sin modificar la fábrica.

---

## 🚀 Conclusión

La solución:

- Elimina el acoplamiento entre la fábrica y los algoritmos.
- Permite registrar algoritmos dinámicamente.
- Cumple con los principios **SOLID**, logrando un sistema extensible, mantenible y desacoplado.

---

```

```
