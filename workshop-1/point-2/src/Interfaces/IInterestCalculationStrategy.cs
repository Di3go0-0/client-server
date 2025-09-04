namespace point_2.src.Interfaces;

public interface IInterestCalculationStrategy
{
    bool CanHandle(ICreditCard card);
    decimal CalculateInterestRate(ICreditCard card, int installments);
}

