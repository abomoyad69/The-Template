import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/Users';
import { CryptoService } from 'src/services/crypto/crypto.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constatns';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360000000000s' }, // TODO refresh token
    }),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, CryptoService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
