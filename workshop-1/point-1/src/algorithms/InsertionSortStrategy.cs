using point_1.src.interfaces;

namespace point_1.src.algorithms
{
    public class InsertionSort : ISort
    {
        public void Sort(List<int> data, bool ascending = true)
        {
            for (int i = 1; i < data.Count; i++)
            {
                int key = data[i];
                int j = i - 1;
                while (j >= 0 && (ascending ? data[j] > key : data[j] < key))
                {
                    data[j + 1] = data[j];
                    j--;
                }
                data[j + 1] = key;
            }
        }
    }
}


