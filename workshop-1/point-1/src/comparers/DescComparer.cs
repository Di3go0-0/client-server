namespace point_1.src.comparers
{
    public sealed class DescComparer : IComparer<int>
    {
        public int Compare(int x, int y) => y.CompareTo(x);
    }

}
