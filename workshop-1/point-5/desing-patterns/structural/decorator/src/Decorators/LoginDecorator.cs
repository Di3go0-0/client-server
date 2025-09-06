using decorator.src.Interfaces;

namespace decorator.src.Decorators;

public class LoginDecorator : ILoginService
{
    private readonly ILoginService _inner;
    public int? LoggedUserId { get; private set; }

    public LoginDecorator(ILoginService inner)
    {
        _inner = inner;
    }

    public int? Login(string email, string password)
    {
        LoggedUserId = _inner.Login(email, password);
        if (LoggedUserId != null)
        {
            Console.WriteLine($"[Decorator] User logged with ID: {LoggedUserId}");
        }
        else
        {
            Console.WriteLine("[Decorator] Invalid credentials.");
        }
        return LoggedUserId;
    }
}
