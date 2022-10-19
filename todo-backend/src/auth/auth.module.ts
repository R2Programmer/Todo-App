import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport"
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import {JwtModule} from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        PassportModule, 
        UserModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              secret: configService.get('JWT_SECRET'),
              signOptions: {
                expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
              },
            }),
          }),
        ],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy]
})

export class AuthModule{}