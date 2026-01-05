import { Injectable, Logger } from '@nestjs/common';
import { UserType } from '../types/user.type';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly usersConnected = new Map<string, UserType>();
  private readonly userToClientMap = new Map<number, Set<string>>();

  addUser(clientId: string, user: UserType): void {
    this.usersConnected.set(clientId, user);
    
    if (!this.userToClientMap.has(user.id)) {
      this.userToClientMap.set(user.id, new Set());
    }
    this.userToClientMap.get(user.id)!.add(clientId);
    
    this.logger.debug(`User ${user.id} connected with client ${clientId}`);
  }

  removeUser(clientId: string): UserType | null {
    const user = this.usersConnected.get(clientId);
    if (!user) return null;

    this.usersConnected.delete(clientId);
    
    const clientSet = this.userToClientMap.get(user.id);
    if (clientSet) {
      clientSet.delete(clientId);
      if (clientSet.size === 0) {
        this.userToClientMap.delete(user.id);
      }
    }
    
    this.logger.debug(`User ${user.id} disconnected from client ${clientId}`);
    return user;
  }

  getUser(clientId: string): UserType | undefined {
    return this.usersConnected.get(clientId);
  }

  getUserById(userId: number): UserType | undefined {
    for (const user of this.usersConnected.values()) {
      if (user.id === userId) {
        return user;
      }
    }
    return undefined;
  }

  isUserOnline(userId: number): boolean {
    return this.userToClientMap.has(userId);
  }

  getUserClientIds(userId: number): string[] {
    return Array.from(this.userToClientMap.get(userId) || []);
  }

  getAllUsers(): UserType[] {
    return Array.from(this.usersConnected.values());
  }

  getConnectedUsersCount(): number {
    return this.usersConnected.size;
  }

  getOnlineUsersCount(): number {
    return this.userToClientMap.size;
  }
}