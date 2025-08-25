namespace point_2.Models;

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

    public bool IsValid()
    {
        return Id > 0 && !string.IsNullOrWhiteSpace(Name) && CashPrice > 0;
    }
}

