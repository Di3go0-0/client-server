using point_3.src.Algorithms;
using point_3.src.Core;
using point_3.src.Services;

class Program
{
    static void Main()
    {
        var provider = new AlgorithmProvider();

        // Registro dinámico de algoritmos
        provider.RegisterAlgorithm("SimpleDeterministic", () => new SimpleDeterministicAlgorithm());
        provider.RegisterAlgorithm("AdvancedStochastic", () => new AdvancedStochasticAlgorithm());
        provider.RegisterAlgorithm("CustomClientVersion", () => new SimpleDeterministicAlgorithm("LoadBalancing"));

        var factory = new InventorySystemFactory(provider);

        var inventory = new Inventory();
        inventory.AddProduct(new Product { Name = "Laptop", Quantity = 5, Price = 1200 });
        inventory.AddWarehouse(new Warehouse { Name = "Central", Capacity = 100 });

        // Crear versión dinámica
        var system = factory.CreateSystem("AdvancedStochastic", inventory);

        system.GenerateReport();
        system.RunOptimization();
    }
}

