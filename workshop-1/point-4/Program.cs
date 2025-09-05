
using point_4.src;
using point_4.src.Policies;
using point_4.src.Services;

class Program
{
    static void Main()
    {
        ILoggerService logger = new ConsoleLoggerService();

        var withdrawalPolicies = new List<IWithdrawalPolicy>
        {
            new MaxTwoWithdrawalsPerWeekPolicy(2),
            new LargeWithdrawalAuthorizationPolicy(100m) // $10X
        };

        var depositServices = new List<IDepositNotificationService>
        {
            new AntiMoneyLaunderingNotificationService(50m, logger) // $5X
        };

        var account = new SavingsAccount(200m, withdrawalPolicies, depositServices, logger);

        account.Deposit(60m);    // dispara AML
        account.Withdraw(30m);   // OK
        account.Withdraw(30m);   // OK
        account.Withdraw(30m);   // rechazado por límite semanal
        account.Withdraw(150m);  // rechazado por límite de autorización
    }
}

