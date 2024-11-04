import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthJwtModule } from './auth_jwt/auth_jwt.module';

@Module({
  imports: [AuthJwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
