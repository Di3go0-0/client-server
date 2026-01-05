export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Room {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
  createdAt?: string;
  updatedAt?: string;
  userCount?: number;
}

export interface Message {
  id: number;
  roomId: number;
  userId: number;
  message: string;
  username?: string;
  timestamp?: string;
  createdAt?: string;
}

export interface RoomUser {
  id: number;
  username: string;
  email: string;
  online: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface CreateRoomRequest {
  name: string;
  description?: string;
}

export interface UpdateRoomRequest {
  roomId: number;
  name: string;
  description?: string;
}

export interface SendMessageRequest {
  roomId: number;
  message: string;
}