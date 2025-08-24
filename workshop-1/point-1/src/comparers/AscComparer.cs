namespace point_1.src.comparers
{
    public sealed class AscComparer : IComparer<int>
    {
        public int Compare(int x, int y) => x.CompareTo(y);
    }

}
