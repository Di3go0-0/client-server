using point_3.src.Core;

namespace point_3.src.Algorithms;
public class AdvancedStochasticAlgorithm : IAlgorithm
{
    public string Name => "AdvancedStochastic";

    public void Execute(Inventory inventory)
    {
        Console.WriteLine($"[{Name}] Ejecutando algoritmo estocástico avanzado para el inventario...");
        var random = new Random();

        foreach (var product in inventory.GetProducts())
        {
            if (random.NextDouble() < 0.1)
            {
                int adjustment = random.Next(-5, 5);
                product.Quantity += adjustment;
                if (product.Quantity < 0) product.Quantity = 0;
                Console.WriteLine($"  - Simulación: Ajustado '{product.Name}' por {adjustment}. Nueva cantidad: {product.Quantity}");
            }
        }

        // También podría rebalancear entre almacenes basado en probabilidades
        var warehouses = inventory.GetWarehouses();
        if (warehouses.Any())
        {
            var targetWarehouse = warehouses[random.Next(warehouses.Count)];
            Console.WriteLine($"  - Sugiriendo rebalanceo para el almacén: {targetWarehouse.Name}");
        }

        Console.WriteLine($"[{Name}] Optimización estocástica avanzada completada.");
    }
}
