namespace point_4.src.Services;

public class ConsoleLoggerService : ILoggerService
{
    public void Log(string message)
    {
        Console.WriteLine(message);
    }
}
