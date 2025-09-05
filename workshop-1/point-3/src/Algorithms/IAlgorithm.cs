using point_3.src.Core;

namespace point_3.src.Algorithms;

public interface IAlgorithm
{
    string Name { get; }
    void Execute(Inventory inventory);
}
