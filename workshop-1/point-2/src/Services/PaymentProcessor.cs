using System.Collections.Generic;
using System.Linq;
using point_2.src.Interfaces;
using point_2.src.Models;

namespace point_2.src.Services
{
    public class PaymentProcessor
    {
        private readonly IInstallmentCalculator _calculator;
        private readonly IEnumerable<IInterestCalculationStrategy> _strategies;

        public PaymentProcessor(IInstallmentCalculator calculator, IEnumerable<IInterestCalculationStrategy> strategies)
        {
            _calculator = calculator ?? throw new ArgumentNullException(nameof(calculator));
            _strategies = strategies ?? throw new ArgumentNullException(nameof(strategies));
        }

        public InstallmentCalculationResult ProcessPayment(IProduct product, ICreditCard card, int installments)
        {
            // Find the most appropriate strategy for the given card.
            // This is a simplified approach. In a real system, you might have a
            // more sophisticated strategy resolver (e.g., using a factory or a chain of responsibility).
            var strategy = _strategies.FirstOrDefault(s => s.GetType().Name.Contains(card.Brand) && s.GetType().Name.Contains(card.IssuerBank))
                           ?? _strategies.FirstOrDefault(); // Fallback to a default strategy if no specific one is found

            if (strategy == null)
            {
                throw new InvalidOperationException("No interest calculation strategy found.");
            }

            return _calculator.Calculate(product, card, installments, strategy);
        }
    }
}
