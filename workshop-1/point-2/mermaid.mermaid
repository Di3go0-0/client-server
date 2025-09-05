classDiagram
direction LR

    class IProduct {
        <<interface>>
        +string Name
        +decimal BasePrice
    }

    class Product {
        +string Name
        +decimal BasePrice
    }

    class ICreditCard {
        <<interface>>
        +string Brand
        +string IssuerBank
    }

    class CreditCard {
        +string Brand
        +string IssuerBank
    }

    class IInterestCalculationStrategy {
        <<interface>>
        +decimal CalculateInterestRate(CreditCard card, int installments)
    }

    class VisaBancolombiaStrategy {
        +decimal CalculateInterestRate(CreditCard card, int installments)
    }

    class MasterBCSStrategy {
        +decimal CalculateInterestRate(CreditCard card, int installments)
    }

    class IInstallmentCalculator {
        <<interface>>
        +InstallmentCalculationResult Calculate(IProduct product, CreditCard card, int installments, IInterestCalculationStrategy strategy)
    }

    class InstallmentCalculator {
        -IInterestCalculationStrategy _strategy
        +InstallmentCalculationResult Calculate(IProduct product, CreditCard card, int installments)
    }

    class InstallmentCalculationResult {
        +decimal SpotPrice
        +decimal InstallmentPrice
        +decimal MonthlyInstallmentAmount
        +decimal InterestRateApplied
    }

    Product --|> IProduct : implements
    CreditCard --|> ICreditCard : implements

    VisaBancolombiaStrategy --|> IInterestCalculationStrategy : implements
    MasterBCSStrategy --|> IInterestCalculationStrategy : implements

    InstallmentCalculator --|> IInstallmentCalculator : implements
    InstallmentCalculator ..> IInterestCalculationStrategy : uses

    IInstallmentCalculator "1" --> "1" InstallmentCalculationResult : returns

    class PaymentProcessor {
        -IInstallmentCalculator _calculator
        -IInterestCalculationStrategy _defaultStrategy
        +PaymentProcessor(IInstallmentCalculator calculator, IInterestCalculationStrategy defaultStrategy)
        +InstallmentCalculationResult ProcessPayment(IProduct product, ICreditCard card, int installments)
    }

    PaymentProcessor ..> IInstallmentCalculator : uses
    PaymentProcessor ..> IProduct : uses
    PaymentProcessor ..> ICreditCard : uses
    PaymentProcessor ..> IInterestCalculationStrategy : uses
