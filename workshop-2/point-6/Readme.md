# 🧵 Juego de Hilos en .NET

## 📌 Enunciado del problema

Se requiere un programa en **.NET** que ejecute **10 hilos**.
Cada hilo debe generar y sumar **100 números aleatorios entre 1 y 1000**.
Una vez que todos los hilos finalicen, se debe mostrar el resultado de cada uno y determinar **qué hilo obtuvo la suma más alta**. Ese hilo será el ganador.

---

## 📌 Solución planteada

La solución se dividió en diferentes clases estáticas para mantener la **separación de responsabilidades**:

- **`RandomGenerator`**
  - Se encarga de generar números aleatorios de manera segura entre múltiples hilos.
  - Se utilizó un `lock` para evitar problemas de concurrencia con el objeto `Random`.

- **`SumCalculator`**
  - Calcula la suma de 100 números aleatorios llamando a `RandomGenerator`.
  - Encapsula la lógica de cálculo, de forma que los hilos solo invocan esta clase.

- **`GameManager`**
  - Crea y gestiona los 10 hilos.
  - Almacena los resultados en un arreglo.
  - Espera que todos los hilos finalicen (`Join`).
  - Determina el hilo ganador comparando los resultados.

- **`Program`**
  - Es el punto de entrada (`Main`).
  - Llama al `GameManager` para ejecutar todo el flujo.

---

## 📌 Técnicas utilizadas

1. **Programación con Hilos (`Thread`)**
   - Se utilizó la clase `System.Threading.Thread` para crear y manejar los hilos.
   - Cada hilo ejecuta de forma independiente la suma de los 100 números.

2. **Sincronización (`lock`)**
   - El objeto `Random` no es seguro para múltiples hilos.
   - Por eso, se protegió con un `lock` dentro de `RandomGenerator`, garantizando que un hilo a la vez acceda al generador de números.

3. **Arreglos compartidos**
   - Los resultados de cada hilo se almacenan en un arreglo compartido (`int[] results`).
   - Como cada hilo escribe en una posición única, no fue necesario usar bloqueos adicionales.

4. **Esperar finalización (`Join`)**
   - Se usó `thread.Join()` para que el programa principal espere hasta que cada hilo termine antes de calcular el ganador.

5. **Separación de responsabilidades (principio SOLID: SRP)**
   - Cada clase tiene una única responsabilidad clara.
   - Esto hace que el código sea más limpio y mantenible.

---

## 📌 Ejemplo de salida

```
Starting the game with 10 threads...

Thread 1 finished with result: 48123
Thread 4 finished with result: 50012
Thread 7 finished with result: 49876
Thread 2 finished with result: 50231
Thread 5 finished with result: 48765
Thread 8 finished with result: 49321
Thread 3 finished with result: 49544
Thread 9 finished with result: 48990
Thread 6 finished with result: 50100
Thread 10 finished with result: 48650

🏆 The winner is Thread 2 with result 50231
```

---

## 📌 Conclusión

Este ejercicio muestra cómo manejar **concurrencia** en .NET con hilos, asegurando el acceso seguro a recursos compartidos mediante **sincronización** (`lock`).
Además, ejemplifica buenas prácticas de diseño, como la **separación de responsabilidades**, logrando un código claro, modular y mantenible.
