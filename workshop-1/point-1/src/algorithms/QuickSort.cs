using point_1.src.abstractions;

namespace point_1.src.algorithms
{
    public class QuickSort : ISort
    {
        public void Sort(List<int> data, IComparer<int>? comparer = null)
        {
            comparer ??= Comparer<int>.Default;
            QuickS(data, 0, data.Count - 1, comparer);
        }


        private void QuickS(List<int> arr, int left, int right, IComparer<int> cmp)
        {
            if (left >= right) return;
            int mid = left + (right - left) / 2;
            int pivot = arr[mid];
            int index = Partition(arr, left, right, pivot, cmp);
            QuickS(arr, left, index - 1, cmp);
            QuickS(arr, index, right, cmp);
        }

        private int Partition(List<int> arr, int left, int right, int pivot, IComparer<int> cmp)
        {
            while (left <= right)
            {
                while (cmp.Compare(arr[left], pivot) < 0) left++;
                while (cmp.Compare(arr[right], pivot) > 0) right--;
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
