namespace point_6.src.utils;

public static class RandomGenerator
{
    private static readonly Random random = new Random();
    private static readonly object locker = new object();

    public static int GetRandomNumber(int min, int max)
    {
        lock (locker) // thread-safe random
        {
            return random.Next(min, max + 1);
        }
    }
}
