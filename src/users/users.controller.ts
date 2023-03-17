import { Body, Controller, Get, Post, UploadedFile, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/СreateUser.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { Roles } from '../auth/roles-auth.decorator';
import { RolesType } from '../roles/types/rolesType';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/AddRole.dto';
import { BanUserDto } from './dto/BanUser.dto';
import { UploadAvatarDto } from './dto/UploadAvatar.dto';

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "Create new User" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(RolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Add role" })
  @ApiResponse({ status: 200 })
  @Roles(RolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Ban user" })
  @ApiResponse({ status: 200 })
  @Roles(RolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/ban')
  Ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }

  @ApiOperation({ summary: "UploadAvatar" })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Post('/avatar')
  UploadAvatar(@Body() dto: UploadAvatarDto,
               @UploadedFile() image) {
    return this.userService.uploadAvatar(dto, image);
  }
}
