using point_2.Abstractions;
using point_2.Models;
using point_2.Enums;

namespace point_2.Strategies;

/// <summary>
/// Estrategia de cálculo de intereses para tarjetas Visa
/// Cumple con SRP: Solo se encarga del cálculo específico de Visa
/// Cumple con OCP: Extensible sin modificar código existente
/// Cumple con LSP: Puede ser sustituida por cualquier otra implementación de ICalculoInteres
/// </summary>
public class VisaCalculationStrategy : IInterestCalculation
{
    // Tasas base para Visa (pueden variar según el banco)
    private readonly Dictionary<IssuingBank, decimal> _baseRatesByBank = new()
    {
        { IssuingBank.NationBank, 2.5m },
        { IssuingBank.SantanderBank, 3.0m },
        { IssuingBank.BBVA, 2.8m },
        { IssuingBank.GaliciaBank, 3.2m },
        { IssuingBank.HSBC, 2.9m },
        { IssuingBank.Macro, 3.1m },
        { IssuingBank.FrenchBank, 2.7m },
        { IssuingBank.ItauBank, 3.0m },
        { IssuingBank.CityBank, 2.6m },
        { IssuingBank.SupervielleBank, 3.3m }
    };

    public CalculationResult CalculateInstallments(Product product, Card card, int installmentCount)
    {
        if (!CanCalculate(card))
            throw new ArgumentException("Esta estrategia solo funciona con tarjetas Visa");

        if (installmentCount <= 0)
            throw new ArgumentException("La cantidad de cuotas debe ser mayor a 0");

        var interestRate = GetInterestRate(installmentCount, card);

        // Fórmula específica de Visa: Interés compuesto con bonificación por banco
        var interestFactor = (decimal)Math.Pow((double)(1 + interestRate / 100), installmentCount);
        var installmentPrice = product.CashPrice * interestFactor;
        var installmentAmount = installmentPrice / installmentCount;

        // Aplicar bonificación especial de Visa para más de 6 cuotas
        if (installmentCount >= 6)
        {
            var discount = 0.95m; // 5% de descuento
            installmentPrice *= discount;
            installmentAmount = installmentPrice / installmentCount;
        }

        var calculationDetail = $"Visa - Banco {card.IssuingBank} - Tasa: {interestRate:F2}%" +
                               (installmentCount >= 6 ? " (Con descuento 5% por +6 cuotas)" : "");

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
        var baseRate = _baseRatesByBank.GetValueOrDefault(card.IssuingBank, 3.0m);

        // Visa incrementa la tasa según las cuotas pero con un tope
        var incrementPerInstallment = Math.Min(installmentCount * 0.1m, 1.0m); // Máximo 1% de incremento

        // Aplicar factor del día de la semana (requisito del ejercicio)
        var dayOfWeekFactor = GetDayOfWeekFactor();

        return baseRate + incrementPerInstallment + dayOfWeekFactor;
    }

    public bool CanCalculate(Card card)
    {
        return card.Brand == CardBrand.Visa;
    }

    /// <summary>
    /// Obtiene un factor adicional basado en el día de la semana
    /// Simula que los intereses pueden variar según el día
    /// </summary>
    private decimal GetDayOfWeekFactor()
    {
        var dayOfWeek = DateTime.Now.DayOfWeek;
        return dayOfWeek switch
        {
            DayOfWeek.Monday => 0.1m,
            DayOfWeek.Tuesday => 0.05m,
            DayOfWeek.Wednesday => 0.0m,
            DayOfWeek.Thursday => 0.05m,
            DayOfWeek.Friday => 0.15m,
            DayOfWeek.Saturday => 0.2m,
            DayOfWeek.Sunday => 0.25m,
            _ => 0.0m
        };
    }
}

