namespace point_3.src.Interfaces;

// Interfaz que define el contrato para un warehouse/almacén
public interface IWarehouse
{
    string Name { get; set; }
    int Capacity { get; set; }
}

