namespace point_5.src.utils;

static class NumberGenerator
{
    public static void GenerateNumbers()
    {
        Random rand = new Random();
        while (!SharedData.Stop)
        {
            int n = rand.Next(1, 101); // 1-100
            SharedData.AddNumber(n);
            Thread.Sleep(10); // no saturar la CPU
        }
    }
}
