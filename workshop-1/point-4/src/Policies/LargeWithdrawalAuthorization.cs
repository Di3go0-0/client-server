namespace point_4.src.Policies;

public class LargeWithdrawalAuthorizationPolicy : IWithdrawalPolicy
{
    private readonly decimal _threshold;

    public LargeWithdrawalAuthorizationPolicy(decimal threshold)
    {
        _threshold = threshold;
    }

    public bool IsAllowed(decimal amount, SavingsAccount account)
    {
        return amount <= _threshold;
    }
}

