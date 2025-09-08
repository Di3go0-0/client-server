using point_3.src.Interfaces;

namespace point_3.src.Core;

// SRP: Representa un almacén en el inventario
// DIP: Implementa la interfaz IWarehouse para desacoplar dependencias
public class Warehouse : IWarehouse
{
    public required string Name { get; set; }
    public int Capacity { get; set; }
}
