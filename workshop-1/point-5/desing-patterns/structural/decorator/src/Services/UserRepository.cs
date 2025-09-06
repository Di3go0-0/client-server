using System.Text.Json;
using decorator.src.Models;

namespace decorator.src.Services;

public class UserRepository
{
    private readonly List<User> _users;

    public UserRepository(string jsonPath)
    {
        string json = File.ReadAllText(jsonPath);
        _users = JsonSerializer.Deserialize<List<User>>(json) ?? new List<User>();
    }

    public User? GetUserById(int id)
    {
        return _users.FirstOrDefault(u => u.Id == id);
    }

    public User? GetUserByCredentials(string email, string password)
    {
        return _users.FirstOrDefault(u => u.Email == email && u.Password == password);
    }
}
