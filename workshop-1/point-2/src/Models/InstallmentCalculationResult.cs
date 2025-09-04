namespace point_2.src.Models
{
    public class InstallmentCalculationResult
    {
        public decimal SpotPrice { get; }
        public decimal InstallmentPrice { get; }
        public decimal MonthlyInstallmentAmount { get; }
        public decimal InterestRateApplied { get; }

        public InstallmentCalculationResult(
            decimal spotPrice,
            decimal installmentPrice,
            decimal monthlyInstallmentAmount,
            decimal interestRateApplied
            )
        {
            SpotPrice = spotPrice;
            InstallmentPrice = installmentPrice;
            MonthlyInstallmentAmount = monthlyInstallmentAmount;
            InterestRateApplied = interestRateApplied;
        }

        public override string ToString()
        {
            return $"Spot Price: {SpotPrice:C}\n" +
                   $"Installment Price: {InstallmentPrice:C} (Interest Rate: {InterestRateApplied:P})\n" +
                   $"Monthly Installment Amount: {MonthlyInstallmentAmount:C}";
        }
    }
}
