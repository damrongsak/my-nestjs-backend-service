import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RateLimiterModule.register({
      for: 'Express',
      type: 'Memory',
      points: 10,
      duration: 60,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
