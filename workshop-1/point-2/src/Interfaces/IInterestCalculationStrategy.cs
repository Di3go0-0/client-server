using point_2.src.Models;

namespace point_2.src.Interfaces
{
    public interface IInterestCalculationStrategy
    {
        decimal CalculateInterestRate(ICreditCard card, int installments);
    }
}
