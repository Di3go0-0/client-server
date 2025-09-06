using decorator.src.Decorators;
using decorator.src.Interfaces;
using decorator.src.Services;

class Program
{
    static void Main(string[] args)
    {
        string jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "src", "Data", "users.json");
        var repository = new UserRepository(jsonPath);

        // Base login service
        ILoginService loginService = new LoginService(repository);

        // Decorate login
        var decoratedLogin = new LoginDecorator(loginService);

        // Simulated credentials
        string email = "bob@mail.com";
        string password = "1234";

        // Login
        var userId = decoratedLogin.Login(email, password);

        if (userId != null)
        {
            IGreetingService greetingService = new GreetingService(repository);
            greetingService.GreetUser(userId.Value);
        }
    }
}
