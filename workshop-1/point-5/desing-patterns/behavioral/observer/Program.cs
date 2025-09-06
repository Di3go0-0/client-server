using observer.src.Observers;
using observer.src.Subjects;

class Program
{
    static void Main()
    {
        var weatherStation = new WeatherStation();

        var mobile = new MobileDisplay();
        var web = new WebDisplay();
        var tv = new TvDisplay();

        weatherStation.Attach(mobile);
        weatherStation.Attach(web);
        weatherStation.Attach(tv);

        weatherStation.SetMeasurements(25.0f, 60.0f);
        Console.WriteLine();
        weatherStation.SetMeasurements(30.5f, 55.0f);
    }
}
