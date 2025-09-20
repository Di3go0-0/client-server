
using System;
using point_7.src.utils;

namespace ProcessManagerApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== Process Manager ===");

            // List processes
            ProcessLister.ListProcesses();

            // Ask user for PID
            int pid = UserInputHandler.AskForPid();

            // Kill process
            ProcessKiller.KillProcess(pid);

            Console.WriteLine("Program finished.");
        }
    }
}
