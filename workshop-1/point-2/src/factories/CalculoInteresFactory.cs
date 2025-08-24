using point_2.Abstractions;
using point_2.Models;
using point_2.Enums;
using point_2.Strategies;

namespace point_2.Factories;

/// <summary>
/// Factory Method para crear estrategias de cálculo de intereses
/// Cumple con SRP: Solo se encarga de crear estrategias
/// Cumple con OCP: Fácil de extender con nuevas marcas sin modificar código existente
/// Cumple con DIP: Depende de abstracciones (ICalculoInteres) no de concreciones
/// </summary>
public class InterestCalculationFactory : IInterestCalculationFactory
{
    // Diccionario que mapea marcas con sus respectivas estrategias
    // Esto permite extensibilidad y facilita el mantenimiento
    private readonly Dictionary<CardBrand, Func<IInterestCalculation>> _strategies;

    public InterestCalculationFactory()
    {
        _strategies = new Dictionary<CardBrand, Func<IInterestCalculation>>
        {
            { CardBrand.Visa, () => new VisaCalculationStrategy() },
            { CardBrand.MasterCard, () => new MasterCardCalculationStrategy() },
            { CardBrand.AmericanExpress, () => new AmericanExpressCalculationStrategy() }
            // Fácil agregar nuevas marcas aquí sin modificar el resto del código
            // { CardBrand.Diners, () => new DinersCalculationStrategy() },
            // { CardBrand.Discover, () => new DiscoverCalculationStrategy() }
        };
    }

    public IInterestCalculation CreateStrategy(CardBrand cardBrand)
    {
        if (!_strategies.ContainsKey(cardBrand))
        {
            throw new NotSupportedException($"La marca de tarjeta {cardBrand} no está soportada actualmente.");
        }

        return _strategies[cardBrand]();
    }

    public IInterestCalculation CreateStrategy(Card card)
    {
        if (card == null)
        {
            throw new ArgumentNullException(nameof(card), "La tarjeta no puede ser nula");
        }

        if (!card.IsValid())
        {
            throw new ArgumentException("La tarjeta proporcionada no es válida", nameof(card));
        }

        return CreateStrategy(card.Brand);
    }

    public bool SupportsBrand(CardBrand cardBrand)
    {
        return _strategies.ContainsKey(cardBrand);
    }

    public IEnumerable<CardBrand> GetSupportedBrands()
    {
        return _strategies.Keys.ToList();
    }

    /// <summary>
    /// Método auxiliar para registrar nuevas estrategias dinámicamente
    /// Útil para extensiones futuras o configuraciones dinámicas
    /// </summary>
    public void RegisterStrategy(CardBrand brand, Func<IInterestCalculation> factoryMethod)
    {
        if (factoryMethod == null)
        {
            throw new ArgumentNullException(nameof(factoryMethod));
        }

        _strategies[brand] = factoryMethod;
    }

    /// <summary>
    /// Obtiene información detallada sobre las marcas soportadas
    /// </summary>
    public Dictionary<CardBrand, string> GetBrandInformation()
    {
        return new Dictionary<CardBrand, string>
        {
            { CardBrand.Visa, "Tarjetas Visa - Interés compuesto con descuentos por volumen" },
            { CardBrand.MasterCard, "Tarjetas MasterCard - Interés simple con recargos por cuotas extendidas" },
            { CardBrand.AmericanExpress, "American Express - Sistema francés con descuentos por volumen alto" }
        };
    }
}

