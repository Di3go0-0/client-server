using point_3.src.Core;

namespace point_3.src.Algorithms;
public class SimpleDeterministicAlgorithm : IAlgorithm
{
    public string Name { get; private set; }

    public SimpleDeterministicAlgorithm()
    {
        Name = "SimpleDeterministic";
    }

    public SimpleDeterministicAlgorithm(string name)
    {
        Name = name;
    }

    public void Execute(Inventory inventory)
    {
        Console.WriteLine($"[{Name}] Ejecutando algoritmo determinístico simple para el inventario...");
        foreach (var product in inventory.GetProducts())
        {
            if (product.Quantity < 10)
            {
                product.Quantity = 10;
                Console.WriteLine($"  - Ajustado producto '{product.Name}' a 10 unidades.");
            }
        }
        foreach (var warehouse in inventory.GetWarehouses())
        {
            Console.WriteLine($"  - Verificando almacén: {warehouse.Name}");
        }
        Console.WriteLine($"[{Name}] Optimización determinística simple completada.");
    }
}
