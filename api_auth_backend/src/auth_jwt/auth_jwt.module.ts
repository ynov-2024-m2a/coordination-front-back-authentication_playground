import { Module } from '@nestjs/common';
import { AuthJwtService } from './auth_jwt.service';
import { AuthJwtController } from './auth_jwt.controller';

@Module({
  providers: [AuthJwtService],
  controllers: [AuthJwtController]
})
export class AuthJwtModule {}
