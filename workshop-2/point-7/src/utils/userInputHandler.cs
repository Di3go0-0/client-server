using System;

namespace point_7.src.utils;

public static class UserInputHandler
{
    public static int AskForPid()
    {
        Console.Write("\nEnter the PID of the process you want to kill: ");
        string? input = Console.ReadLine();

        if (int.TryParse(input, out int pid))
        {
            return pid;
        }

        Console.WriteLine("Invalid input. Please enter a valid PID.");
        return AskForPid();
    }
}
