using point_2.Abstractions;
using point_2.Models;
using point_2.Enums;

namespace point_2.Services;

/// <summary>
/// Servicio principal que orquesta el cálculo de cuotas
/// Cumple con SRP: Solo se encarga de coordinar el cálculo de cuotas
/// Cumple con DIP: Depende de abstracciones (ICalculoInteresFactory)
/// Cumple con OCP: Abierto para extensión mediante nuevas estrategias
/// </summary>
public class InstallmentCalculationService
{
    private readonly IInterestCalculationFactory _interestCalculationFactory;

    public InstallmentCalculationService(IInterestCalculationFactory interestCalculationFactory)
    {
        _interestCalculationFactory = interestCalculationFactory ?? throw new ArgumentNullException(nameof(interestCalculationFactory));
    }

    /// <summary>
    /// Calcula las cuotas para un producto con una tarjeta específica
    /// </summary>
    /// <param name="product">Producto a calcular</param>
    /// <param name="card">Tarjeta de crédito</param>
    /// <param name="installmentCount">Cantidad de cuotas deseadas</param>
    /// <returns>Resultado del cálculo</returns>
    public CalculationResult CalculateInstallments(Product product, Card card, int installmentCount)
    {
        // Validaciones de entrada
        ValidateInputs(product, card, installmentCount);

        try
        {
            // Usar el factory para obtener la estrategia correcta
            var calculationStrategy = _interestCalculationFactory.CreateStrategy(card);

            // Delegar el cálculo a la estrategia específica
            return calculationStrategy.CalculateInstallments(product, card, installmentCount);
        }
        catch (NotSupportedException ex)
        {
            throw new InvalidOperationException($"No se puede procesar la tarjeta {card.Brand}: {ex.Message}", ex);
        }
    }

    /// <summary>
    /// Calcula múltiples opciones de cuotas para un producto
    /// </summary>
    /// <param name="product">Producto a calcular</param>
    /// <param name="card">Tarjeta de crédito</param>
    /// <param name="installmentOptions">Array con las opciones de cuotas a calcular</param>
    /// <returns>Lista de resultados para cada opción</returns>
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

    /// <summary>
    /// Obtiene las marcas de tarjeta soportadas
    /// </summary>
    /// <returns>Lista de marcas soportadas</returns>
    public IEnumerable<CardBrand> GetSupportedBrands()
    {
        return _interestCalculationFactory.GetSupportedBrands();
    }

    /// <summary>
    /// Verifica si una marca de tarjeta está soportada
    /// </summary>
    /// <param name="brand">Marca a verificar</param>
    /// <returns>True si está soportada</returns>
    public bool IsBrandSupported(CardBrand brand)
    {
        return _interestCalculationFactory.SupportsBrand(brand);
    }

    /// <summary>
    /// Compara diferentes marcas de tarjeta para el mismo producto y cuotas
    /// </summary>
    /// <param name="product">Producto a calcular</param>
    /// <param name="issuingBank">Banco emisor</param>
    /// <param name="installmentCount">Cantidad de cuotas</param>
    /// <returns>Comparación de todas las marcas soportadas</returns>
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

        // Ordenar por precio total (más conveniente primero)
        return results.OrderBy(r => r.InstallmentPrice).ToList();
    }

    /// <summary>
    /// Valida las entradas del cálculo
    /// </summary>
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

    /// <summary>
    /// Valida que el producto sea válido
    /// </summary>
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

    /// <summary>
    /// Valida que la tarjeta sea válida
    /// </summary>
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

