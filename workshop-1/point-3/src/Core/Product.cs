namespace point_3.src.Core;
// SRP: Representa un producto en el inventario
public class Product
{
    public required string Name { get; set; }
    public int Quantity { get; set; }
    public double Price { get; set; }
}
