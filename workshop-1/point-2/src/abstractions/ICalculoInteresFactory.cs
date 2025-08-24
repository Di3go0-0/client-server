using point_2.Models;
using point_2.Enums;

namespace point_2.Abstractions;

/// <summary>
/// Interfaz para el Factory Method que crea estrategias de cálculo de intereses
/// Cumple con ISP: Interfaz específica para la creación de estrategias
/// Cumple con DIP: Abstracción que permite inyectar diferentes implementaciones de factory
/// </summary>
public interface IInterestCalculationFactory
{
    /// <summary>
    /// Crea una estrategia de cálculo de intereses basada en la marca de tarjeta
    /// </summary>
    /// <param name="cardBrand">Marca de la tarjeta de crédito</param>
    /// <returns>Estrategia de cálculo correspondiente a la marca</returns>
    IInterestCalculation CreateStrategy(CardBrand cardBrand);

    /// <summary>
    /// Crea una estrategia de cálculo de intereses basada en la tarjeta completa
    /// Permite mayor flexibilidad para considerar banco emisor u otros factores
    /// </summary>
    /// <param name="card">Tarjeta de crédito completa</param>
    /// <returns>Estrategia de cálculo correspondiente</returns>
    IInterestCalculation CreateStrategy(Card card);

    /// <summary>
    /// Verifica si el factory puede crear una estrategia para la marca especificada
    /// </summary>
    /// <param name="cardBrand">Marca de tarjeta a verificar</param>
    /// <returns>True si puede crear la estrategia, false en caso contrario</returns>
    bool SupportsBrand(CardBrand cardBrand);

    /// <summary>
    /// Obtiene todas las marcas de tarjeta soportadas por el factory
    /// </summary>
    /// <returns>Lista de marcas soportadas</returns>
    IEnumerable<CardBrand> GetSupportedBrands();
}

