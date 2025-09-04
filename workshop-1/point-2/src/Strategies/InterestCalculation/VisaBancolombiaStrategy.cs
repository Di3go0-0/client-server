using point_2.src.Interfaces;
using point_2.src.Models;

namespace point_2.src.Strategies.InterestCalculation
{
    public class VisaBancolombiaStrategy : IInterestCalculationStrategy
    {
        public decimal CalculateInterestRate(ICreditCard card, int installments)
        {
            // Dummy implementation for Visa Bancolombia.
            // In a real scenario, this would involve complex logic,
            // possibly external service calls, or database lookups
            // based on card type, bank, installments, and even day of the week.
            if (card.Brand == "Visa" && card.IssuerBank == "Bancolombia")
            {
                if (installments <= 3) return 0.01m; // 1%
                if (installments <= 6) return 0.02m; // 2%
                return 0.03m; // 3%
            }
            return 0.05m; // Default for others if this strategy is somehow applied generally.
        }
    }
}
