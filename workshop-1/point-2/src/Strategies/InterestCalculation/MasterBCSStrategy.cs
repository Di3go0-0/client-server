using point_2.src.Interfaces;
using point_2.src.Models;

namespace point_2.src.Strategies.InterestCalculation;

public class MasterBCSStrategy : IInterestCalculationStrategy
{
    public bool CanHandle(ICreditCard card)
    {
        return card.Brand.Equals("Master", StringComparison.OrdinalIgnoreCase) &&
               card.IssuerBank.Equals("BCS", StringComparison.OrdinalIgnoreCase);
    }

    public decimal CalculateInterestRate(ICreditCard card, int installments)
    {
        // 4% si hay más de 6 cuotas, 5% en caso contrario
        return installments > 6 ? 0.04m : 0.05m;
    }
}
