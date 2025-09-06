using decorator.src.Interfaces;
using decorator.src.Services;

namespace decorator.src.Services;

public class GreetingService : IGreetingService
{
    private readonly UserRepository _repository;

    public GreetingService(UserRepository repository)
    {
        _repository = repository;
    }

    public void GreetUser(int userId)
    {
        var user = _repository.GetUserById(userId);
        if (user != null)
        {
            Console.WriteLine($"Hello, {user.Name}! Welcome back.");
        }
        else
        {
            Console.WriteLine("User not found.");
        }
    }
}
