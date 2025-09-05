using point_3.src.Algorithms;
using point_3.src.Core;

namespace point_3.src.Services;
public class InventorySystem
{
    private readonly Inventory _inventory;
    private IAlgorithm _currentAlgorithm;

    public InventorySystem(Inventory inventory, IAlgorithm initialAlgorithm)
    {
        _inventory = inventory ?? throw new ArgumentNullException(nameof(inventory));
        _currentAlgorithm = initialAlgorithm ?? throw new ArgumentNullException(nameof(initialAlgorithm));
        Console.WriteLine($"Inventario inicializado. Algoritmo actual: {_currentAlgorithm.Name}");
    }

    public void SetAlgorithm(IAlgorithm newAlgorithm)
    {
        _currentAlgorithm = newAlgorithm ?? throw new ArgumentNullException(nameof(newAlgorithm));
        Console.WriteLine($"Algoritmo de optimización cambiado a: {_currentAlgorithm.Name}");
    }

    public void RunOptimization()
    {
        Console.WriteLine($"\nIniciando optimización del inventario con algoritmo: {_currentAlgorithm.Name}");
        _currentAlgorithm.Execute(_inventory);
        Console.WriteLine("Optimización finalizada.");
    }

    public void GenerateReport()
    {
        Console.WriteLine("\n--- Reporte de Inventario Actual ---");
        Console.WriteLine($"Productos en inventario ({_inventory.GetProducts().Count}):");
        foreach (var product in _inventory.GetProducts())
        {
            Console.WriteLine($"  - {product.Name}: {product.Quantity} unidades (${product.Price}/unidad)");
        }
        Console.WriteLine($"Almacenes disponibles ({_inventory.GetWarehouses().Count}):");
        foreach (var warehouse in _inventory.GetWarehouses())
        {
            Console.WriteLine($"  - {warehouse.Name} (Capacidad: {warehouse.Capacity})");
        }
        Console.WriteLine("------------------------------------");
    }

    public string GetCurrentAlgorithmName()
    {
        return _currentAlgorithm.Name;
    }
}
