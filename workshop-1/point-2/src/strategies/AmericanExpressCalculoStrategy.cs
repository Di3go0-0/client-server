using point_2.Abstractions;
using point_2.Models;
using point_2.Enums;

namespace point_2.Strategies;

/// <summary>
/// Estrategia de cálculo de intereses para tarjetas American Express
/// Cumple con SRP: Solo se encarga del cálculo específico de American Express
/// Cumple con OCP: Extensible sin modificar código existente
/// Cumple con LSP: Puede ser sustituida por cualquier otra implementación de ICalculoInteres
/// </summary>
public class AmericanExpressCalculationStrategy : IInterestCalculation
{
    // American Express generalmente tiene tasas más altas pero mejores beneficios
    private readonly Dictionary<IssuingBank, decimal> _baseRatesByBank = new()
    {
        { IssuingBank.NationBank, 3.5m },
        { IssuingBank.SantanderBank, 4.0m },
        { IssuingBank.BBVA, 3.8m },
        { IssuingBank.GaliciaBank, 4.2m },
        { IssuingBank.HSBC, 3.9m },
        { IssuingBank.Macro, 4.1m },
        { IssuingBank.FrenchBank, 3.7m },
        { IssuingBank.ItauBank, 4.0m },
        { IssuingBank.CityBank, 3.6m },
        { IssuingBank.SupervielleBank, 4.3m }
    };

    public CalculationResult CalculateInstallments(Product product, Card card, int installmentCount)
    {
        if (!CanCalculate(card))
            throw new ArgumentException("Esta estrategia solo funciona con tarjetas American Express");

        if (installmentCount <= 0)
            throw new ArgumentException("La cantidad de cuotas debe ser mayor a 0");

        var interestRate = GetInterestRate(installmentCount, card);

        // Fórmula específica de American Express: Interés francés (cuotas fijas)
        var monthlyRate = interestRate / 100;
        var interestFactor = (decimal)Math.Pow((double)(1 + monthlyRate), installmentCount);
        var installmentAmount = (product.CashPrice * monthlyRate * interestFactor) / (interestFactor - 1);
        var installmentPrice = installmentAmount * installmentCount;

        // American Express ofrece descuentos por volumen alto
        if (product.CashPrice > 50000m)
        {
            var volumeDiscount = 0.98m; // 2% de descuento
            installmentPrice *= volumeDiscount;
            installmentAmount = installmentPrice / installmentCount;
        }

        var calculationDetail = $"American Express - Banco {card.IssuingBank} - Tasa: {interestRate:F2}%" +
                               (product.CashPrice > 50000m ? " (Con descuento 2% por volumen alto)" : "");

        return new CalculationResult(
            product.CashPrice,
            installmentPrice,
            installmentAmount,
            installmentCount,
            interestRate,
            calculationDetail);
    }

    public decimal GetInterestRate(int installmentCount, Card card)
    {
        var baseRate = _baseRatesByBank.GetValueOrDefault(card.IssuingBank, 4.0m);

        // American Express tiene tasas progresivas pero con topes más bajos
        var incrementPerInstallment = Math.Min(installmentCount * 0.08m, 0.8m); // Máximo 0.8% de incremento

        // Factor del día de la semana para American Express
        var dayOfWeekFactor = GetDayOfWeekFactor();

        return baseRate + incrementPerInstallment + dayOfWeekFactor;
    }

    public bool CanCalculate(Card card)
    {
        return card.Brand == CardBrand.AmericanExpress;
    }

    /// <summary>
    /// American Express tiene factores más conservadores por día
    /// </summary>
    private decimal GetDayOfWeekFactor()
    {
        var dayOfWeek = DateTime.Now.DayOfWeek;
        return dayOfWeek switch
        {
            DayOfWeek.Monday => 0.05m,
            DayOfWeek.Tuesday => 0.0m,
            DayOfWeek.Wednesday => -0.05m, // Descuento los miércoles
            DayOfWeek.Thursday => 0.0m,
            DayOfWeek.Friday => 0.1m,
            DayOfWeek.Saturday => 0.15m,
            DayOfWeek.Sunday => 0.2m,
            _ => 0.0m
        };
    }
}

