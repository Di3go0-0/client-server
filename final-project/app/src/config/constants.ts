export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URI || 'http://localhost:3100',
  WS_URL: import.meta.env.VITE_WS_URI || 'http://localhost:3100',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile',
    },
    ROOMS: {
      LIST: '/rooms',
      BY_USER: '/rooms/by-user',
      CREATE: '/rooms/create',
      UPDATE: '/rooms',
      EXIT: '/rooms/exit',
      JOIN: '/rooms/join',
    },
    MESSAGES: {
      BY_ROOM: (roomId: number) => `/messages/room/${roomId}`,
      SEND: '/messages',
    },
  },
} as const;

export const WS_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  
  // Auth
  AUTH_LOGIN: 'auth.login',
  AUTH_REGISTER: 'auth.register',
  
  // Rooms
  GET_ROOMS: 'get_rooms',
  ROOMS_LIST: 'rooms_list',
  ROOM_CREATED: 'room_created',
  ROOM_UPDATED: 'room_updated',
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'left_room',
  
  // Messages
  MESSAGE_SEND: 'users-send.message',
  MESSAGE_SUBSCRIBE: 'messages.suscribe',
  MESSAGE_SUBSCRIPTION: 'messages.suscription',
  
  // Users
  USERS_GLOBAL_SUBSCRIBE: 'users.actives.subscribe',
  USERS_ROOM_SUBSCRIBE: 'users.room.subscribe',
  USERS_UPDATED: 'users.updated',
  USERS_ROOM_UPDATED: (roomId: number) => `users.room.updated.room_${roomId}`,
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_PROFILE: 'profile',
  THEME: 'theme',
} as const;