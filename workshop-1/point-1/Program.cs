using point_1.algorithms;

namespace point_1
{

    class Program
    {
        static void Main()
        {
            var data = new List<int> { 5, 2, 9, 1, 5, 6 };
            var context = new SortContext();

            // El usuario selecciona QuickSort Ascendente
            context.SetStrategy(new QuickSort());
            context.Execute(data, ascending: true);

            Console.WriteLine("Ordenado asc: " + string.Join(", ", data));

            // El usuario selecciona Burbuja Descendente
            data = new List<int> { 5, 2, 9, 1, 5, 6 };
            context.SetStrategy(new BubbleSort());
            context.Execute(data, ascending: false);

            Console.WriteLine("Ordenado desc: " + string.Join(", ", data));
        }
    }

}


