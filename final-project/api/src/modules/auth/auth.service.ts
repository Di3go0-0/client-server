import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from './repository';
import { LoginType, RegisterType } from './types';
import { JwtService } from 'src/core/jwt/jwt.service';
import { comparePassword, hashpassword } from './helpers';
import { AUTH_MESSAGES } from './constans';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) { }

  async registerUser(body: RegisterType): Promise<number> {
    const hashedPassword = await hashpassword(body.password);
    return this.authRepository.register({ ...body, password: hashedPassword })
  }

  async login(body: LoginType): Promise<{ token: string }> {
    return { token: 'asdfasdf' }
  }


  async getUserInfo(id: number): Promise<any> {
    return 'a'
  }


}
