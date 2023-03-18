import { ApiProperty } from '@nestjs/swagger';

export class UploadAvatarDto {

  @ApiProperty({ example: "77", description: "User ID" })
  readonly userId: number;

  @ApiProperty({ example: "avatar.jpg", description: "User Avatar" })
  readonly avatar: string;

}
