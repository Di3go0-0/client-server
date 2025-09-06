using observer.src.Interfaces;

namespace observer.src.Observers;

public class TvDisplay : IObserver
{
    public void Update(float temperature, float humidity)
    {
        Console.WriteLine($"[TV Display] Temperature: {temperature}°C, Humidity: {humidity}%");
    }
}

