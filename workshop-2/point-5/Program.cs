using point_5.src.utils;

class Program
{
    static void Main()
    {
        Thread generator = new Thread(NumberGenerator.GenerateNumbers);
        Thread replacer = new Thread(NumberReplacer.ReplaceNumbers);
        Thread supervisor = new Thread(() => Supervisor.Supervise(generator, replacer));

        generator.Start();
        replacer.Start();
        supervisor.Start();

        supervisor.Join(); // esperamos al supervisor
        Console.WriteLine("Proceso terminado. Suma final: " + SharedData.GetSum());
    }
}
