# 💳 Cálculo de Precios en Cuotas

## 📌 Descripción del problema

Se desea implementar un sistema que calcule el **precio en cuotas** de un producto dependiendo de:

- **Cantidad de cuotas** seleccionadas.
- **Marca de la tarjeta de crédito** (ej: Visa, Master).
- **Banco emisor de la tarjeta** (ej: Bancolombia, BCS).
- Fórmulas específicas para cada tarjeta/banco (ej: intereses diferentes por número de cuotas).
- Los intereses incluso pueden depender de condiciones externas (ej: día de la semana).

El sistema debe mostrar al usuario:

- El **precio al contado** del producto.
- El **precio total en cuotas** (incluyendo intereses).
- El **valor de cada cuota mensual**.

---

## ✅ Solución propuesta

Para resolver este problema, se aplicaron principios **SOLID** y se diseñó un sistema extensible usando **interfaces**, **estrategias de cálculo de interés** y un **procesador de pagos**.

### 🛠 Diseño

- **Interfaces**:
  - `IProduct`: Representa un producto con su precio base.
  - `ICreditCard`: Representa una tarjeta de crédito con su marca y banco emisor.
  - `IInterestCalculationStrategy`: Define cómo calcular la tasa de interés según la tarjeta, banco y número de cuotas.
  - `IInstallmentCalculator`: Define cómo calcular el precio en cuotas.

- **Modelos**:
  - `Product`: Implementa un producto concreto.
  - `CreditCard`: Implementa una tarjeta concreta.
  - `InstallmentCalculationResult`: Contiene el resultado del cálculo (precio al contado, total en cuotas, valor de cada cuota, tasa aplicada).

- **Servicios**:
  - `InstallmentCalculator`: Calcula los valores en cuotas aplicando la estrategia de interés correspondiente.
  - `PaymentProcessor`: Orquesta el cálculo escogiendo la estrategia adecuada según la tarjeta y el banco.

- **Estrategias** (ejemplos implementados):
  - `VisaBancolombiaStrategy`: Calcula intereses para tarjetas **Visa Bancolombia**.
  - `MasterBCSStrategy`: Calcula intereses para tarjetas **Master BCS**.

---

## 📂 Estructura del proyecto

```

src
├── Interfaces
│ ├── ICreditCard.cs
│ ├── IInstallmentCalculator.cs
│ ├── IInterestCalculationStrategy.cs
│ └── IProduct.cs
├── Models
│ ├── CreditCard.cs
│ ├── InstallmentCalculationResult.cs
│ └── Product.cs
├── Services
│ ├── InstallmentCalculator.cs
│ └── PaymentProcessor.cs
└── Strategies
└── InterestCalculation
├── MasterBCSStrategy.cs
└── VisaBancolombiaStrategy.cs

```

---

## ▶️ Ejemplo de uso

```csharp
var calculator = new InstallmentCalculator();

var strategies = new List<IInterestCalculationStrategy>
{
    new VisaBancolombiaStrategy(),
    new MasterBCSStrategy()
};

var processor = new PaymentProcessor(calculator, strategies);

var product = new Product("Laptop Gamer", 3000m);
var card = new CreditCard("Visa", "Bancolombia");

var result = processor.ProcessPayment(product, card, 12);

Console.WriteLine(result);
```

---

## 🖥️ Ejemplo de salida

```
Spot Price: $3,000.00
Installment Price: $4,080.00 (Interest Rate: 3.00 %)
Monthly Installment Amount: $340.00
```

---

## 🚀 Beneficios del diseño

- **Cumple con SOLID**:
  - Cada clase tiene una única responsabilidad.
  - Nuevas estrategias de interés pueden añadirse sin modificar código existente (**Open/Closed Principle**).
  - Uso de interfaces facilita la inyección de dependencias.

- **Extensible y mantenible**: agregar un nuevo banco o marca de tarjeta solo requiere implementar una nueva estrategia.
- **Legible y modular**: la lógica está separada en capas (Modelos, Interfaces, Servicios, Estrategias).
