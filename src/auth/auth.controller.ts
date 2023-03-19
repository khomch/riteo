import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/СreateUser.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from '../users/dto/LoginUserDto';

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post("/signup")
  signup(@Body() userDto: CreateUserDto) {
    return this.authService.signup(userDto);
  }
}
