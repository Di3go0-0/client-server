using observer.src.Interfaces;

namespace observer.src.Subjects;

public class WeatherStation : ISubject
{
    private readonly List<IObserver> observers = new();
    private float temperature;
    private float humidity;

    public void SetMeasurements(float temperature, float humidity)
    {
        this.temperature = temperature;
        this.humidity = humidity;
        Notify();
    }

    public void Attach(IObserver observer) => observers.Add(observer);

    public void Detach(IObserver observer) => observers.Remove(observer);

    public void Notify()
    {
        foreach (var observer in observers)
        {
            observer.Update(temperature, humidity);
        }
    }
}
