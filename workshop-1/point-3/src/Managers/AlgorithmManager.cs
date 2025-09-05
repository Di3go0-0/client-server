using point_3.src.Algorithms;

namespace point_3.src.Managers;
public class AlgorithmManager
{
    private readonly Dictionary<string, IAlgorithm> _algorithms;

    public AlgorithmManager()
    {
        _algorithms = new Dictionary<string, IAlgorithm>(StringComparer.OrdinalIgnoreCase);
    }

    public void AddAlgorithm(IAlgorithm algorithm)
    {
        if (_algorithms.ContainsKey(algorithm.Name))
        {
            Console.WriteLine($"Advertencia: Ya existe un algoritmo con el nombre '{algorithm.Name}'. No se añadió.");
            return;
        }
        _algorithms.Add(algorithm.Name, algorithm);
    }

    public void RemoveAlgorithm(string algorithmName)
    {
        if (!_algorithms.ContainsKey(algorithmName))
        {
            Console.WriteLine($"Advertencia: No se encontró el algoritmo '{algorithmName}' para eliminar.");
            return;
        }
        _algorithms.Remove(algorithmName);
    }

    public void EditAlgorithm(string algorithmName, IAlgorithm newAlgorithm)
    {
        if (!_algorithms.ContainsKey(algorithmName))
        {
            Console.WriteLine($"Advertencia: No se encontró el algoritmo '{algorithmName}' para editar. Se añadió como nuevo.");
            AddAlgorithm(newAlgorithm);
            return;
        }
        _algorithms[algorithmName] = newAlgorithm;
    }

    public IAlgorithm GetAlgorithm(string algorithmName)
    {
        if (_algorithms.TryGetValue(algorithmName, out var algorithm))
        {
            return algorithm;
        }
        throw new ArgumentException($"Algoritmo '{algorithmName}' no encontrado.");
    }

    public List<IAlgorithm> GetAllAlgorithms()
    {
        return _algorithms.Values.ToList();
    }
}
