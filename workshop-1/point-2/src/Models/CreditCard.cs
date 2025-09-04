using point_2.src.Interfaces;

namespace point_2.src.Models
{
    public class CreditCard : ICreditCard
    {
        public string Brand { get; }
        public string IssuerBank { get; }

        public CreditCard(string brand, string issuerBank)
        {
            Brand = brand;
            IssuerBank = issuerBank;
        }
    }
}
