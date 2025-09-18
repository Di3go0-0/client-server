using System;
using System.Threading;
using point_2.src.utils;

class Program
{
    static void Main(string[] args)
    {
        if (args.Length < 2)
        {
            Console.WriteLine("Please provide two integers as arguments.");
            return;
        }

        if (!int.TryParse(args[0], out int n1) || !int.TryParse(args[1], out int n2))
        {
            Console.WriteLine("Arguments must be integers.");
            return;
        }

        // Create a thread to display the sequence
        Thread thread = new Thread(() => SequencePrinter.PrintSequence(n1, n2));
        thread.Start();

        // Main thread calculates subtraction
        int subtraction = n1 - n2;
        Console.WriteLine($"[Main thread] The subtraction of {n1} - {n2} = {subtraction}");

        // Wait for the other thread to finish
        thread.Join();
        Console.WriteLine("Program finished.");
    }
}
