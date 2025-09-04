# Point-1: Sistema de Algoritmos de Ordenamiento

## 🏗️ Arquitectura General

Patrones usados

1. **Strategy Pattern** - Para intercambiar algoritmos dinámicamente
2. **Factory Pattern** - Para crear instancias de algoritmos
3. **Context Pattern** - Para manejar el estado y ejecución
4. **Dependency Injection** - Para gestión automática de dependencias y auto-registro

## 🎯 Componentes Principales

### 1. ISort (Abstracción Base)

```csharp
public interface ISort
{
    SortAlgorithm Algorithm { get; }
    void Sort(List<int> data, IComparer<int>? comparer = null);
}
```

Es el **contrato** que todos los algoritmos deben cumplir. Ahora incluye:
- **Algorithm property**: Cada implementación expone qué algoritmo representa
- **Sort method**: Permite inyectar comparadores personalizados para flexibilidad

Esta nueva propiedad `Algorithm` es clave para el **auto-registro** en el factory.

### 2. SortFactory (Factory Pattern)

```csharp
public class SortFactory
{
    private readonly Dictionary<SortAlgorithm, ISort> _strategies;

    public SortFactory(IEnumerable<ISort> strategies)
    {
        _strategies = strategies.ToDictionary(s => s.Algorithm);
    }

    public ISort Create(SortAlgorithm algorithm)
    {
        if (_strategies.TryGetValue(algorithm, out var strategy))
            return strategy;

        throw new ArgumentException($"Algorithm {algorithm} not registered");
    }
}
```

**Revolucionamos el factory** con **auto-registro** usando DI. Ya no necesitamos hardcodear cada algoritmo - el constructor recibe todas las implementaciones de `ISort` y automáticamente las mapea usando su propiedad `Algorithm`. Esto es **súper escalable** porque cada nuevo algoritmo se registra automáticamente solo implementando la interfaz.

### 3. SortContext (Strategy Context)

```csharp
public class SortContext
{
    private ISort? _strategy;

    public SortContext Use(ISort strategy) // Fluent API
    public void Execute(List<int> data, IComparer<int>? comparer = null)
}
```

Maneja el **estado de la estrategia actual**. Implementa una API fluida (method chaining) que hace que el código sea súper legible.

### 4. Algoritmos Implementados

**BubbleSort**: O(n²) - Simple pero ineficiente para datasets grandes

**QuickSort**: O(n log n) promedio - Eficiente, usa divide y vencerás

**InsertionSort**: O(n²) - Eficiente para arrays pequeños o casi ordenados

### 5. Comparadores

```csharp
// AscComparer: x.CompareTo(y) - Ascendente
// DescComparer: y.CompareTo(x) - Descendente
```

Implementan **Strategy Pattern** para el criterio de ordenamiento. Se puede ordenar ascendente o descendente sin tocar los algoritmos.

### 6. Inyección de Dependencias

```csharp
// Configuración en Program.cs
var services = new ServiceCollection();

// Auto-registro de algoritmos
services.AddTransient<ISort, BubbleSort>();
services.AddTransient<ISort, InsertionSort>();
services.AddTransient<ISort, QuickSort>();

// Registro de infraestructura
services.AddSingleton<SortFactory>();
services.AddSingleton<SortContext>();

var provider = services.BuildServiceProvider();
```

**La magia del auto-registro**: Usando Microsoft.Extensions.DependencyInjection, todos los algoritmos que implementen `ISort` se auto-registran en el container. El `SortFactory` recibe automáticamente todas estas implementaciones y las mapea usando la propiedad `Algorithm`.

**Beneficios clave**:
- **Zero Configuration**: Solo implementar `ISort` y listo, se auto-registra
- **Loose Coupling**: Factory no conoce implementaciones específicas
- **Testeable**: Fácil mockar dependencias para testing
- **Escalable**: Agregar algoritmos sin tocar factory ni configuración

## 🔄 Flujo de Ejecución

```csharp
// 1. Configuración del Container DI
var services = new ServiceCollection();
services.AddTransient<ISort, BubbleSort>();
services.AddTransient<ISort, InsertionSort>();
services.AddTransient<ISort, QuickSort>();
services.AddSingleton<SortFactory>();
services.AddSingleton<SortContext>();

var provider = services.BuildServiceProvider();

// 2. Resolución de dependencias
var factory = provider.GetRequiredService<SortFactory>();
var context = provider.GetRequiredService<SortContext>();

// 3. Configuración fluida
context.Use(factory.Create(SortAlgorithm.Quick))  // Factory crea el algoritmo
       .Execute(data, new AscComparer());         // Context ejecuta con comparador
```

El flujo actualizado es:

1. **DI Container** auto-registra todos los algoritmos
2. **Factory** recibe las implementaciones inyectadas automáticamente
3. **Factory** crea el algoritmo según el enum usando el mapeo interno
4. **Context** recibe la estrategia y ejecuta con el comparador específico

## ✨ Puntos a Resaltar

### Extensibilidad

- Nuevo algoritmo: Se implementa `ISort` y se agrega al factory
- Nuevo comparador: Se implementa `IComparer<int>`
- Súper fácil extender sin romper nada existente

### API Fluida

```csharp
context.Use(factory.Create(SortAlgorithm.Quick))
       .Execute(data, new AscComparer());
```

Esta sintaxis es **declarativa** y se lee como inglés natural.

### Separación de Responsabilidades

- **Factory**: Solo crea objetos
- **Context**: Solo maneja estrategias
- **Algoritmos**: Solo ordenan
- **Comparadores**: Solo comparan

## 🚀 Posibles Mejoras

1. **Hacer genérico**: `ISort<T>` para ordenar cualquier tipo
2. **Validaciones**: Null checks más robustos
3. **Async**: Para algoritmos que procesen datasets enormes
4. **Metrics**: Medir tiempo de ejecución y comparaciones

## 🎯 Conclusión

Se Implemento una **arquitectura sólida** el cual hace buen uso de patrones de diseño. El código es limpio, extensible y mantenible.
