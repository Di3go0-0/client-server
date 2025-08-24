# Sistema de Cálculo de Cuotas - Point 2

## Descripción

Sistema que calcula el precio en cuotas de productos según diferentes marcas de tarjetas de crédito, implementando los patrones **Strategy** y **Factory Method** con principios **SOLID**.

## Patrones Implementados

### Strategy Pattern
- **Propósito**: Permite definir diferentes algoritmos de cálculo de intereses según la marca de tarjeta
- **Implementación**:
  - `ICalculoInteres`: Interfaz que define el contrato
  - `VisaCalculoStrategy`: Estrategia específica para Visa (interés compuesto con descuentos)
  - `MasterCardCalculoStrategy`: Estrategia específica para MasterCard (interés simple con recargos)
  - `AmericanExpressCalculoStrategy`: Estrategia específica para American Express (sistema francés)

### Factory Method Pattern
- **Propósito**: Centraliza la creación de estrategias de cálculo según la marca de tarjeta
- **Implementación**:
  - `ICalculoInteresFactory`: Interfaz del factory
  - `CalculoInteresFactory`: Implementación que crea las estrategias apropiadas

## Principios SOLID Aplicados

### Single Responsibility Principle (SRP)
- Cada clase tiene una única responsabilidad:
  - `Producto`: Solo maneja información del producto
  - `Tarjeta`: Solo maneja información de la tarjeta
  - `VisaCalculoStrategy`: Solo calcula intereses para Visa
  - `ServicioCalculoCuotas`: Solo orquesta el cálculo de cuotas

### Open/Closed Principle (OCP)
- El sistema está abierto para extensión pero cerrado para modificación
- Agregar nuevas marcas de tarjeta no requiere modificar código existente
- Solo se necesita crear una nueva estrategia e registrarla en el factory

### Liskov Substitution Principle (LSP)
- Todas las estrategias implementan `ICalculoInteres` y son intercambiables
- El servicio puede usar cualquier estrategia sin conocer su implementación específica

### Interface Segregation Principle (ISP)
- Interfaces específicas y cohesivas:
  - `ICalculoInteres`: Solo métodos relacionados con cálculo
  - `ICalculoInteresFactory`: Solo métodos relacionados con creación

### Dependency Inversion Principle (DIP)
- Las clases dependen de abstracciones, no de concreciones
- `ServicioCalculoCuotas` depende de `ICalculoInteresFactory`, no de implementaciones específicas

## Estructura del Proyecto

```
src/
├── abstractions/
│   ├── ICalculoInteres.cs
│   └── ICalculoInteresFactory.cs
├── enums/
│   ├── BancoEmisor.cs
│   └── MarcaTarjeta.cs
├── factories/
│   └── CalculoInteresFactory.cs
├── models/
│   ├── Producto.cs
│   ├── ResultadoCalculo.cs
│   └── Tarjeta.cs
├── services/
│   └── ServicioCalculoCuotas.cs
└── strategies/
    ├── AmericanExpressCalculoStrategy.cs
    ├── MasterCardCalculoStrategy.cs
    └── VisaCalculoStrategy.cs
```

## Funcionalidades

### Cálculo de Cuotas
- Selección de producto del catálogo
- Selección de marca de tarjeta y banco emisor
- Cálculo con tasas específicas por marca y banco
- Aplicación de factores variables (día de la semana)

### Comparación de Marcas
- Compara todas las marcas disponibles para el mismo producto
- Muestra resultados ordenados por conveniencia (menor precio total)

### Múltiples Opciones
- Calcula diferentes opciones de cuotas para el mismo producto y tarjeta
- Permite al usuario comparar 1, 3, 6, 9, 12, 18, 24 cuotas

## Fórmulas de Cálculo

### Visa
- **Método**: Interés compuesto
- **Especial**: 5% descuento para 6+ cuotas
- **Factor día**: Varía según día de la semana

### MasterCard
- **Método**: Interés simple
- **Especial**: 3% recargo para 12+ cuotas
- **Escalones**: Tasas por rangos de cuotas

### American Express
- **Método**: Sistema francés (cuotas fijas)
- **Especial**: 2% descuento para compras >$50,000
- **Factor día**: Más conservador, descuento los miércoles

## Uso

### Ejecutar la aplicación interactiva
```bash
dotnet run
```

### Ejecutar pruebas automáticas
```bash
dotnet run -- --test
```

### Compilar el proyecto
```bash
dotnet build
```

## Ejemplo de Salida

```
=== Opciones para Notebook Gaming con Visa ===

1 cuotas: $150525.00/mes - Total: $150525.00
3 cuotas: $52008.75/mes - Total: $156026.25
6 cuotas: $25889.17/mes - Total: $155335.05
12 cuotas: $18471.02/mes - Total: $221652.24
```

## Extensibilidad

Para agregar una nueva marca de tarjeta:

1. Crear nueva estrategia implementando `ICalculoInteres`
2. Registrarla en `CalculoInteresFactory`
3. Agregar la marca al enum `MarcaTarjeta`

Sin necesidad de modificar código existente, cumpliendo con OCP.

