import {
  BelongsTo,
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from '../users/users.model';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique Identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Title", description: "Post title" })
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string;

  @ApiProperty({ example: "Some content", description: "Post text" })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;


  @ApiProperty({ example: "Image", description: "Post image" })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: "77", description: "User ID" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User

}
