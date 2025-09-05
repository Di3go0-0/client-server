classDiagram
direction LR

    class IAlgorithm {
        +string Name
        +void Execute(Inventory inventory)
    }

    class Inventory {
        -List~Product~ products
        -List~Warehouse~ warehouses
        +void AddProduct(Product product)
        +void RemoveProduct(Product product)
        +void AddWarehouse(Warehouse warehouse)
        +void RemoveWarehouse(Warehouse warehouse)
        +List~Product~ GetProducts()
        +List~Warehouse~ GetWarehouses()
    }

    class Product {
        +string Name
        +int Quantity
        +double Price
    }

    class Warehouse {
        +string Name
        +int Capacity
    }

    class AlgorithmManager {
        -Dictionary~string, IAlgorithm~ algorithms
        +void AddAlgorithm(IAlgorithm algorithm)
        +void RemoveAlgorithm(string algorithmName)
        +void EditAlgorithm(string algorithmName, IAlgorithm newAlgorithm)
        +IAlgorithm GetAlgorithm(string algorithmName)
        +List~IAlgorithm~ GetAllAlgorithms()
    }

    class InventorySystem {
        -Inventory inventory
        -IAlgorithm currentAlgorithm
        +InventorySystem(Inventory inventory, IAlgorithm initialAlgorithm)
        +void SetAlgorithm(IAlgorithm algorithm)
        +void RunOptimization()
        +void GenerateReport()
    }

    class SimpleDeterministicAlgorithm {
        +string Name
        +void Execute(Inventory inventory)
    }

    class AdvancedStochasticAlgorithm {
        +string Name
        +void Execute(Inventory inventory)
    }

    class InventorySystemFactory {
        +InventorySystem CreateSystem(string systemVersion, Inventory inventory)
    }

    IAlgorithm <|-- SimpleDeterministicAlgorithm
    IAlgorithm <|-- AdvancedStochasticAlgorithm

    AlgorithmManager "1" o-- "*" IAlgorithm
    InventorySystem "1" *-- "1" Inventory
    InventorySystem "1" o-- "1" IAlgorithm

    Inventory "1" o-- "*" Product
    Inventory "1" o-- "*" Warehouse

    InventorySystemFactory "1" o-- "*" AlgorithmManager
