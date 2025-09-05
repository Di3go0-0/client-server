using point_3.src.Algorithms;

namespace point_3.src.Interfaces;
public interface IAlgorithmProvider
{
    IAlgorithm? GetAlgorithm(string name);
    void RegisterAlgorithm(string name, Func<IAlgorithm> creator);
}
