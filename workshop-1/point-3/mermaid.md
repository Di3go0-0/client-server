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

    class IAlgorithmProvider {
        +IAlgorithm? GetAlgorithm(string name)
        +void RegisterAlgorithm(string name, Func~IAlgorithm~ creator)
    }

    class AlgorithmProvider {
        -Dictionary~string, Func~IAlgorithm~~ algorithms
        +IAlgorithm? GetAlgorithm(string name)
        +void RegisterAlgorithm(string name, Func~IAlgorithm~ creator)
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
        -IAlgorithmProvider algorithmProvider
        +InventorySystemFactory(IAlgorithmProvider algorithmProvider)
        +InventorySystem CreateSystem(string systemVersion, Inventory inventory)
    }

    %% Relaciones
    IAlgorithm <|-- SimpleDeterministicAlgorithm
    IAlgorithm <|-- AdvancedStochasticAlgorithm

    IAlgorithmProvider <|.. AlgorithmProvider

    InventorySystem "1" *-- "1" Inventory
    InventorySystem "1" o-- "1" IAlgorithm

    Inventory "1" o-- "*" Product
    Inventory "1" o-- "*" Warehouse

    InventorySystemFactory "1" o-- "1" IAlgorithmProvider
