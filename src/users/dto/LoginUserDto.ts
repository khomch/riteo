import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

enum PasswordLength {
  MIN = 4,
  MAX = 32,
}

export class LoginUserDto {
  @ApiProperty({ example: "user@gmail.com", description: "Email" })
  @IsString({ message: "Should be a string" })
  @IsEmail({}, { message: "Invalid email address" })
  readonly email: string;

  @ApiProperty({ example: "qwerty!23", description: "Password" })
  @IsString({ message: "Should be a string" })
  @Length(PasswordLength.MIN, PasswordLength.MAX, {
    message: `Password length should be between ${PasswordLength.MIN} and ${PasswordLength.MAX} chars`,
  })
  readonly password: string;

}
