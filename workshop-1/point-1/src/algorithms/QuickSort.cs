using point_1.src.interfaces;

namespace point_1.src.algorithms
{
    public class QuickSort : ISort
    {
        public void Sort(List<int> data, bool ascending = true)
        {
            QuickS(data, 0, data.Count - 1, ascending);
        }


        private void QuickS(List<int> arr, int left, int right, bool asc)
        {
            if (left >= right) return;
            int pivot = arr[(left + right) / 2];
            int index = Partition(arr, left, right, pivot, asc);
            QuickS(arr, left, index - 1, asc);
            QuickS(arr, index, right, asc);
        }

        private int Partition(List<int> arr, int left, int right, int pivot, bool asc)
        {
            while (left <= right)
            {
                while (asc ? arr[left] < pivot : arr[left] > pivot) left++;
                while (asc ? arr[right] > pivot : arr[right] < pivot) right--;
                if (left <= right)
                {
                    (arr[left], arr[right]) = (arr[right], arr[left]);
                    left++; right--;
                }
            }
            return left;
        }
    }
}
