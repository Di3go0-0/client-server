import { Injectable } from '@nestjs/common';
import { UserType } from '../types/user.type';

@Injectable()
export class UsersService {
  private usersConnected: Map<string, UserType> = new Map();

  addUser(clientId: string, userId: UserType) {
    this.usersConnected.set(clientId, userId);
  }

  isUserLinked(clientId: string): boolean {
    return this.usersConnected.has(clientId);
  }

  removeUser(clientId: string) {
    this.usersConnected.delete(clientId);
  }

  getUserById(userId: number): UserType | undefined {
    for (const [_, user] of this.usersConnected) {
      if (user.id === userId) {
        return user;
      }
    }
    return undefined;
  }

  getUser(clientId: string): UserType | undefined {
    return this.usersConnected.get(clientId);
  }

  getAllUsers(): Map<string, UserType> {
    return this.usersConnected;
  }
}
