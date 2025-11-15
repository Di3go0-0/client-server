import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConstansModule } from './constans/constans.module';

@Module({
  imports: [DatabaseModule, ConstansModule],
})
export class CoreModule { }
