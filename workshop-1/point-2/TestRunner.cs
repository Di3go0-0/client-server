using point_2.Models;
using point_2.Enums;
using point_2.Factories;
using point_2.Services;

namespace point_2;

/// <summary>
/// Clase para probar automáticamente todo el sistema
/// Demuestra el funcionamiento de Strategy Pattern y Factory Method
/// </summary>
public static class TestRunner
{
    public static void RunTests()
    {
        Console.WriteLine("=== EJECUTANDO PRUEBAS AUTOMÁTICAS ===\n");

        try
        {
            // Inicializar el sistema
            var factory = new InterestCalculationFactory();
            var service = new InstallmentCalculationService(factory);

            // Crear productos de prueba
            var products = CreateTestProducts();

            // Ejecutar diferentes escenarios de prueba
            TestBasicCalculation(service, products);
            TestBrandComparison(service, products);
            TestMultipleOptions(service, products);
            TestSupportedBrands(service);
            TestValidations(service, products);

            Console.WriteLine("\n=== TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE ===");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error en las pruebas: {ex.Message}");
        }
    }

    static void TestBasicCalculation(InstallmentCalculationService service, List<Product> products)
    {
        Console.WriteLine("🧪 Prueba 1: Cálculo básico de cuotas");
        Console.WriteLine("=========================================");

        var product = products[0]; // Notebook Gaming
        var visaCard = new Card(CardBrand.Visa, IssuingBank.NationBank);

        var result = service.CalculateInstallments(product, visaCard, 12);

        Console.WriteLine($"Producto: {product.Name}");
        Console.WriteLine($"Precio contado: ${product.CashPrice:F2}");
        Console.WriteLine($"Tarjeta: {visaCard.Brand} - {visaCard.IssuingBank}");
        Console.WriteLine($"Cuotas: {result.InstallmentCount}");
        Console.WriteLine($"Precio en cuotas: ${result.InstallmentPrice:F2}");
        Console.WriteLine($"Monto por cuota: ${result.InstallmentAmount:F2}");
        Console.WriteLine($"Tasa aplicada: {result.InterestRate:F2}%");
        Console.WriteLine($"✅ Prueba completada\n");
    }

    static void TestBrandComparison(InstallmentCalculationService service, List<Product> products)
    {
        Console.WriteLine("🧪 Prueba 2: Comparación entre marcas");
        Console.WriteLine("=====================================");

        var product = products[1]; // Smartphone
        var results = service.CompareCardBrands(product, IssuingBank.SantanderBank, 6);

        Console.WriteLine($"Producto: {product.Name} (${product.CashPrice:F2})");
        Console.WriteLine($"Banco: {IssuingBank.SantanderBank}");
        Console.WriteLine($"Cuotas: 6");
        Console.WriteLine();

        foreach (var result in results)
        {
            Console.WriteLine($"• {GetBrandFromDetail(result.CalculationDetail)}: ${result.InstallmentAmount:F2}/mes - Total: ${result.InstallmentPrice:F2}");
        }
        Console.WriteLine($"✅ Prueba completada\n");
    }

    static void TestMultipleOptions(InstallmentCalculationService service, List<Product> products)
    {
        Console.WriteLine("🧪 Prueba 3: Múltiples opciones de cuotas");
        Console.WriteLine("=========================================");

        var product = products[2]; // Smart TV
        var card = new Card(CardBrand.MasterCard, IssuingBank.BBVA);
        int[] options = { 3, 6, 12, 18 };

        var results = service.CalculateMultipleOptions(product, card, options);

        Console.WriteLine($"Producto: {product.Name} (${product.CashPrice:F2})");
        Console.WriteLine($"Tarjeta: {card.Brand} - {card.IssuingBank}");
        Console.WriteLine();

        foreach (var result in results)
        {
            Console.WriteLine($"• {result.InstallmentCount} cuotas: ${result.InstallmentAmount:F2}/mes - Total: ${result.InstallmentPrice:F2}");
        }
        Console.WriteLine($"✅ Prueba completada\n");
    }

    static void TestSupportedBrands(InstallmentCalculationService service)
    {
        Console.WriteLine("🧪 Prueba 4: Marcas soportadas");
        Console.WriteLine("==============================");

        var brands = service.GetSupportedBrands();
        Console.WriteLine("Marcas disponibles:");

        foreach (var brand in brands)
        {
            Console.WriteLine($"• {brand}");
        }
        Console.WriteLine($"✅ Prueba completada\n");
    }

    static void TestValidations(InstallmentCalculationService service, List<Product> products)
    {
        Console.WriteLine("🧪 Prueba 5: Validaciones y manejo de errores");
        Console.WriteLine("=============================================");

        // Probar tarjeta no soportada
        try
        {
            var unsupportedCard = new Card(CardBrand.Diners, IssuingBank.NationBank);
            service.CalculateInstallments(products[0], unsupportedCard, 12);
            Console.WriteLine("❌ Error: Debería haber lanzado excepción para marca no soportada");
        }
        catch (NotSupportedException)
        {
            Console.WriteLine("✅ Validación correcta: Marca no soportada manejada");
        }

        // Probar cuotas inválidas
        try
        {
            var card = new Card(CardBrand.Visa, IssuingBank.NationBank);
            service.CalculateInstallments(products[0], card, -5);
            Console.WriteLine("❌ Error: Debería haber lanzado excepción para cuotas negativas");
        }
        catch (ArgumentException)
        {
            Console.WriteLine("✅ Validación correcta: Cuotas inválidas manejadas");
        }

        Console.WriteLine($"✅ Prueba completada\n");
    }

    static List<Product> CreateTestProducts()
    {
        return new List<Product>
        {
            new Product(1, "Notebook Gaming", 150000m, "Laptop para gaming"),
            new Product(2, "Smartphone Premium", 80000m, "Último modelo"),
            new Product(3, "Smart TV 55\"", 120000m, "Televisor 4K"),
            new Product(4, "Tablet Pro", 45000m, "Tablet profesional")
        };
    }

    static string GetBrandFromDetail(string detail)
    {
        if (detail.Contains("Visa")) return "Visa";
        if (detail.Contains("MasterCard")) return "MasterCard";
        if (detail.Contains("American Express")) return "American Express";
        return "Desconocida";
    }
}

