# 🧵 Hilos en .NET – Generación y manipulación de números aleatorios

## 📌 Enunciado del problema

Se requiere implementar un programa en **.NET** que utilice **hilos** para trabajar de manera concurrente con una lista de números:

1. **Hilo generador**  
   Debe generar números aleatorios entre **1 y 100** e insertarlos en una lista compartida.

2. **Hilo sustituidor**  
   Recorre la lista de forma circular y sustituye aquellos números que terminen en **0** por el valor **n - 1**.  
   Ejemplo: si el número es `50`, se reemplaza por `49`.

3. **Hilo supervisor**  
   Verifica constantemente la suma de todos los elementos de la lista.  
   Cuando dicha suma supera **20000**, debe detener los otros dos hilos y finalizar el programa.

---

## 🛠️ Solución planteada

La solución fue implementada en **C# (.NET)** utilizando **hilos (`Thread`)** y dividiendo las responsabilidades en clases estáticas:

- **`SharedData`** → Contiene la lista compartida, el mecanismo de sincronización (`lock`) y el estado global de ejecución.
- **`NumberGenerator`** → Se encarga de generar los números aleatorios y añadirlos a la lista.
- **`NumberReplacer`** → Recorre la lista circularmente y modifica los números terminados en `0`.
- **`Supervisor`** → Calcula la suma de la lista y detiene la ejecución cuando supera `20000`.
- **`Program`** → Orquesta la creación y ejecución de los tres hilos.

---

## 📂 Organización del código

El programa está dividido en varias clases estáticas para cumplir con el principio de **responsabilidad única**:

.
├── Program.cs # Punto de entrada, lanza los hilos
├── SharedData.cs # Datos compartidos y sincronización
├── NumberGenerator.cs # Generador de números aleatorios
├── NumberReplacer.cs # Sustituidor de números terminados en 0
└── Supervisor.cs # Controlador que detiene el sistema

````

---

## 🚀 Ejecución

Compilar y ejecutar el programa:

```bash
dotnet run
````

Ejemplo de salida:

```
⚠️ Suma superó 20000, deteniendo hilos...
Proceso terminado. Suma final: 20045
```

---

## 📖 Conceptos aplicados

- **Programación concurrente con hilos en .NET**
- **Bloqueos (`lock`)** para evitar condiciones de carrera
- **Recorrido circular** en una lista compartida
- **Encapsulación de responsabilidades** en clases separadas

---

## ✅ Conclusión

Este ejercicio permite entender cómo manejar **hilos concurrentes en .NET**, compartir información de forma segura entre ellos y **sincronizar la finalización** mediante un hilo supervisor.
Además, la separación en clases estáticas mejora la **claridad, mantenibilidad y extensibilidad** del código.
