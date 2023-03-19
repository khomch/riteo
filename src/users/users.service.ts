import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/СreateUser.dto";
import { RolesService } from "../roles/roles.service";
import { RolesType } from "../roles/types/rolesType";
import { AddRoleDto } from "./dto/AddRole.dto";
import { BanUserDto } from "./dto/BanUser.dto";
import { UploadAvatarDto } from "./dto/UploadAvatar.dto";
import { FilesService } from "../files/files.service";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  "email": string,
  "id": number,
  "roles": Record<any, any>[],
  "iat": number,
  "exp": number
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private rolesService: RolesService,
    private filesService: FilesService,
    private jwtService: JwtService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue(RolesType.ADMIN);
    await user.$set("roles", [role.id]);
    user.roles = [role];

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getProfile(req) {
    const token: string = req.authorization.replace('Bearer ', '').replace(/['"]+/g, '');
    const jwtData = await this.jwtService.decode(token) as JwtPayload;
    const id: number = jwtData.id;
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async getUsersByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      include: { all: true },
    });

    return user;
  }

  async getUsersByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      include: { all: true },
    });

    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
  }

  async updateUser(dto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(dto.id);
    if (user) {
      await user.update(
        dto,
        { where: { ...user } }
      );
      return user;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async uploadAvatar(dto: UploadAvatarDto, image: any) {
    const user = await this.userRepository.findByPk(dto.userId);
    const fileName = await this.filesService.createFile(image);

    if (user && fileName) {
      user.avatar = fileName;
      await user.save();
      return user;
    }
    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.bannedReason = dto.bannedReason;

    await user.save();

    return user;
  }
}
