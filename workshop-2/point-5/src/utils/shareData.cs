namespace point_5.src.utils;

static class SharedData
{
    private static List<int> numbers = new List<int>();
    private static object lockObj = new object();
    public static bool Stop = false;

    public static void AddNumber(int n)
    {
        lock (lockObj)
        {
            numbers.Add(n);
        }
    }

    public static int Count
    {
        get { lock (lockObj) return numbers.Count; }
    }

    public static int GetAt(int index)
    {
        lock (lockObj)
        {
            return numbers[index];
        }
    }

    public static void SetAt(int index, int value)
    {
        lock (lockObj)
        {
            numbers[index] = value;
        }
    }

    public static int GetSum()
    {
        lock (lockObj)
        {
            return numbers.Sum();
        }
    }
}
