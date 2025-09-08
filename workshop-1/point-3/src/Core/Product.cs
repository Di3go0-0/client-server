using point_3.src.Interfaces;

namespace point_3.src.Core;

// SRP: Representa un producto en el inventario
// DIP: Implementa la interfaz IProduct para desacoplar dependencias
public class Product : IProduct
{
    public required string Name { get; set; }
    public int Quantity { get; set; }
    public double Price { get; set; }
}
