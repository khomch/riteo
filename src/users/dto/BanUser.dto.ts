import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({ example: "77", description: "User ID" })
  readonly userId: number;

  @ApiProperty({ example: "true", description: "Unacceptable behaviour" })
  readonly bannedReason: string;
}
