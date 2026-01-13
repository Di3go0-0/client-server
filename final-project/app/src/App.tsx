
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './guards/RequiredAuth';
import { RequireUnauth } from './guards/RequiredUnauth';
import { Login } from './views/Login';
import { Register } from './views/Register';
import ChatApp from './views/rooms/Rooms';
import { AuthProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WSContext';
import { ThemeProvider } from './context/ThemeProvider';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <WebSocketProvider>
            <Routes>
              <Route element={<RequireUnauth />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route path="/rooms" element={<ChatApp />} />
              </Route>
            </Routes>
          </WebSocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;