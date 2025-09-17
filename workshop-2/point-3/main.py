import threading
import time


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

