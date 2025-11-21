import { Body, Controller, Post, Request, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/core/jwt-guard/jwt-guard.service';

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

  @ApiBearerAuth('Token')
  @UseGuards(JwtGuardService)
  @Get('userInfo')
  async getUserInfo(@Request() req: any) {
    return this.authService.getUserInfo(req.user.id);
  }
}
