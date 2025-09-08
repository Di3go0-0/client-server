namespace point_3.src.Interfaces;

// Interfaz que define el contrato para un producto
public interface IProduct
{
    string Name { get; set; }
    int Quantity { get; set; }
    double Price { get; set; }
}

