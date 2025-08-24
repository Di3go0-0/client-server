# Point-1: Sistema de Algoritmos de Ordenamiento

## 🏗️ Arquitectura General

Patrones usados

1. **Strategy Pattern** - Para intercambiar algoritmos dinámicamente
2. **Factory Pattern** - Para crear instancias de algoritmos
3. **Context Pattern** - Para manejar el estado y ejecución

## 🎯 Componentes Principales

### 1. ISort (Abstracción Base)
```csharp
public interface ISort
{
    void Sort(List<int> data, IComparer<int>? comparer = null);
}
```
Es el **contrato** que todos los algoritmos deben cumplir. Permite inyectar comparadores personalizados, lo que le da flexibilidad al sistema.

### 2. SortFactory (Factory Pattern)
```csharp
public class SortFactory
{
    public readonly Dictionary<SortAlgorithm, ISort> _map = new()
    {
        {SortAlgorithm.Bubble, new BubbleSort()},
        {SortAlgorithm.Insertion, new InsertionSort()},
        {SortAlgorithm.Quick, new QuickSort()},
    };
}
```
**Centraliza la creación** de algoritmos. Mapea cada enum a su implementación concreta. Esto es util por si se desea agregar un nuevo algoritmo.

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

## 🔄 Flujo de Ejecución

```csharp
// 1. Inicialización
var factory = new SortFactory();
var context = new SortContext();

// 2. Configuración fluida
context.Use(factory.Create(SortAlgorithm.Quick))  // Factory crea el algoritmo
       .Execute(data, new AscComparer());         // Context ejecuta con comparador
```

El flujo es:
1. **Factory** crea el algoritmo según el enum
2. **Context** recibe la estrategia  
3. **Context** ejecuta con el comparador específico

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


