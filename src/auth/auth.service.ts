import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/СreateUser.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
import { LoginUserDto } from '../users/dto/LoginUserDto';
import { LoginByUsernameDto } from '../users/dto/LoginByUsernameDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jswService: JwtService
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async loginByUsername(userDto: LoginByUsernameDto) {
    const user = await this.validateUserByUsername(userDto);
    return this.generateToken(user);
  }

  async signup(userDto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(userDto.email);

    if (candidate) {
      throw new HttpException("User already exists ", HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jswService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUsersByEmail(userDto.email);
    const isPasswordsEqual = await bcrypt.compare(
      userDto.password,
      user.password
    );

    if (user && isPasswordsEqual) {
      return user;
    }

    throw new UnauthorizedException({
      message: "Incorrect email address or password, please try again",
    });
  }

  private async validateUserByUsername(userDto: LoginByUsernameDto) {
    const user = await this.userService.getUsersByUsername(userDto.username);
    const isPasswordsEqual = await bcrypt.compare(
      userDto.password,
      user.password
    );

    if (user && isPasswordsEqual) {
      return user;
    }

    throw new UnauthorizedException({
      message: "Incorrect username or password, please try again",
    });
  }
}
