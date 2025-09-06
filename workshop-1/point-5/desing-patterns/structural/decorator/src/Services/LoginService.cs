using decorator.src.Interfaces;
using decorator.src.Services;

namespace decorator.src.Services;

public class LoginService : ILoginService
{
    private readonly UserRepository _repository;

    public LoginService(UserRepository repository)
    {
        _repository = repository;
    }

    public int? Login(string email, string password)
    {
        var user = _repository.GetUserByCredentials(email, password);
        return user?.Id;
    }
}
