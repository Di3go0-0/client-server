namespace point_4.src.Services;

public interface IDepositNotificationService
{
    void NotifyLargeDeposit(decimal amount, SavingsAccount account);
}

