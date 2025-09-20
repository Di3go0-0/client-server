namespace point_5.src.utils;

static class NumberReplacer
{
    public static void ReplaceNumbers()
    {
        int index = 0;
        while (!SharedData.Stop)
        {
            if (SharedData.Count > 0)
            {
                if (index >= SharedData.Count) index = 0; // recorrido circular

                int value = SharedData.GetAt(index);
                if (value % 10 == 0) // si termina en 0
                {
                    SharedData.SetAt(index, value - 1); // ej: 50 -> 49
                }
                index++;
            }
            Thread.Sleep(5); // dar chance a otros hilos
        }
    }
}
