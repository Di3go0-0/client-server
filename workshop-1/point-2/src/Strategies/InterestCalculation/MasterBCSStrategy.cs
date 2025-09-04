using point_2.src.Interfaces;
using point_2.src.Models;

namespace point_2.src.Strategies.InterestCalculation
{
    public class MasterBCSStrategy : IInterestCalculationStrategy
    {
        public decimal CalculateInterestRate(ICreditCard card, int installments)
        {
            // Dummy implementation for Master BCS.
            // This could also depend on the day of the week, as mentioned in the requirements.
            // For simplicity, let's just make it dependent on installments here.
            if (card.Brand == "Master" && card.IssuerBank == "BCS")
            {
                if (installments <= 6) return 0.015m; // 1.5%
                return 0.025m; // 2.5%
            }
            return 0.04m; // Default for others
        }
    }
}
