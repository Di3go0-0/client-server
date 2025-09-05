namespace point_4.src.Policies;

public class MaxTwoWithdrawalsPerWeekPolicy : IWithdrawalPolicy
{
    private readonly int _maxWithdrawals;

    public MaxTwoWithdrawalsPerWeekPolicy(int maxWithdrawals = 2)
    {
        _maxWithdrawals = maxWithdrawals;
    }

    public bool IsAllowed(decimal amount, SavingsAccount account)
    {
        return account.WithdrawalsThisWeek < _maxWithdrawals;
    }
}

