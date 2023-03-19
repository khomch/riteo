import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginByUsernameDto } from '../users/dto/LoginByUsernameDto';

@ApiTags("AuthLoginController")
@Controller("/login")
export class AuthLoginController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() userDto: LoginByUsernameDto) {
    return this.authService.loginByUsername(userDto);
  }
}
