using point_2.src.Models;

namespace point_2.src.Interfaces;

public interface IInstallmentCalculator
{
    InstallmentCalculationResult Calculate(
        IProduct product,
        ICreditCard card,
        int installments,
        IInterestCalculationStrategy strategy
        );
}
