import {
  BelongsToMany,
  Column,
  DataType, HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Post } from '../posts/posts.model';
import { Article } from '../articles/articles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  avatar: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique Identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "user@gmail.com", description: "Email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "qwerty!23", description: "Password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "John", description: "First name" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  first: string;

  @ApiProperty({ example: "Doe", description: "Last name" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  lastname: string;

  @ApiProperty({ example: "42", description: "Age" })
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: null })
  age: number;

  @ApiProperty({ example: "USD", description: "Currency" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: "USD" })
  currency: string;

  @ApiProperty({ example: "USA", description: "Country" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  country: string;

  @ApiProperty({ example: "New York", description: "City" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  city: string;

  @ApiProperty({ example: "johndoesuper", description: "Username" })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  username: string;

  @ApiProperty({ example: "Avatar", description: "Avatar image" })
  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @ApiProperty({ example: "true", description: "Is user banned" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({
    example: "Banned for being rude",
    description: "A reason for user being banned",
  })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  bannedReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Article)
  articles: Article[];
}
