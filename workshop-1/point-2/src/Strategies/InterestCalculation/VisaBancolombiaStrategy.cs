using point_2.src.Interfaces;
using point_2.src.Models;

namespace point_2.src.Strategies.InterestCalculation;

public class VisaBancolombiaStrategy : IInterestCalculationStrategy
{
    public bool CanHandle(ICreditCard card)
    {
        return card.Brand.Equals("Visa", StringComparison.OrdinalIgnoreCase) &&
               card.IssuerBank.Equals("Bancolombia", StringComparison.OrdinalIgnoreCase);
    }

    public decimal CalculateInterestRate(ICreditCard card, int installments)
    {
        // 2% si es domingo, 3% en otros días
        return DateTime.Now.DayOfWeek == DayOfWeek.Sunday ? 0.02m : 0.03m;
    }
}
