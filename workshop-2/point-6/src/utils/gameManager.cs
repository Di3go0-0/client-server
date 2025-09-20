namespace point_6.src.utils;

public static class GameManager
{
    private static readonly int[] results = new int[10];
    private static readonly Thread[] threads = new Thread[10];

    public static void RunGame()
    {
        for (int i = 0; i < 10; i++)
        {
            int index = i; // capture variable for closure
            threads[i] = new Thread(() =>
            {
                results[index] = SumCalculator.CalculateSum(100);
                Console.WriteLine($"Thread {index + 1} finished with result: {results[index]}");
            });
            threads[i].Start();
        }

        // Wait for all threads
        foreach (var thread in threads)
        {
            thread.Join();
        }

        // Determine the winner
        int maxValue = int.MinValue;
        int winnerIndex = -1;

        for (int i = 0; i < results.Length; i++)
        {
            if (results[i] > maxValue)
            {
                maxValue = results[i];
                winnerIndex = i;
            }
        }

        Console.WriteLine($"\n🏆 The winner is Thread {winnerIndex + 1} with result {maxValue}");
    }
}
