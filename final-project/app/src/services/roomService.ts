import { ApiClient } from '../services/apiClient';
import { Room, CreateRoomRequest, UpdateRoomRequest } from '../types/api.types';

export class RoomService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = ApiClient.getInstance();
  }

  async getAllRooms(): Promise<Room[]> {
    return await this.apiClient.getRooms();
  }

  async getUserRooms(): Promise<Room[]> {
    return await this.apiClient.getRoomsByUser();
  }

  async createRoom(data: CreateRoomRequest): Promise<Room> {
    return await this.apiClient.createRoom(data.name, data.description || '');
  }

  async updateRoom(data: UpdateRoomRequest): Promise<void> {
    await this.apiClient.updateRoom(data.roomId, data.name, data.description || '');
  }

  async joinRoom(roomId: number): Promise<void> {
    await this.apiClient.joinRoom(roomId);
  }

  async exitRoom(roomId: number): Promise<void> {
    await this.apiClient.exitRoom(roomId);
  }
}