import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import { API_CONFIG, STORAGE_KEYS } from '../config/constants';

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );
  }

  public get axios(): AxiosInstance {
    return this.axiosInstance;
  }

  // Auth endpoints
  public async login(email: string, password: string) {
    const response = await this.axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response.data;
  }

  public async register(email: string, password: string, username: string) {
    const response = await this.axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      email,
      password,
      username,
    });
    return response.data;
  }

  public async getProfile() {
    const response = await this.axiosInstance.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    return response.data;
  }

  // Room endpoints
  public async getRooms() {
    const response = await this.axiosInstance.get(API_CONFIG.ENDPOINTS.ROOMS.LIST);
    return response.data;
  }

  public async getRoomsByUser() {
    const response = await this.axiosInstance.get(API_CONFIG.ENDPOINTS.ROOMS.BY_USER);
    return response.data;
  }

  public async createRoom(name: string, description: string) {
    const response = await this.axiosInstance.post(API_CONFIG.ENDPOINTS.ROOMS.CREATE, {
      name,
      description,
    });
    return response.data;
  }

  public async updateRoom(roomId: number, name: string, description: string) {
    const response = await this.axiosInstance.put(API_CONFIG.ENDPOINTS.ROOMS.UPDATE, {
      roomId,
      name,
      description,
    });
    return response.data;
  }

  public async exitRoom(roomId: number) {
    const response = await this.axiosInstance.delete(API_CONFIG.ENDPOINTS.ROOMS.EXIT, {
      data: { roomId },
    });
    return response.data;
  }

  public async joinRoom(roomId: number) {
    const response = await this.axiosInstance.post(API_CONFIG.ENDPOINTS.ROOMS.JOIN, {
      roomId,
    });
    return response.data;
  }

  // Message endpoints
  public async getMessagesByRoom(roomId: number) {
    const response = await this.axiosInstance.get(
      API_CONFIG.ENDPOINTS.MESSAGES.BY_ROOM(roomId)
    );
    return response.data;
  }

  public async sendMessage(roomId: number, message: string) {
    const response = await this.axiosInstance.post(API_CONFIG.ENDPOINTS.MESSAGES.SEND, {
      roomId,
      message,
    });
    return response.data;
  }
}