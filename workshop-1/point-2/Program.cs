using point_2.Models;
using point_2.Enums;
using point_2.Factories;
using point_2.Services;

namespace point_2;

/// <summary>
/// Aplicación principal que demuestra el uso de Strategy Pattern y Factory Method
/// para calcular cuotas de tarjetas de crédito
/// </summary>
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== Sistema de Cálculo de Cuotas ===");
        Console.WriteLine("Usando Strategy Pattern y Factory Method con principios SOLID\n");

        // Ejecutar pruebas automáticas primero
        if (args.Length > 0 && args[0] == "--test")
        {
            TestRunner.RunTests();
            return;
        }

        try
        {
            // Inicializar el sistema - Aplicando Dependency Injection
            var factory = new InterestCalculationFactory();
            var service = new InstallmentCalculationService(factory);

            // Crear algunos productos de ejemplo
            var products = CreateExampleProducts();

            // Mostrar menú principal
            bool continueApp = true;
            while (continueApp)
            {
                ShowMenu();
                var option = Console.ReadLine();

                switch (option)
                {
                    case "1":
                        CalculateProductInstallments(service, products);
                        break;
                    case "2":
                        CompareCardBrands(service, products);
                        break;
                    case "3":
                        ShowSupportedBrands(service);
                        break;
                    case "4":
                        CalculateMultipleOptions(service, products);
                        break;
                    case "5":
                        continueApp = false;
                        Console.WriteLine("¡Gracias por usar el sistema!");
                        break;
                    default:
                        Console.WriteLine("Opción no válida. Intente nuevamente.\n");
                        break;
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error inesperado: {ex.Message}");
        }
    }

    static void ShowMenu()
    {
        Console.WriteLine("\n=== MENÚ PRINCIPAL ===");
        Console.WriteLine("1. Calcular cuotas para un producto");
        Console.WriteLine("2. Comparar marcas de tarjeta");
        Console.WriteLine("3. Ver marcas soportadas");
        Console.WriteLine("4. Calcular múltiples opciones de cuotas");
        Console.WriteLine("5. Salir");
        Console.Write("Seleccione una opción: ");
    }

    static void CalculateProductInstallments(InstallmentCalculationService service, List<Product> products)
    {
        Console.WriteLine("\n=== CÁLCULO DE CUOTAS ===");

        // Seleccionar producto
        var product = SelectProduct(products);
        if (product == null) return;

        // Seleccionar tarjeta
        var card = CreateCard();
        if (card == null) return;

        // Solicitar cantidad de cuotas
        Console.Write("Ingrese la cantidad de cuotas (1-60): ");
        if (!int.TryParse(Console.ReadLine(), out int installments) || installments <= 0 || installments > 60)
        {
            Console.WriteLine("Cantidad de cuotas no válida.");
            return;
        }

        try
        {
            var result = service.CalculateInstallments(product, card, installments);
            Console.WriteLine("\n" + result.GenerateSummary());
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al calcular: {ex.Message}");
        }
    }

    static void CompareCardBrands(InstallmentCalculationService service, List<Product> products)
    {
        Console.WriteLine("\n=== COMPARACIÓN DE MARCAS ===");

        var product = SelectProduct(products);
        if (product == null) return;

        var bank = SelectBank();

        Console.Write("Ingrese la cantidad de cuotas: ");
        if (!int.TryParse(Console.ReadLine(), out int installments) || installments <= 0)
        {
            Console.WriteLine("Cantidad de cuotas no válida.");
            return;
        }

        try
        {
            var results = service.CompareCardBrands(product, bank, installments);

            Console.WriteLine($"\n=== Comparación para {product.Name} en {installments} cuotas ===");
            Console.WriteLine("(Ordenado por conveniencia - menor precio total)\n");

            foreach (var result in results)
            {
                Console.WriteLine(result.GenerateSummary());
                Console.WriteLine(new string('-', 50));
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al comparar: {ex.Message}");
        }
    }

    static void ShowSupportedBrands(InstallmentCalculationService service)
    {
        Console.WriteLine("\n=== MARCAS SOPORTADAS ===");
        var brands = service.GetSupportedBrands();

        foreach (var brand in brands)
        {
            Console.WriteLine($"✓ {brand}");
        }
    }

    static void CalculateMultipleOptions(InstallmentCalculationService service, List<Product> products)
    {
        Console.WriteLine("\n=== MÚLTIPLES OPCIONES DE CUOTAS ===");

        var product = SelectProduct(products);
        if (product == null) return;

        var card = CreateCard();
        if (card == null) return;

        // Opciones predefinidas de cuotas
        int[] installmentOptions = { 1, 3, 6, 9, 12, 18, 24 };

        try
        {
            var results = service.CalculateMultipleOptions(product, card, installmentOptions);

            Console.WriteLine($"\n=== Opciones para {product.Name} con {card.Brand} ===\n");

            foreach (var result in results)
            {
                Console.WriteLine($"{result.InstallmentCount} cuotas: ${result.InstallmentAmount:F2}/mes - Total: ${result.InstallmentPrice:F2}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al calcular opciones: {ex.Message}");
        }
    }

    static Product? SelectProduct(List<Product> products)
    {
        Console.WriteLine("\nProductos disponibles:");
        for (int i = 0; i < products.Count; i++)
        {
            Console.WriteLine($"{i + 1}. {products[i].Name} - ${products[i].CashPrice:F2}");
        }

        Console.Write("Seleccione un producto (número): ");
        if (int.TryParse(Console.ReadLine(), out int selection) &&
            selection >= 1 && selection <= products.Count)
        {
            return products[selection - 1];
        }

        Console.WriteLine("Selección no válida.");
        return null;
    }

    static Card? CreateCard()
    {
        Console.WriteLine("\nMarcas de tarjeta disponibles:");
        var brands = Enum.GetValues<CardBrand>();
        for (int i = 0; i < brands.Length; i++)
        {
            Console.WriteLine($"{i + 1}. {brands[i]}");
        }

        Console.Write("Seleccione una marca: ");
        if (int.TryParse(Console.ReadLine(), out int brandSelection) &&
            brandSelection >= 1 && brandSelection <= brands.Length)
        {
            var brand = brands[brandSelection - 1];
            var bank = SelectBank();
            return new Card(brand, bank);
        }

        Console.WriteLine("Selección no válida.");
        return null;
    }

    static IssuingBank SelectBank()
    {
        Console.WriteLine("\nBancos emisores:");
        var banks = Enum.GetValues<IssuingBank>();
        for (int i = 0; i < banks.Length; i++)
        {
            Console.WriteLine($"{i + 1}. {banks[i]}");
        }

        Console.Write("Seleccione un banco: ");
        if (int.TryParse(Console.ReadLine(), out int bankSelection) &&
            bankSelection >= 1 && bankSelection <= banks.Length)
        {
            return banks[bankSelection - 1];
        }

        Console.WriteLine("Selección no válida, usando Banco Nación por defecto.");
        return IssuingBank.NationBank;
    }

    static List<Product> CreateExampleProducts()
    {
        return new List<Product>
        {
            new Product(1, "Notebook Gaming", 150000m, "Laptop para gaming de alta gama"),
            new Product(2, "Smartphone Premium", 80000m, "Último modelo con cámara profesional"),
            new Product(3, "Smart TV 55\"", 120000m, "Televisor 4K con Android TV"),
            new Product(4, "Tablet Pro", 45000m, "Tablet profesional para diseño"),
            new Product(5, "Auriculares Bluetooth", 15000m, "Auriculares inalámbricos premium"),
            new Product(6, "Consola de Videojuegos", 95000m, "Consola de última generación"),
            new Product(7, "Monitor 4K", 65000m, "Monitor profesional para diseño"),
            new Product(8, "Teclado Mecánico", 25000m, "Teclado gaming con switches mecánicos")
        };
    }
}
