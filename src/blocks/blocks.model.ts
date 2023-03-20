import {
  BelongsTo,
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Article } from '../articles/articles.model';

interface BlockCreationAttrs {
  type: string;
  title: string;
  paragraphs: string[];
  articleId: number;
}

@Table({ tableName: "blocks" })
export class Block extends Model<Block, BlockCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique Identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Text", description: "Block type" })
  @Column({type: DataType.STRING, allowNull: false})
  type: string;

  @ApiProperty({ example: "This is block", description: "Block title" })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: "This is text", description: "Block paragraphs" })
  @Column({ type: DataType.JSON, allowNull: false })
  paragraphs: string[];

  @ApiProperty({ example: "1", description: "Article ID" })
  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER })
  articleId: number;

  @BelongsTo(() => Article)
  article: Article
}
