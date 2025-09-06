using factory.src.Factory;
using factory.src.Interfaces;
using factory.src.Models;

class Program
{
    static void Main(string[] args)
    {
        ShapeFactory.Register("circle", () => new Circle());
        ShapeFactory.Register("square", () => new Square());
        ShapeFactory.Register("triangle", () => new Triangle());

        IShape shape1 = ShapeFactory.CreateShape("circle");
        shape1.Draw();

        IShape shape2 = ShapeFactory.CreateShape("square");
        shape2.Draw();

        IShape shape3 = ShapeFactory.CreateShape("triangle");
        shape3.Draw();
    }
}

