using point_2.src.Interfaces;

namespace point_2.src.Models
{
    public class Product : IProduct
    {
        public string Name { get; }
        public decimal BasePrice { get; }

        public Product(string name, decimal basePrice)
        {
            Name = name;
            BasePrice = basePrice;
        }
    }
}
