using point_1.src.abstractions;
using point_1.src.enums;

namespace point_1.src.algorithms
{
    public class InsertionSort : ISort
    {
        public SortAlgorithm Algorithm => SortAlgorithm.Insertion;

        public void Sort(List<int> data, IComparer<int>? comparer = null)
        {
            comparer ??= Comparer<int>.Default;
            for (int i = 1; i < data.Count; i++)
            {
                int key = data[i];
                int j = i - 1;
                while (j >= 0 && comparer.Compare(data[j], key) > 0)
                {
                    data[j + 1] = data[j];
                    j--;
                }
                data[j + 1] = key;
            }
        }
    }
}


