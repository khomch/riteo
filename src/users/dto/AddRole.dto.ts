import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: "admin", description: "Add role" })
  @IsString({ message: "Should be a string" })
  readonly value: string;

  @ApiProperty({ example: "77", description: "User ID" })
  @IsNumber({}, { message: "Should be a number" })
  readonly userId: number;
}
