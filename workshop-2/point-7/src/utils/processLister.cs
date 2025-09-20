using System;
using System.Diagnostics;

namespace point_7.src.utils;

public static class ProcessLister
{
    public static void ListProcesses()
    {
        Console.WriteLine("\nRunning processes:");
        Console.WriteLine("-----------------------------");

        foreach (var process in Process.GetProcesses())
        {
            try
            {
                Console.WriteLine($"PID: {process.Id} - Name: {process.ProcessName}");
            }
            catch
            {
                // Some system processes may not allow access
            }
        }
        Console.WriteLine("-----------------------------");
    }
}
