using point_1.src.interfaces;

namespace point_1.src.algorithms
{
    public class BubbleSort : ISort
    {
        public void Sort(List<int> data, bool ascending = true)
        {
            for (int i = 0; i < data.Count - 1; i++)
            {
                for (int j = 0; j < data.Count - i - 1; j++)
                {
                    bool condition = ascending ? data[j] > data[j + 1] : data[j] < data[j + 1];
                    if (condition)
                    {
                        (data[j], data[j + 1]) = (data[j + 1], data[j]);
                    }
                }
            }
        }

    }
}


