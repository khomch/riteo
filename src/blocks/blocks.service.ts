import { Injectable } from "@nestjs/common";
import { CreateBlockDto } from "./dto/CreateBlock.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Block } from "./blocks.model";

@Injectable()
export class BlocksService {

  constructor(@InjectModel(Block) private blockRepository: typeof Block) {}

  async create(dto: CreateBlockDto, articleId) {
    const block = await this.blockRepository.create({ title: dto.title, articleId, paragraphs: ['1', '2', '3'], type: dto.type });
    // const updatedBlock = await block.update('paragraphs', )
    console.log(JSON.stringify(block.paragraphs))
    return block;
  }
}
