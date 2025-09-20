# Productor - Consumidor en Python

## 📌 Descripción

Este proyecto implementa el **problema clásico del Productor-Consumidor** utilizando hilos en Python.  
Se crean dos tipos de hilos:

- **Productores**: generan números aleatorios y los insertan en una cola compartida.
- **Consumidores**: extraen esos números de la cola y los procesan (en este caso, solo los muestran en pantalla).

La cola compartida tiene un tamaño máximo (`BUF_SIZE = 10`) para simular un buffer limitado.

---

## 🎯 Objetivo

El objetivo del ejercicio es **entender cómo coordinar múltiples hilos que comparten un recurso común** (la cola).  
En particular:

- Los productores no deben insertar datos si la cola está llena.
- Los consumidores no deben intentar extraer datos si la cola está vacía.

---

## ⚠️ Problema

Cuando varios hilos acceden a un mismo recurso compartido, aparece el riesgo de **condiciones de carrera**.  
Por ejemplo:

- Dos productores podrían intentar insertar al mismo tiempo.
- Dos consumidores podrían intentar extraer simultáneamente.
- Un hilo podría comprobar si la cola está vacía o llena, pero justo después otro hilo la modifica, causando inconsistencias.

---

## ✅ Solución aplicada

En Python, la librería `queue.Queue` ya incluye un **sistema interno de sincronización**:

- `q.put(item)` bloquea automáticamente si la cola está llena hasta que haya espacio.
- `q.get()` bloquea automáticamente si la cola está vacía hasta que haya elementos.

Gracias a esto, **no es necesario agregar `Locks` manuales** para proteger la región crítica en esta implementación.

---

## 📌 Respuesta a la pregunta

> **Si fuese necesario dotar el archivo `Productor-consumidor.py` de algún sistema de sincronismo o protección de la región crítica, ¿en qué lugar tendría cabida?**

La protección tendría que aplicarse en las operaciones de acceso al recurso compartido:

- Al **insertar un elemento** en el buffer (operación de los productores).
- Al **extraer un elemento** del buffer (operación de los consumidores).

Sin embargo, como se está usando `queue.Queue`, estas operaciones ya están protegidas internamente.  
Si en lugar de `queue.Queue` se utilizara una estructura no sincronizada como `list`, entonces habría que usar un `Lock` en las secciones de código donde se hace `append()` o `pop()`.

---

## 🔹 Antes (con `queue.Queue`, ya sincronizado)

En este caso, no hace falta protección manual porque `queue.Queue` ya gestiona los accesos concurrentes:

```python
# Productor
item = random.randint(1, 10)
q.put(item)  # Se bloquea solo si está lleno
logging.debug(f'Insertando "{item}" : {q.qsize()} elementos en la cola')

# Consumidor
item = q.get()  # Se bloquea solo si está vacío
logging.debug(f'Sacando "{item}" : {q.qsize()} elementos en la cola')
```

---

## 🔹 Después (si usáramos una lista normal → necesitamos Lock)

Aquí sí sería necesario proteger la **región crítica** (las operaciones `append` y `pop`) con un `Lock`.

```python
lock = threading.Lock()
buffer = []

# Productor (con Lock)
item = random.randint(1, 10)
with lock:   # Protege el acceso a la lista compartida
    buffer.append(item)
    logging.debug(f'Insertando "{item}" : {len(buffer)} elementos en el buffer')

# Consumidor (con Lock)
with lock:   # Protege el acceso a la lista compartida
    item = buffer.pop(0)
    logging.debug(f'Sacando "{item}" : {len(buffer)} elementos en el buffer')
```

---

## ✅ Conclusión

- **Con `queue.Queue`**: no necesitas sincronización manual → `put()` y `get()` ya están protegidos.
- **Con `list` (u otra estructura no sincronizada)**: debes usar un `Lock` alrededor de las operaciones de inserción y extracción, porque esas son las **regiones críticas**.
