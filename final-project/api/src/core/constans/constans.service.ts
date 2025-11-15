import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConstansService {
  private readonly apiPort: number;
  private readonly secretKey: string;
  private readonly swaggerRute: string;
  private readonly resendApiKey: string;
  private readonly databaseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiPort = this.configService.get<number>('API_PORT', 3000);
    this.swaggerRute = this.configService.get<string>('SWAGGER_RUTE', '');
    this.secretKey = this.configService.get<string>('SECRET_KEY', '');
    this.resendApiKey = this.configService.get<string>('RESEND_API_KEY', '');
    this.databaseUrl = this.configService.get<string>('DATABASE_URL', '');
  }

  getApiPort(): number { return this.apiPort; }
  getSecretKey(): string { return this.secretKey; }
  getSwaggerRute(): string { return this.swaggerRute; }
  getResendApiKey(): string { return this.resendApiKey; }
  getdatabaseUrl(): string { return this.databaseUrl; }
}
