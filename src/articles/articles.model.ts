import {
  BelongsTo,
  Column,
  DataType, ForeignKey, HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from '../users/users.model';
import { Block } from '../blocks/blocks.model';

interface ArticleCreationAttrs {
  title: string;
  subtitle: string;
  image: string;
  views: number;
  type: string;
  userId: number;
  content: string;
}

@Table({ tableName: "articles" })
export class Article extends Model<Article, ArticleCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique Identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Title", description: "Article title" })
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({ example: "Subtitle", description: "Article subtitle" })
  @Column({ type: DataType.STRING, allowNull: false })
  subtitle: string;

  @ApiProperty({ example: "Image", description: "Article image" })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: "42", description: "Views" })
  @Column({ type: DataType.INTEGER })
  views: number;

  @ApiProperty({ example: "Image", description: "Article image" })
  @Column({ type: DataType.STRING })
  type: string;

  @ApiProperty({ example: "77", description: "User ID" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ example: "Some content", description: "Post text" })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @HasMany(() => Block)
  blocks: Block[];

  @BelongsTo(() => User)
  author: User
}
