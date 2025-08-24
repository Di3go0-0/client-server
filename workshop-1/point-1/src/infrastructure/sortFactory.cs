using point_1.src.abstractions;
using point_1.src.algorithms;
using point_1.src.enums;

namespace point_1.src.infrastructure
{
    public class SortFactory
    {
        public readonly Dictionary<SortAlgorithm, ISort> _map = new()
        {
          {SortAlgorithm.Bubble, new BubbleSort()},
          {SortAlgorithm.Insertion, new InsertionSort()},
          {SortAlgorithm.Quick, new QuickSort()},
        };

        public ISort Create(SortAlgorithm algorithm)
        {
            return _map[algorithm];
        }
    }
}

