using point_3.src.Core;
using point_3.src.Interfaces;

namespace point_3.src.Services;

public class InventorySystemFactory
{
    private readonly IAlgorithmProvider _algorithmProvider;

    public InventorySystemFactory(IAlgorithmProvider algorithmProvider)
    {
        _algorithmProvider = algorithmProvider ?? throw new ArgumentNullException(nameof(algorithmProvider));
    }

    public InventorySystem CreateSystem(string systemVersion, Inventory inventory)
    {
        var algorithm = _algorithmProvider.GetAlgorithm(systemVersion);

        if (algorithm is null)
        {
            throw new ArgumentException(
                $"No se encontró un algoritmo registrado para la versión '{systemVersion}'.",
                nameof(systemVersion)
            );
        }

        return new InventorySystem(inventory, algorithm);
    }
}


