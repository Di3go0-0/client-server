using factory.src.Interfaces;

namespace factory.src.Models;

public class Triangle : IShape
{
    public void Draw()
    {
        Console.WriteLine("Drawing a Triangle");
    }
}
