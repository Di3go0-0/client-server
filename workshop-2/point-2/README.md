# Threading Exercise in .NET

## 📌 Problem

Create a program in **.NET** that:

1. Starts a worker thread which receives two integers (`n1`, `n2`) and prints the sequence between them if `n1 < n2`.
2. The main thread calculates and prints the subtraction `n1 - n2`.
3. The numbers are passed as **command line arguments**.
4. The logic for printing the sequence is implemented in a separate **static class**.

---

## 📂 Project Structure

```
.
├── Program.cs
└── SequencePrinter.cs (inside Program as a static class)
```

---

## 🧩 Code Explanation

- **Main Thread (`Program`)**
  - Reads two integers from `args`.
  - Creates and starts a new thread to print the sequence.
  - Calculates and displays the subtraction.

- **Worker Thread (`SequencePrinter`)**
  - Prints the sequence from `n1` to `n2` if `n1 < n2`.
  - If not, it shows a message that the sequence cannot be generated.

---

## ▶️ How to Run

Compile and run the project using .NET:

```bash
dotnet run -- 3 10
```

---

## ✅ Example Output

```
[Main thread] The subtraction of 3 - 10 = -7
[Worker thread] Sequence between 3 and 10: 3 4 5 6 7 8 9 10
Program finished.
```

---

## 🔹 Notes

- If arguments are missing or not integers, the program will show an error message.
- The `Thread.Sleep(200)` simulates work being done in the worker thread.
- The program waits (`Join`) for the worker thread to complete before exiting.
