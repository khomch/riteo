import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType } from 'sequelize-typescript';
import { IsNumber } from 'class-validator';

export class UploadAvatarDto {

  @ApiProperty({ example: "77", description: "User ID" })
  readonly userId: number;

  // @ApiProperty({ example: "77", description: "User ID" })
  // @IsNumber({}, { message: "Should be a number" })
  // readonly userId: number;
}
