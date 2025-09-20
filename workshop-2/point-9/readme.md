# Optimizando la ejecución de procesamiento de órdenes en Python

## 📌 Problema

El programa original generaba **1,000 órdenes falsas** y las procesaba una por una.  
Cada orden simulaba guardarse en una base de datos mediante un `time.sleep(random.uniform(0, 1))`, lo que introducía una espera de hasta 1 segundo por cada orden.

Esto generaba un **tiempo total de ejecución de alrededor de 9 minutos**, ya que el procesamiento era **secuencial** y no aprovechaba la capacidad de realizar varias tareas al mismo tiempo.

---

## ⚡ Solución

### ¿Por dónde se atacó?

El cuello de botella no estaba en la CPU, sino en la **espera de I/O** (simulada con `sleep`).  
Por eso se atacó el problema usando **hilos (Threading)** en lugar de procesos, ya que los hilos son ideales para este tipo de tareas I/O-bound.  
El **GIL de Python** no afecta aquí, porque durante el `sleep` se libera y otros hilos pueden avanzar.

---

### ¿Qué parte del código se reemplazó y por qué?

- **Antes**:  
  Se usaba un bucle `for` que recorría la lista de órdenes y llamaba directamente a `__fake_save_on_db`, bloqueando la ejecución hasta que terminaba cada `sleep`.

  ```python
  def process_orders(self):
      for order in self.__orders:
          self.__fake_save_on_db(order=order)
          self.__orders_processed += 1
          ...
  ```

- **Después**:
  Se reemplazó este bucle secuencial por un **ThreadPoolExecutor**, que permite ejecutar múltiples llamadas a `__fake_save_on_db` en paralelo.
  De esta forma, mientras un hilo está en `sleep`, otros pueden seguir avanzando.

  ```python
  from concurrent.futures import ThreadPoolExecutor, as_completed

  def process_orders(self, workers=50):
      with ThreadPoolExecutor(max_workers=workers) as executor:
          futures = [executor.submit(self.__fake_save_on_db, order) for order in self.__orders]

          for future in as_completed(futures):
              result = future.result()
              self.__orders_processed += 1
              ...
  ```

---

## 🚀 Resultados

- Tiempo original: **\~9 minutos**
- Tiempo optimizado con hilos (`max_workers=50`): **\~20 segundos**

La optimización se logró al **ejecutar órdenes en paralelo con hilos**, aprovechando mejor los tiempos de espera y reduciendo drásticamente el tiempo total de ejecución.
