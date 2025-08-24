using point_1.src.interfaces;

namespace point_1.src
{
    public class SortContext
    {
        private ISort _strategy;

        public void SetStrategy(ISort strategy)
        {
            _strategy = strategy;
        }

        public void Execute(List<int> data, bool ascending = true)
        {
            _strategy?.Sort(data, ascending);
        }
    }
}

