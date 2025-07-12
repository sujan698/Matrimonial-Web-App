import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { VerifiedCallback } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor (
        private readonly authService:AuthService
    ){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email','profile'],
        });
    }
    async validate(accessToken:string,refreshToken:string, profile:any, done:VerifiedCallback){
       console.log({profile});
       const user =await this.authService.validateGoogleUser({
           email: profile.emails[0].value,
           fullname: profile.displayName,
           googleId: profile.id,
           dob: "",
           password: "",
           gender: "Male"
       });
         done(null,user);
    }
}