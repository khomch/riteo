import {
  Body,
  Controller,
  Get,
  Post,
  Put, Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/СreateUser.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesType } from "../roles/types/rolesType";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/AddRole.dto";
import { BanUserDto } from "./dto/BanUser.dto";
import { UploadAvatarDto } from "./dto/UploadAvatar.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

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

  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Put("/profile")
  updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateUser(dto);
  }

  @ApiOperation({ summary: "UploadAvatar" })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Post("/avatar")
  @UseInterceptors(FileInterceptor("avatar"))
  uploadAvatar(@Body() dto: UploadAvatarDto, @UploadedFile() image) {
    return this.userService.uploadAvatar(dto, image);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(RolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Get user's Profile" })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Get("/profile")
  getProfile(@Req() req ) {
    return this.userService.getProfile(req.headers);
  }

  @ApiOperation({ summary: "Add role" })
  @ApiResponse({ status: 200 })
  @Roles(RolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Ban user" })
  @ApiResponse({ status: 200 })
  @Roles(RolesType.ADMIN)
  @UseGuards(RolesGuard)
  @Post("/ban")
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
