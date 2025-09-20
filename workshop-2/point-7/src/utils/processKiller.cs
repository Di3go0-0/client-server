using System;
using System.Diagnostics;

namespace point_7.src.utils;

public static class ProcessKiller
{
    public static void KillProcess(int pid)
    {
        try
        {
            Process process = Process.GetProcessById(pid);
            process.Kill();
            process.WaitForExit();
            Console.WriteLine($"Process {pid} ({process.ProcessName}) terminated successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error while killing process {pid}: {ex.Message}");
        }
    }
}
