namespace decorator.src.Interfaces;

public interface ILoginService
{
    int? Login(string email, string password);
}
