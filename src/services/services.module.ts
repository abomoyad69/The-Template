import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CryptoService } from "./crypto/crypto.service";
import { MyLogger } from "./logger/my-logger";

@Module({
  controllers: [],
  providers: [CryptoService, MyLogger],
  imports: [],
  exports: [CryptoService],
})
export class ServicesModule {}
