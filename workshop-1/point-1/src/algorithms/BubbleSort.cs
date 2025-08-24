using point_1.src.abstractions;

namespace point_1.src.algorithms
{
    public class BubbleSort : ISort
    {
        public void Sort(List<int> data, IComparer<int>? comparer = null)
        {
            comparer ??= Comparer<int>.Default;
            for (int i = 0; i < data.Count - 1; i++)
            {
                for (int j = 0; j < data.Count - i - 1; j++)
                {
                    if (comparer.Compare(data[j], data[j + 1]) > 0)
                    {
                        (data[j], data[j + 1]) = (data[j + 1], data[j]);
                    }
                }
            }
        }
    }
}


