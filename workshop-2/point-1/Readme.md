# Geometric Shape Area Calculator with Threads

## 📌 Overview

This project demonstrates how to calculate the **area of a composite geometric figure** by splitting it into multiple shapes (triangles and rectangles).  
Each shape implements a common interface (`IShape`) and runs in a **separate thread** to optimize execution.

The goal is to show:

- How to use **interfaces** for abstraction.
- How to implement different shapes (`Rectangle`, `Triangle`).
- How to calculate areas in **parallel using threads**.

---

## 🛠️ Project Structure

point-1/
│── src/
│ ├── interfaces/
│ │ └── IShape.cs
│ ├── shapes/
│ │ ├── Rectangle.cs
│ │ └── Triangle.cs
│── Program.cs
│── README.md

````

---

## 🔹 The `IShape` Interface

```csharp
public interface IShape
{
    double GetArea();
}
````

---

## 🔹 Implementations

### Rectangle

```csharp
public class Rectangle : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public double GetArea()
    {
        return Width * Height;
    }
}
```

### Triangle

```csharp
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
```

---

## 🔹 Program.cs (Main Execution)

```csharp
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
            IShape leftTriangle = new Triangle(10, 12);
            IShape centerRectangle = new Rectangle(8, 12);
            IShape rightRectangle = new Rectangle(6, 5);
            IShape rightTriangle = new Triangle(2, 5);

            List<IShape> shapes = new() { leftTriangle, centerRectangle, rightRectangle, rightTriangle };

            double[] results = new double[shapes.Count];
            Thread[] threads = new Thread[shapes.Count];

            for (int i = 0; i < shapes.Count; i++)
            {
                int index = i;
                threads[i] = new Thread(() =>
                {
                    double area = shapes[index].GetArea();
                    results[index] = area;
                    Console.WriteLine($"{shapes[index].GetType().Name} area: {area}");
                });
                threads[i].Start();
            }

            foreach (var t in threads)
                t.Join();

            double totalArea = 0;
            foreach (var area in results)
                totalArea += area;

            Console.WriteLine($"Total area of the figure: {totalArea}");
        }
    }
}
```

---

## ▶️ How to Run

1. Navigate to the project folder:

   ```bash
   cd point-1
   ```

2. Run the program:

   ```bash
   dotnet run
   ```

---

## ✅ Example Output

```
Triangle area: 60
Rectangle area: 96
Rectangle area: 30
Triangle area: 5
Total area of the figure: 191
```

_(Areas will depend on the dimensions you provide)_

---

## 📖 Key Concepts

- **Interfaces** → common contract for shapes (`IShape`).
- **Encapsulation** → each shape knows how to calculate its own area.
- **Multithreading** → each shape runs its area calculation on a separate thread.
- **Synchronization** → `Join()` ensures all threads finish before calculating the total.

---

## 🚀 Possible Improvements

- Use `Task` and `Parallel.ForEach` instead of raw `Thread` for cleaner code.
- Add user input to define shapes dynamically.
- Extend with more shapes (Circle, Polygon, etc.).
