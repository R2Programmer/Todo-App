import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { ExtractJwt ,Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService){
        super({
           jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
           ignoreExpiration : false,
           secretOrKey: configService.get("JWT_SECRET"),
        }); 
    }
    async validate(payload : any){
        return {
            userId: payload.userId,
            firstName : payload.firstName,
            lastName: payload.lastName,
            email : payload.email,
            role: payload.role,
        };
    }
}