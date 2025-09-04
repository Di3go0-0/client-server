using System;
using System.Collections.Generic;
using point_2.src.Interfaces;
using point_2.src.Models;
using point_2.src.Services;
using point_2.src.Strategies.InterestCalculation;

namespace Point2
{
    class Program
    {
        static void Main(string[] args)
        {
            // 1. Creamos el cálculo de cuotas
            IInstallmentCalculator calculator = new InstallmentCalculator();

            // 2. Registramos las estrategias de interés
            var strategies = new List<IInterestCalculationStrategy>
            {
                new VisaBancolombiaStrategy(),
                new MasterBCSStrategy()
            };

            // 3. Creamos el procesador de pagos con inyección de dependencias
            var processor = new PaymentProcessor(calculator, strategies);

            // 4. Producto a comprar
            var product = new Product("Laptop Gamer", 3000);

            // 5. Tarjeta de crédito
            var card = new CreditCard("Visa", "Bancolombia");

            // 6. Procesar pago con 12 cuotas
            var result = processor.ProcessPayment(product, card, 12);

            // 7. Mostrar resultados
            Console.WriteLine("=== Resultado del pago ===");
            Console.WriteLine($"Producto: {product.Name}");
            Console.WriteLine($"Precio base: {result.SpotPrice:C}");
            Console.WriteLine($"Banco: {card.IssuerBank}, Marca: {card.Brand}");
            Console.WriteLine($"Número de cuotas: 12");
            Console.WriteLine($"Tasa aplicada: {result.InterestRateApplied:P}");
            Console.WriteLine($"Precio en cuotas: {result.InstallmentPrice:C}");
            Console.WriteLine($"Valor cuota mensual: {result.MonthlyInstallmentAmount:C}");
        }
    }
}

