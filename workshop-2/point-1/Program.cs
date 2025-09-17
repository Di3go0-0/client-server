using System;
using System.Collections.Generic;
using System.Threading;
using point_1.src.interfaces;
using point_1.src.shapes;

namespace point_1
{
    class Program
    {
        static void Main(string[] args)
        {
            // Shapes that compose the figure
            IShape leftTriangle = new Triangle(10, 12);
            IShape centerRectangle = new Rectangle(8, 12);
            IShape rightRectangle = new Rectangle(6, 5);
            IShape rightTriangle = new Triangle(2, 5);

            List<IShape> shapes = new() { leftTriangle, centerRectangle, rightRectangle, rightTriangle };

            // Store partial results
            double[] results = new double[shapes.Count];
            Thread[] threads = new Thread[shapes.Count]; //thread by each shape

            // Launch a thread per shape
            for (int i = 0; i < shapes.Count; i++) //by each shape
            {
                int index = i; // avoid closure problem

                threads[i] = new Thread(() =>
                {
                    double area = shapes[index].GetArea();
                    results[index] = area;
                    Console.WriteLine($"{shapes[index].GetType().Name} area: {area}");
                });
                threads[i].Start();

            }

            // Wait until all threads finish
            foreach (var t in threads)
                t.Join();

            // Sum areas
            double totalArea = 0;
            foreach (var area in results)
                totalArea += area;

            Console.WriteLine($"Total area of the figure: {totalArea}");
        }
    }
}

