using point_3.src.Interfaces;

namespace point_3.src.Core;

// SRP: Maneja la colección de productos y almacenes
// DIP: Depende de las interfaces IProduct e IWarehouse, no de las implementaciones concretas
public class Inventory
{
    private readonly List<IProduct> _products;
    private readonly List<IWarehouse> _warehouses;

    public Inventory()
    {
        _products = new List<IProduct>();
        _warehouses = new List<IWarehouse>();
    }

    public void AddProduct(IProduct product)
    {
        _products.Add(product);
    }

    public void RemoveProduct(IProduct product)
    {
        _products.Remove(product);
    }

    public void AddWarehouse(IWarehouse warehouse)
    {
        _warehouses.Add(warehouse);
    }

    public void RemoveWarehouse(IWarehouse warehouse)
    {
        _warehouses.Remove(warehouse);
    }

    public List<IProduct> GetProducts()
    {
        return _products.ToList(); // Retorna una copia para evitar modificación externa directa
    }

    public List<IWarehouse> GetWarehouses()
    {
        return _warehouses.ToList(); // Retorna una copia
    }
}
