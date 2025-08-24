namespace point_2.Models;

/// <summary>
/// Representa el resultado del cálculo de cuotas para un producto
/// Cumple con SRP: Solo se encarga de contener el resultado del cálculo
/// </summary>
public class CalculationResult
{
    public decimal CashPrice { get; set; }
    public decimal InstallmentPrice { get; set; }
    public decimal InstallmentAmount { get; set; }
    public int InstallmentCount { get; set; }
    public decimal InterestRate { get; set; }
    public decimal InterestAmount { get; set; }
    public string CalculationDetail { get; set; } = string.Empty;

    public CalculationResult() { }

    public CalculationResult(
        decimal cashPrice,
        decimal installmentPrice,
        decimal installmentAmount,
        int installmentCount,
        decimal interestRate,
        string calculationDetail = "")
    {
        CashPrice = cashPrice;
        InstallmentPrice = installmentPrice;
        InstallmentAmount = installmentAmount;
        InstallmentCount = installmentCount;
        InterestRate = interestRate;
        InterestAmount = installmentPrice - cashPrice;
        CalculationDetail = calculationDetail;
    }

    /// <summary>
    /// Calcula el porcentaje de recargo sobre el precio al contado
    /// </summary>
    public decimal SurchargePercentage => CashPrice > 0 ? ((InstallmentPrice - CashPrice) / CashPrice) * 100 : 0;

    /// <summary>
    /// Genera un resumen legible del resultado
    /// </summary>
    public string GenerateSummary()
    {
        return $"Precio al contado: ${CashPrice:F2}\n" +
               $"Precio en {InstallmentCount} cuotas: ${InstallmentPrice:F2}\n" +
               $"Monto por cuota: ${InstallmentAmount:F2}\n" +
               $"Tasa de interés: {InterestRate:F2}%\n" +
               $"Recargo total: ${InterestAmount:F2} ({SurchargePercentage:F2}%)\n" +
               (!string.IsNullOrWhiteSpace(CalculationDetail) ? $"Detalle: {CalculationDetail}" : "");
    }
}

