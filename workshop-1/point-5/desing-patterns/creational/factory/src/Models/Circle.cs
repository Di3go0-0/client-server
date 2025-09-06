using factory.src.Interfaces;

namespace factory.src.Models;

public class Circle : IShape
{
    public void Draw()
    {
        Console.WriteLine("Drawing a Circle");
    }
}
