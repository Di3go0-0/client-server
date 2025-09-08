using Microsoft.Extensions.DependencyInjection;
using point_1.src.abstractions;
using point_1.src.algorithms;
using point_1.src.comparers;
using point_1.src.enums;
using point_1.src.infrastructure;

internal class Program
{
    static void Main()
    {
        // Configuración de DependencyInjection
        var services = new ServiceCollection();

        // Registrar algoritmos
        services.AddTransient<ISort, BubbleSort>();
        services.AddTransient<ISort, InsertionSort>();
        services.AddTransient<ISort, QuickSort>();

        // Registrar infraestructura
        services.AddSingleton<SortFactory>();
        services.AddSingleton<SortContext>();

        var provider = services.BuildServiceProvider();

        var factory = provider.GetRequiredService<SortFactory>();
        var context = provider.GetRequiredService<SortContext>();

        // --- Ejecuciones de prueba ---

        var data = new List<int> { 5, 2, 9, 1, 5, 6 };

        // QuickSort Ascendente
        context.Use(factory.Create(SortAlgorithm.Quick))
               .Execute(data, new AscComparer());
        Console.WriteLine("QuickSort Asc: " + string.Join(", ", data));

        // BubbleSort Descendente
        data = new List<int> { 5, 2, 9, 1, 5, 6 };
        context.Use(factory.Create(SortAlgorithm.Bubble))
               .Execute(data, new DescComparer());
        Console.WriteLine("BubbleSort Desc: " + string.Join(", ", data));

        // InsertionSort Ascendente
        data = new List<int> { 3, 8, 4, 7, 2 };
        context.Use(factory.Create(SortAlgorithm.Insertion))
               .Execute(data, new AscComparer());
        Console.WriteLine("InsertionSort Asc: " + string.Join(", ", data));
    }
}

