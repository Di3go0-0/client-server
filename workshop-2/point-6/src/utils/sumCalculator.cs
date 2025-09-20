namespace point_6.src.utils;

public static class SumCalculator
{
    public static int CalculateSum(int count)
    {
        int sum = 0;
        for (int i = 0; i < count; i++)
        {
            sum += RandomGenerator.GetRandomNumber(1, 1000);
        }
        return sum;
    }
}
