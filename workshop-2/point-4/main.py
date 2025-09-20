import threading
import time
import logging
import random
import queue

# Configuración del log para ver qué hacen los hilos
logging.basicConfig(
    level=logging.DEBUG,
    format="(%(threadName)-9s) %(message)s",
)

BUF_SIZE = 10
q = queue.Queue(BUF_SIZE)


class HiloProductor(threading.Thread):
    def __init__(self, name=None):
        super(HiloProductor, self).__init__(name=name)

    def run(self):
        while True:
            item = random.randint(1, 10)
            q.put(item)  # Se bloquea si la cola está llena
            logging.debug(f'Insertando "{item}" : {q.qsize()} elementos en la cola')
            time.sleep(random.random())


class HiloConsumidor(threading.Thread):
    def __init__(self, name=None):
        super(HiloConsumidor, self).__init__(name=name)

    def run(self):
        while True:
            item = q.get()  # Se bloquea si la cola está vacía
            logging.debug(f'Sacando "{item}" : {q.qsize()} elementos en la cola')
            time.sleep(random.random())


if __name__ == "__main__":
    # Crear productores
    p1 = HiloProductor(name="Productor-1")
    p2 = HiloProductor(name="Productor-2")

    # Crear consumidor
    c1 = HiloConsumidor(name="Consumidor-1")

    # Iniciar hilos
    p1.start()
    p2.start()
    c1.start()

    # Esperar a que terminen (en este caso, nunca terminan)
    p1.join()
    p2.join()
    c1.join()
