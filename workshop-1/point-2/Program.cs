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
            Console.WriteLine("Welcome to the Installment Payment Calculator!");

            // Setup Dependencies (typically done with an IoC container like Autofac, SimpleInjector, etc.)
            // For this example, we're doing it manually.
            IInstallmentCalculator calculator = new InstallmentCalculator();

            // Register all available strategies
            IEnumerable<IInterestCalculationStrategy> strategies = new List<IInterestCalculationStrategy>
            {
                new VisaBancolombiaStrategy(),
                new MasterBCSStrategy()
                // Add more strategies here as needed
            };

            PaymentProcessor processor = new PaymentProcessor(calculator, strategies);

            // --- User Input Simulation ---

            // 1. Select a Product
            IProduct book = new Product("The Art of Programming", 100.00m);
            IProduct electronics = new Product("Wireless Headphones", 250.00m);
            IProduct music = new Product("Music Album (Digital)", 15.00m);

            Console.WriteLine("\nAvailable Products:");
            Console.WriteLine($"1. {book.Name} ({book.BasePrice:C})");
            Console.WriteLine($"2. {electronics.Name} ({electronics.BasePrice:C})");
            Console.WriteLine($"3. {music.Name} ({music.BasePrice:C})");

            Console.Write("Enter product number: ");
            IProduct selectedProduct = null;
            string productChoice = Console.ReadLine();
            switch (productChoice)
            {
                case "1": selectedProduct = book; break;
                case "2": selectedProduct = electronics; break;
                case "3": selectedProduct = music; break;
                default:
                    Console.WriteLine("Invalid product choice. Exiting.");
                    return;
            }

            // 2. Enter Credit Card details
            Console.Write("Enter Credit Card Brand (e.g., Visa, Master): ");
            string cardBrand = Console.ReadLine();

            Console.Write("Enter Credit Card Issuer Bank (e.g., Bancolombia, BCS): ");
            string issuerBank = Console.ReadLine();

            ICreditCard creditCard = new CreditCard(cardBrand, issuerBank);

            // 3. Enter number of installments
            Console.Write("Enter number of installments: ");
            if (!int.TryParse(Console.ReadLine(), out int installments))
            {
                Console.WriteLine("Invalid number of installments. Exiting.");
                return;
            }

            // --- Process Payment ---
            try
            {
                InstallmentCalculationResult result = processor.ProcessPayment(selectedProduct, creditCard, installments);
                Console.WriteLine("\n--- Calculation Result ---");
                Console.WriteLine($"Product: {selectedProduct.Name}");
                Console.WriteLine($"Card: {creditCard.Brand} {creditCard.IssuerBank}");
                Console.WriteLine($"Installments: {installments}");
                Console.WriteLine(result.ToString());
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An unexpected error occurred: {ex.Message}");
            }

            Console.WriteLine("\nPress any key to exit.");
            Console.ReadKey();
        }
    }
}
