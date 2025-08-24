namespace point_2.Models;

/// <summary>
/// Representa un producto que puede ser comprado con tarjeta de crédito
/// Cumple con SRP: Solo se encarga de mantener información del producto
/// </summary>
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal CashPrice { get; set; }
    public string Description { get; set; } = string.Empty;

    public Product() { }

    public Product(int id, string name, decimal cashPrice, string description = "")
    {
        Id = id;
        Name = name;
        CashPrice = cashPrice;
        Description = description;
    }

    /// <summary>
    /// Valida que el producto tenga datos válidos
    /// </summary>
    public bool IsValid()
    {
        return Id > 0 && !string.IsNullOrWhiteSpace(Name) && CashPrice > 0;
    }
}

