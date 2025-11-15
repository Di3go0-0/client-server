import { Module } from '@nestjs/common';
import { ConstansService } from './constans.service';

@Module({
  providers: [ConstansService],
  exports: [ConstansService]
})
export class ConstansModule { }
