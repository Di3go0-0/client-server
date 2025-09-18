namespace point_2.src.utils;

static class SequencePrinter
{
    public static void PrintSequence(int n1, int n2)
    {
        if (n1 < n2)
        {
            Console.Write($"[Worker thread] Sequence between {n1} and {n2}: ");
            for (int i = n1; i <= n2; i++)
            {
                Console.Write(i + " ");
                Thread.Sleep(200); // simulate some work
            }
            Console.WriteLine();
        }
        else
        {
            Console.WriteLine("[Worker thread] Cannot generate sequence because n1 >= n2.");
        }
    }
}
