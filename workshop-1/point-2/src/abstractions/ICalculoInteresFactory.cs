using point_2.Enums;
using point_2.Models;

namespace point_2.Abstractions;

public interface IInterestCalculationFactory
{
    IInterestCalculation CreateStrategy(CardBrand cardBrand);
    IInterestCalculation CreateStrategy(Card card);
    bool SupportsBrand(CardBrand cardBrand);
    IEnumerable<CardBrand> GetSupportedBrands();
}

