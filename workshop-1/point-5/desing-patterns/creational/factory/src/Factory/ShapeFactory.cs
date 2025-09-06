using factory.src.Interfaces;

namespace factory.src.Factory
{
    public static class ShapeFactory
    {
        private static readonly Dictionary<string, Func<IShape>> _registry = new();

        public static void Register(string key, Func<IShape> creator)
        {
            if (!_registry.ContainsKey(key.ToLower()))
            {
                _registry[key.ToLower()] = creator;
            }
        }

        public static IShape CreateShape(string key)
        {
            if (_registry.TryGetValue(key.ToLower(), out var creator))
            {
                return creator();
            }
            throw new ArgumentException("Invalid shape type");
        }
    }
}

