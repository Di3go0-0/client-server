namespace point_3.src.Core;
public class Inventory
{
    private readonly List<Product> _products;
    private readonly List<Warehouse> _warehouses;

    public Inventory()
    {
        _products = new List<Product>();
        _warehouses = new List<Warehouse>();
    }

    public void AddProduct(Product product)
    {
        _products.Add(product);
    }

    public void RemoveProduct(Product product)
    {
        _products.Remove(product);
    }

    public void AddWarehouse(Warehouse warehouse)
    {
        _warehouses.Add(warehouse);
    }

    public void RemoveWarehouse(Warehouse warehouse)
    {
        _warehouses.Remove(warehouse);
    }

    public List<Product> GetProducts()
    {
        return _products.ToList(); // Retorna una copia para evitar modificación externa directa
    }

    public List<Warehouse> GetWarehouses()
    {
        return _warehouses.ToList(); // Retorna una copia
    }
}
