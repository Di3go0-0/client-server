using point_2.src.Interfaces;
using point_2.src.Models;

namespace point_2.src.Services
{
    public class InstallmentCalculator : IInstallmentCalculator
    {
        public InstallmentCalculationResult Calculate(IProduct product, ICreditCard card, int installments, IInterestCalculationStrategy strategy)
        {
            if (installments <= 0)
            {
                throw new ArgumentException("Number of installments must be greater than zero.");
            }

            // Calculate the interest rate using the provided strategy
            decimal interestRate = strategy.CalculateInterestRate(card, installments);

            // Calculate the total price with interest
            decimal totalInterest = product.BasePrice * interestRate * installments; // Simple interest for demonstration
            decimal installmentPrice = product.BasePrice + totalInterest;

            // Calculate the monthly installment amount
            decimal monthlyInstallmentAmount = installmentPrice / installments;

            return new InstallmentCalculationResult(
                spotPrice: product.BasePrice,
                installmentPrice: installmentPrice,
                monthlyInstallmentAmount: monthlyInstallmentAmount,
                interestRateApplied: interestRate
            );
        }
    }
}
