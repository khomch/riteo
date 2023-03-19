import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

enum PasswordLength {
  MIN = 4,
  MAX = 32,
}

export class LoginByUsernameDto {
  @ApiProperty({ example: "admin", description: "Username" })
  @IsString({ message: "Should be a string" })
  readonly username: string;

  @ApiProperty({ example: "qwerty!23", description: "Password" })
  @IsString({ message: "Should be a string" })
  @Length(PasswordLength.MIN, PasswordLength.MAX, {
    message: `Password length should be between ${PasswordLength.MIN} and ${PasswordLength.MAX} chars`,
  })
  readonly password: string;

}
