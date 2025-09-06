using observer.src.Interfaces;

namespace observer.src.Observers;

public class MobileDisplay : IObserver
{
    public void Update(float temperature, float humidity)
    {
        Console.WriteLine($"[Mobile Display] Temperature: {temperature}°C, Humidity: {humidity}%");
    }
}
