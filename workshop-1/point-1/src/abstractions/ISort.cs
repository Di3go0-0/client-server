using point_1.src.enums;

namespace point_1.src.abstractions;
public interface ISort
{
    SortAlgorithm Algorithm { get; }
    void Sort(List<int> data, IComparer<int>? comparer = null);
}
