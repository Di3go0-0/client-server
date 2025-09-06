namespace observer.src.Interfaces;

using observer.src.Interfaces;

public interface ISubject
{
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify();
}
