using point_2.src.Interfaces;
using point_2.src.Models;

namespace point_2.src.Services;


public class PaymentProcessor
{
    private readonly IInstallmentCalculator _calculator;
    private readonly IEnumerable<IInterestCalculationStrategy> _strategies;

    public PaymentProcessor(IInstallmentCalculator calculator, IEnumerable<IInterestCalculationStrategy> strategies)
    {
        _calculator = calculator;
        _strategies = strategies;
    }

    public InstallmentCalculationResult ProcessPayment(IProduct product, ICreditCard card, int installments)
    {
        var strategy = _strategies.FirstOrDefault(s => s.CanHandle(card));

        if (strategy == null)
            throw new InvalidOperationException("No strategy found for this card.");

        return _calculator.Calculate(product, card, installments, strategy);
    }
}

