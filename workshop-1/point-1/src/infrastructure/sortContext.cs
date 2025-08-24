using point_1.src.abstractions;

namespace point_1.src.infrastructure
{
    public class SortContext
    {
        private ISort? _strategy;

        public SortContext Use(ISort strategy)
        {
            _strategy = strategy ?? throw new ArgumentNullException(nameof(strategy));
            return this;
        }

        public void Execute(List<int> data, IComparer<int>? comparer = null)
        {
            if (_strategy is null)
                throw new InvalidOperationException("strategy not configuration");

            _strategy.Sort(data, comparer);
        }

    }
}

