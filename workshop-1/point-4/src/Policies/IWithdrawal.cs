namespace point_4.src.Policies;

public interface IWithdrawalPolicy
{
    bool IsAllowed(decimal amount, SavingsAccount account);
}

