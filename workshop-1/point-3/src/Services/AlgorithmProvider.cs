using point_3.src.Algorithms;
using point_3.src.Interfaces;

namespace point_3.src.Services;
public class AlgorithmProvider : IAlgorithmProvider
{
    private readonly Dictionary<string, Func<IAlgorithm>> _algorithms = new();

    public IAlgorithm? GetAlgorithm(string name)
    {
        return _algorithms.ContainsKey(name) ? _algorithms[name]() : null;
    }

    public void RegisterAlgorithm(string name, Func<IAlgorithm> creator)
    {
        if (!_algorithms.ContainsKey(name))
        {
            _algorithms[name] = creator;
        }
    }
}
