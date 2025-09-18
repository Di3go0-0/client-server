# 🧵 Manejo de Eventos con Hilos en Python

## 📌 Descripción del problema

El objetivo es trabajar con **hilos y señales** en Python utilizando la clase `threading.Event`.
Se parte de un programa donde:

- Un hilo (`genera_eventos`) activa una señal (`ev`) cada cierto tiempo.
- Otro hilo (`escribe_algo`) espera a que esa señal se active para imprimir un mensaje.

El inconveniente es que, una vez que el hilo productor (`genera_eventos`) completa todas sus iteraciones, el programa **nunca termina**, ya que el hilo consumidor (`escribe_algo`) se queda esperando indefinidamente en un bucle infinito.

---

## 🚨 Requisito

Modificar el código para que, **cuando `genera_eventos()` termine sus iteraciones**, el programa finalice de manera **genérica y controlada**, utilizando también señales (`Event`).

---

## ✅ Solución propuesta

Se introduce un **segundo `Event`**, llamado `fin`, que indica cuándo el productor ha terminado.

### Estrategia:

1. El productor (`genera_eventos`) activa `fin` cuando termina sus iteraciones.
2. El consumidor (`escribe_algo`) revisa si `fin` está activo después de cada señal:
   - Si no está activo, imprime `"hola"`.
   - Si está activo, rompe el ciclo y finaliza.

3. Se garantiza que el programa termine de forma limpia con `join()` en ambos hilos.

---

## 🖥️ Código final

```python
import threading
import time

"""
Ejemplo de uso de threading.Event para coordinar hilos.
Un hilo genera eventos y otro hilo imprime mensajes cuando estos ocurren.
El programa finaliza cuando el productor termina sus iteraciones.
"""

def genera_eventos():
    for x in range(5):
        time.sleep(2)
        ev.set()
    # cuando termino de generar, activo la señal de fin
    fin.set()
    ev.set()  # para despertar al consumidor si está esperando


def escribe_algo():
    while True:
        ev.wait()  # espera señal
        if fin.is_set():  # si ya no hay más eventos -> salir
            break
        print("hola")
        ev.clear()


# Señales
ev = threading.Event()
fin = threading.Event()

# Hilos
T1 = threading.Thread(target=genera_eventos)
T2 = threading.Thread(target=escribe_algo)

T1.start()
T2.start()

T1.join()
T2.join()
print("Programa terminado correctamente ✅")
```

---

## 📚 Conceptos clave

- **`threading.Event`**: permite sincronizar hilos mediante señales (booleanos).
- **`set()`**: activa la señal.
- **`clear()`**: desactiva la señal.
- **`wait()`**: bloquea hasta que la señal esté activa.
- **`is_set()`**: verifica si la señal está activa.

---

## 🏁 Resultado esperado

El programa imprime `"hola"` cada vez que se activa el evento.
Después de 5 repeticiones, el hilo productor activa la señal de finalización y el programa termina ordenadamente:

```
hola
hola
hola
hola
hola
Programa terminado correctamente ✅
```

---

¿Quieres que lo organice con un apartado final de **"Posibles mejoras"** (por ejemplo, usar `while not fin.is_set()` en lugar de `while True`)?
