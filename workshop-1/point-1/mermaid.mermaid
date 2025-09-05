classDiagram
direction LR

    class ISort {
        <<interface>>
        +SortAlgorithm Algorithm
        +Sort(List<int> data, IComparer<int>? comparer)
    }

    class BubbleSort {
        +SortAlgorithm Algorithm
        +Sort(List<int> data, IComparer<int>? comparer)
    }

    class InsertionSort {
        +SortAlgorithm Algorithm
        +Sort(List<int> data, IComparer<int>? comparer)
    }

    class QuickSort {
        +SortAlgorithm Algorithm
        +Sort(List<int> data, IComparer<int>? comparer)
    }

    class IComparer~int~ {
        <<interface>>
        +Compare(int x, int y)
    }

    class AscComparer {
        +Compare(int x, int y)
    }

    class DescComparer {
        +Compare(int x, int y)
    }

    class SortAlgorithm {
        <<enum>>
        Bubble
        Insertion
        Quick
    }

    class SortContext {
        -ISort _strategy
        +Use(ISort strategy) SortContext
        +Execute(List<int> data, IComparer<int>? comparer)
    }

    class SortFactory {
        -Dictionary<SortAlgorithm, ISort> _strategies
        +Create(SortAlgorithm algorithm) ISort
    }

    %% Relaciones
    ISort <|.. BubbleSort
    ISort <|.. InsertionSort
    ISort <|.. QuickSort

    IComparer~int~ <|.. AscComparer
    IComparer~int~ <|.. DescComparer

    SortContext --> ISort
    SortContext --> IComparer~int~

    SortFactory --> ISort
    ISort --> SortAlgorithm
