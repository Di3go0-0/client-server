export const ROOMS = {
  MESSAGES: (roomId: number) => `messages:room:${roomId}`,
  USERS: (roomId: number) => `users:room:${roomId}`,
  USERS_GLOBAL: 'users:global',
} as const;

export const EVENTS = {
  // Auth
  AUTH_LOGIN: 'auth.login',
  AUTH_REGISTER: 'auth.register',
  
  // Messages
  MESSAGE_SUBSCRIBE: 'messages.subscribe',
  MESSAGE_SEND: 'message.send',
  MESSAGE_SUBSCRIPTION: 'messages.subscription',
  
  // Rooms
  ROOMS_LIST: 'rooms.list',
  ROOM_CREATED: 'room.created',
  ROOM_UPDATED: 'room.updated',
  ROOM_JOIN: 'room.join',
  ROOM_LEAVE: 'room.leave',
  
  // Users
  USERS_UPDATED: 'users.updated',
  USERS_ROOM_UPDATED: (roomId: number) => `users.room.updated:${roomId}`,
  USERS_GLOBAL_SUBSCRIBE: 'users.global.subscribe',
  USERS_ROOM_SUBSCRIBE: 'users.room.subscribe',
} as const;

export const ERRORS = {
  INVALID_TOKEN: 'Invalid token',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Unauthorized',
  ROOM_NOT_FOUND: 'Room not found',
} as const;