using observer.src.Interfaces;

namespace observer.src.Observers;

public class WebDisplay : IObserver
{
    public void Update(float temperature, float humidity)
    {
        Console.WriteLine($"[Web Display] Temperature: {temperature}°C, Humidity: {humidity}%");
    }
}
