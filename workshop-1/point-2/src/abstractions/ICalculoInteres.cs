using point_2.Models;

namespace point_2.Abstractions;

public interface IInterestCalculation
{
    CalculationResult CalculateInstallments(Product product, Card card, int installmentCount);

    decimal GetInterestRate(int installmentCount, Card card);

    bool CanCalculate(Card card);
}

