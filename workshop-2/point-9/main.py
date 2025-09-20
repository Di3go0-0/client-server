from datetime import datetime, timedelta
import time
import uuid
import random
from concurrent.futures import ThreadPoolExecutor, as_completed


class OrdersManager:
    __orders = []
    __orders_processed = 0
    __last_printed_log = datetime.now()

    def __init__(self) -> None:
        self.__generate_fake_orders(quantity=1_000)

    def __generate_fake_orders(self, quantity):
        self.__log(f"Generating fake orders")
        self.__orders = [(uuid.uuid4(), x) for x in range(quantity)]
        self.__log(f"{len(self.__orders)} generated...")

    def __log(self, message):
        print(f"{datetime.now()} > {message}")

    def __fake_save_on_db(self, order):
        id, number = order
        # simulación de escritura en BD
        time.sleep(random.uniform(0, 1))
        return f"Order [{id}] {number} was successfully prosecuted."

    def process_orders(self, workers=20):
        with ThreadPoolExecutor(max_workers=workers) as executor:
            futures = [
                executor.submit(self.__fake_save_on_db, order)
                for order in self.__orders
            ]

            for i, future in enumerate(as_completed(futures), start=1):
                result = future.result()
                self.__orders_processed += 1

                if datetime.now() > self.__last_printed_log:
                    self.__last_printed_log = datetime.now() + timedelta(seconds=5)
                    self.__log(
                        message=f"Total orders executed: {self.__orders_processed}/{len(self.__orders)}"
                    )


# ---
orders_manager = OrdersManager()

start_time = time.time()
orders_manager.process_orders(workers=50)  # ajusta el número de hilos según tu CPU
delay = time.time() - start_time

print(f"{datetime.now()} > Tiempo de ejecucion: {delay:.2f} segundos...")
