using point_2.Abstractions;
using point_2.Enums;
using point_2.Models;

namespace point_2.Services;

public class InstallmentCalculationService
{
    private readonly IInterestCalculationFactory _interestCalculationFactory;

    public InstallmentCalculationService(IInterestCalculationFactory interestCalculationFactory)
    {
        _interestCalculationFactory = interestCalculationFactory ?? throw new ArgumentNullException(nameof(interestCalculationFactory));
    }

    public CalculationResult CalculateInstallments(Product product, Card card, int installmentCount)
    {
        ValidateInputs(product, card, installmentCount);

        try
        {
            var calculationStrategy = _interestCalculationFactory.CreateStrategy(card);

            return calculationStrategy.CalculateInstallments(product, card, installmentCount);
        }
        catch (NotSupportedException ex)
        {
            throw new InvalidOperationException($"No se puede procesar la tarjeta {card.Brand}: {ex.Message}", ex);
        }
    }

    public List<CalculationResult> CalculateMultipleOptions(Product product, Card card, int[] installmentOptions)
    {
        ValidateInputs(product, card, 1); // Validación básica

        if (installmentOptions == null || installmentOptions.Length == 0)
        {
            throw new ArgumentException("Debe proporcionar al menos una opción de cuotas", nameof(installmentOptions));
        }

        var results = new List<CalculationResult>();

        foreach (var installments in installmentOptions)
        {
            if (installments > 0)
            {
                try
                {
                    var result = CalculateInstallments(product, card, installments);
                    results.Add(result);
                }
                catch (Exception ex)
                {
                    // Log del error pero continuar con las demás opciones
                    Console.WriteLine($"Error calculando {installments} cuotas: {ex.Message}");
                }
            }
        }

        return results;
    }

    public IEnumerable<CardBrand> GetSupportedBrands()
    {
        return _interestCalculationFactory.GetSupportedBrands();
    }

    public bool IsBrandSupported(CardBrand brand)
    {
        return _interestCalculationFactory.SupportsBrand(brand);
    }

    public List<CalculationResult> CompareCardBrands(Product product, IssuingBank issuingBank, int installmentCount)
    {
        ValidateProduct(product);

        if (installmentCount <= 0)
        {
            throw new ArgumentException("La cantidad de cuotas debe ser mayor a 0", nameof(installmentCount));
        }

        var results = new List<CalculationResult>();
        var supportedBrands = GetSupportedBrands();

        foreach (var brand in supportedBrands)
        {
            try
            {
                var card = new Card(brand, issuingBank);
                var result = CalculateInstallments(product, card, installmentCount);
                results.Add(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error calculando para {brand}: {ex.Message}");
            }
        }

        return results.OrderBy(r => r.InstallmentPrice).ToList();
    }

    private void ValidateInputs(Product product, Card card, int installmentCount)
    {
        ValidateProduct(product);
        ValidateCard(card);

        if (installmentCount <= 0)
        {
            throw new ArgumentException("La cantidad de cuotas debe ser mayor a 0", nameof(installmentCount));
        }

        if (installmentCount > 60)
        {
            throw new ArgumentException("La cantidad máxima de cuotas es 60", nameof(installmentCount));
        }
    }

    private void ValidateProduct(Product product)
    {
        if (product == null)
        {
            throw new ArgumentNullException(nameof(product), "El producto no puede ser nulo");
        }

        if (!product.IsValid())
        {
            throw new ArgumentException("El producto proporcionado no es válido", nameof(product));
        }
    }

    private void ValidateCard(Card card)
    {
        if (card == null)
        {
            throw new ArgumentNullException(nameof(card), "La tarjeta no puede ser nula");
        }

        if (!card.IsValid())
        {
            throw new ArgumentException("La tarjeta proporcionada no es válida", nameof(card));
        }

        if (!IsBrandSupported(card.Brand))
        {
            throw new NotSupportedException($"La marca de tarjeta {card.Brand} no está soportada");
        }
    }
}

