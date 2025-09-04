using point_1.src.abstractions;
using point_1.src.enums;

namespace point_1.src.infrastructure
{
    public class SortFactory
    {
        private readonly Dictionary<SortAlgorithm, ISort> _strategies;

        public SortFactory(IEnumerable<ISort> strategies)
        {
            _strategies = strategies.ToDictionary(s => s.Algorithm);
        }

        public ISort Create(SortAlgorithm algorithm)
        {
            if (_strategies.TryGetValue(algorithm, out var strategy))
                return strategy;

            throw new ArgumentException($"Algorithm {algorithm} not registered");
        }
    }
}

