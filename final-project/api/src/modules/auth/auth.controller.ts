import { Body, Controller, Post, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth('Token')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }
  @Post('login')
  async loginRequest(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  async registerUserDefault(@Body() body: RegisterDto): Promise<number> {
    return this.authService.registerUser(body);
  }

  @Post('userInfo')
  async getUserInfo(@Request() req: any): Promise<number> {
    return this.authService.getUserInfo(req.user.id);
  }


}
