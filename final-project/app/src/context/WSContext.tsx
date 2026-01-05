import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_CONFIG, WS_EVENTS, STORAGE_KEYS } from '../config/constants';

interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  emit: (event: string, payload?: any) => void;
  on: (event: string, handler: (data: any) => void) => () => void;
  off: (event: string, handler?: (data: any) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) return;

    const newSocket = io(API_CONFIG.WS_URL, {
      transports: ['websocket', 'polling'],
      auth: { token },
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      setSocket(newSocket);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
      setSocket(null);
    });

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const emit = useCallback((event: string, payload?: any) => {
    if (socket) {
      socket.emit(event, payload);
    }
  }, [socket]);

  const on = useCallback((event: string, handler: (data: any) => void) => {
    if (socket) {
      socket.on(event, handler);
      return () => socket.off(event, handler);
    }
    return () => {};
  }, [socket]);

  const off = useCallback((event: string, handler?: (data: any) => void) => {
    if (socket) {
      socket.off(event, handler);
    }
  }, [socket]);

  const value: WebSocketContextType = {
    socket,
    isConnected,
    emit,
    on,
    off,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};