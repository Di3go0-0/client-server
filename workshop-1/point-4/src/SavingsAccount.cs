
using point_4.src.Policies;
using point_4.src.Services;

namespace point_4.src;

public class SavingsAccount : Account
{
    private readonly List<IWithdrawalPolicy> _withdrawalPolicies;
    private readonly List<IDepositNotificationService> _depositNotificationServices;
    private readonly ILoggerService _logger;

    public int WithdrawalsThisWeek { get; set; } = 0;

    public SavingsAccount(
        decimal initialBalance,
        List<IWithdrawalPolicy> withdrawalPolicies,
        List<IDepositNotificationService> depositNotificationServices,
        ILoggerService logger)
        : base(initialBalance)
    {
        _withdrawalPolicies = withdrawalPolicies ?? throw new ArgumentNullException(nameof(withdrawalPolicies));
        _depositNotificationServices = depositNotificationServices ?? throw new ArgumentNullException(nameof(depositNotificationServices));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public override void Withdraw(decimal amount)
    {
        foreach (var policy in _withdrawalPolicies)
        {
            if (!policy.IsAllowed(amount, this))
            {
                _logger.Log($"Withdrawal of {amount:C} denied by policy: {policy.GetType().Name}");
                return;
            }
        }

        base.Withdraw(amount);
        WithdrawalsThisWeek++;
        _logger.Log($"Withdrew {amount:C}. New balance: {Balance:C}");
    }

    public override void Deposit(decimal amount)
    {
        base.Deposit(amount);

        foreach (var service in _depositNotificationServices)
        {
            service.NotifyLargeDeposit(amount, this);
        }

        _logger.Log($"Deposited {amount:C}. New balance: {Balance:C}");
    }
}

