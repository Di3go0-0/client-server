using point_2.Abstractions;
using point_2.Models;
using point_2.Enums;

namespace point_2.Strategies;

/// <summary>
/// Estrategia de cálculo de intereses para tarjetas MasterCard
/// Cumple con SRP: Solo se encarga del cálculo específico de MasterCard
/// Cumple con OCP: Extensible sin modificar código existente
/// Cumple con LSP: Puede ser sustituida por cualquier otra implementación de ICalculoInteres
/// </summary>
public class MasterCardCalculationStrategy : IInterestCalculation
{
    // Tasas base para MasterCard (generalmente más altas que Visa)
    private readonly Dictionary<IssuingBank, decimal> _baseRatesByBank = new()
    {
        { IssuingBank.NationBank, 3.0m },
        { IssuingBank.SantanderBank, 3.5m },
        { IssuingBank.BBVA, 3.3m },
        { IssuingBank.GaliciaBank, 3.7m },
        { IssuingBank.HSBC, 3.4m },
        { IssuingBank.Macro, 3.6m },
        { IssuingBank.FrenchBank, 3.2m },
        { IssuingBank.ItauBank, 3.5m },
        { IssuingBank.CityBank, 3.1m },
        { IssuingBank.SupervielleBank, 3.8m }
    };

    public CalculationResult CalculateInstallments(Product product, Card card, int installmentCount)
    {
        if (!CanCalculate(card))
            throw new ArgumentException("Esta estrategia solo funciona con tarjetas MasterCard");

        if (installmentCount <= 0)
            throw new ArgumentException("La cantidad de cuotas debe ser mayor a 0");

        var interestRate = GetInterestRate(installmentCount, card);

        // Fórmula específica de MasterCard: Interés simple con recargo fijo
        var interestAmount = product.CashPrice * (interestRate / 100) * installmentCount;
        var installmentPrice = product.CashPrice + interestAmount;
        var installmentAmountValue = installmentPrice / installmentCount;

        // MasterCard tiene un recargo adicional por cuotas extendidas
        if (installmentCount > 12)
        {
            var extendedSurcharge = installmentPrice * 0.03m; // 3% adicional
            installmentPrice += extendedSurcharge;
            installmentAmountValue = installmentPrice / installmentCount;
        }

        var calculationDetail = $"MasterCard - Banco {card.IssuingBank} - Tasa: {interestRate:F2}%" +
                               (installmentCount > 12 ? " (Con recargo 3% por +12 cuotas)" : "");

        return new CalculationResult(
            product.CashPrice,
            installmentPrice,
            installmentAmountValue,
            installmentCount,
            interestRate,
            calculationDetail);
    }

    public decimal GetInterestRate(int installmentCount, Card card)
    {
        var baseRate = _baseRatesByBank.GetValueOrDefault(card.IssuingBank, 3.5m);

        // MasterCard usa escalones de tasas
        var incrementPerInstallment = installmentCount switch
        {
            <= 3 => 0.0m,
            <= 6 => 0.2m,
            <= 12 => 0.5m,
            <= 18 => 0.8m,
            _ => 1.2m
        };

        // Aplicar factor del día de la semana
        var dayOfWeekFactor = GetDayOfWeekFactor();

        return baseRate + incrementPerInstallment + dayOfWeekFactor;
    }

    public bool CanCalculate(Card card)
    {
        return card.Brand == CardBrand.MasterCard;
    }

    /// <summary>
    /// MasterCard tiene factores diferentes según el día
    /// </summary>
    private decimal GetDayOfWeekFactor()
    {
        var dayOfWeek = DateTime.Now.DayOfWeek;
        return dayOfWeek switch
        {
            DayOfWeek.Monday => 0.0m,
            DayOfWeek.Tuesday => 0.1m,
            DayOfWeek.Wednesday => 0.05m,
            DayOfWeek.Thursday => 0.1m,
            DayOfWeek.Friday => 0.2m,
            DayOfWeek.Saturday => 0.3m,
            DayOfWeek.Sunday => 0.35m,
            _ => 0.0m
        };
    }
}

