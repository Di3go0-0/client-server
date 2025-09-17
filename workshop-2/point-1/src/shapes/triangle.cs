using point_1.src.interfaces;

namespace point_1.src.shapes;


public class Triangle : IShape
{
    public double BaseLength { get; set; }
    public double Height { get; set; }

    public Triangle(double baseLength, double height)
    {
        BaseLength = baseLength;
        Height = height;
    }

    public double GetArea()
    {
        return (BaseLength * Height) / 2;
    }
}

