import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '../jwt/jwt.service';
import { TokenProps } from '../types/token.type';
import { DatabaseService } from '../database/database.service';
import { UserType } from 'src/modules/auth/types';
import { JwtSql } from './sql/jwt.sql';

declare module 'express' {
  interface Request {
    user?: TokenProps | {
      id: number;
      userName: string;
      email: string;
    } | null
  }
}

@Injectable()
export class JwtSocketGuardService implements CanActivate {
  private readonly logger = new Logger(JwtSocketGuardService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly dbService: DatabaseService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<any>();
    const token = client.handshake?.auth?.token;

    if (!token) {
      this.logger.warn('No token found in Authorization header');
      throw new UnauthorizedException('Authentication token required.');
    }

    try {
      const payload = await this.jwtService.verifyToken(token);

      const rows = await this.dbService.executeSelect<UserType>(JwtSql.GetUser, [payload.email, payload.id])

      const user = rows[0]

      if (!user) {
        this.logger.warn(`User with ID ${payload.id} from token not found or inactive.`);
        throw new UnauthorizedException('Unauthorized user.');
      }

      client.data = client.data || {};
      client.data.user = user;
    } catch (error) {
      this.logger.error(`Authentication error: ${error.message}`);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token.');
    }
    return true;
  }

}
