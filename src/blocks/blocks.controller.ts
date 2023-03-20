import { Body, Controller, Post } from "@nestjs/common";
import { CreateBlockDto } from "./dto/CreateBlock.dto";
import { BlocksService } from "./blocks.service";

@Controller('blocks')
export class BlocksController {

  constructor(private blocksService: BlocksService) {}

  @Post()
  addBlock(@Body() dto: CreateBlockDto, articleId) {
    return this.blocksService.create(dto, articleId)
  }

}
