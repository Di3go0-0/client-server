# 📌 Administrador de Procesos en .NET

## 📝 Descripción del problema

Se requiere un programa en .NET que permita **gestionar procesos del sistema**.
El programa debe ser capaz de:

1. **Listar los procesos en ejecución** mostrando su nombre y su identificador único (**PID**).
2. **Solicitar al usuario un PID** específico.
3. **Eliminar (matar)** el proceso que corresponda a ese PID.

Este ejercicio es útil para comprender cómo .NET interactúa con el sistema operativo y cómo manejar procesos desde código.

---

## 💡 Solución planteada

La solución se implementó de forma **modular**, separando las responsabilidades en distintas clases, cada una en su propio archivo:

- **`ProcessLister`**
  Encargada de obtener y mostrar en consola todos los procesos en ejecución con su PID y nombre.

- **`UserInputHandler`**
  Responsable de interactuar con el usuario para pedir el PID del proceso que se desea eliminar.

- **`ProcessKiller`**
  Contiene la lógica para buscar un proceso por su PID y finalizarlo de forma segura.

- **`Program`**
  Clase principal que orquesta la ejecución: primero lista los procesos, luego solicita un PID y finalmente intenta eliminarlo.

---

## 🛠️ Técnicas utilizadas

- **`System.Diagnostics.Process`**: para acceder a los procesos del sistema (listar, obtener por PID y eliminarlos).
- **Control de excepciones (`try/catch`)**: manejo de errores cuando el proceso no puede ser terminado o el PID no es válido.
- **Diseño modular**: separación de responsabilidades en distintas clases estáticas para mantener el código claro y escalable.

---

## ▶️ Ejecución del programa

1. Al iniciar, se listan todos los procesos en ejecución.
2. El usuario debe introducir el **PID** de un proceso.
3. El programa intentará eliminar dicho proceso y mostrará el resultado en consola.

⚠️ **Nota importante:** Para eliminar algunos procesos del sistema es necesario ejecutar la aplicación con permisos de administrador.
