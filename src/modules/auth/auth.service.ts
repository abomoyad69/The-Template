/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/entities/Users';
import { RedisClient } from 'src/redis/redis.client';
import { CryptoService } from 'src/services/crypto/crypto.service';
import { ILike, Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,
    private cryptoService: CryptoService,
  ) { }
  private redisClient: RedisClient = RedisClient.getInstance();

  async login(user: any) {

  
    const userData: Users = user.user;
    const payload = { userID: userData.id, username: userData.nameEn, imagePath: userData.imagePath ?? '' };
    const token = this.jwtService.sign(payload);
    this.redisClient.broadcast('hset', token, 'logout', false);

    return { token };
  }

  async logout(token: any) {
    // redis
    this.redisClient.broadcast('hset', token, 'logout', true);
    return { message: 'Logged out يا حريمة' };
  }


  async findOne(username: string): Promise<Users | undefined> {
    return this.usersRepo.findOne({ where: { username } });
  }

  async validateUser(userCredential: string, pass: string): Promise<any> {// userCredential could be username or email
    userCredential = userCredential.trim().toLowerCase()
    const userInfo = await this.usersRepo.findOne({ where: [{ email: ILike(userCredential) }, { username: ILike(userCredential) }] });
    if (!userInfo) return null;
    let passwordString = userInfo.id + process.env['password'] + pass;
    const hashedPassword = this.cryptoService.encryptNew(passwordString);
    const encryptedPassword = { encryptedData: hashedPassword };
    let user;
    user = await this.usersRepo.findOne({ where: { username: ILike(userCredential), userPassword: encryptedPassword.encryptedData } });
    if (user && user.userPassword === encryptedPassword.encryptedData) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  JWTCutInHalf(token: string){
    try {
      return token.split('.')[2];
    }
    catch(err){
      console.log(err);
      return token;
    }
  }
}
