namespace point_4.src.Services;

public class AntiMoneyLaunderingNotificationService : IDepositNotificationService
{
    private readonly decimal _threshold;
    private readonly ILoggerService _logger;

    public AntiMoneyLaunderingNotificationService(decimal threshold, ILoggerService logger)
    {
        _threshold = threshold;
        _logger = logger;
    }

    public void NotifyLargeDeposit(decimal amount, SavingsAccount account)
    {
        if (amount > _threshold)
        {
            _logger.Log($"ALERT: Large deposit of {amount:C} detected. Balance: {account.Balance:C}");
        }
    }
}

