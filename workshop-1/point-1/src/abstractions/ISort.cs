namespace point_1.src.abstractions;

public interface ISort
{
    void Sort(List<int> data, IComparer<int>? comparer = null);
}
