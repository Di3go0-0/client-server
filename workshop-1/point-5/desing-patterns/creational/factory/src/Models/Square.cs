using factory.src.Interfaces;

namespace factory.src.Models;

public class Square : IShape
{
    public void Draw()
    {
        Console.WriteLine("Drawing a Square");
    }
}
