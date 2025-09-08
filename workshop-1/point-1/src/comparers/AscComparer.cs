namespace point_1.src.comparers
{
    public sealed class AscComparer : IComparer<int>
    {
        // x < y => negativo
        // x = y => cero
        // x > y => positivo
        public int Compare(int x, int y) => x.CompareTo(y);
    }

}
