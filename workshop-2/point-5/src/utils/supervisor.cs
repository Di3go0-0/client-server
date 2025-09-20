namespace point_5.src.utils;

static class Supervisor
{
    public static void Supervise(Thread generator, Thread replacer)
    {
        while (true)
        {
            int sum = SharedData.GetSum();

            if (sum > 20000)
            {
                SharedData.Stop = true;
                Console.WriteLine("⚠️ Suma superó 20000, deteniendo hilos...");
                break;
            }
            Thread.Sleep(50);
        }
    }
}
