import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/CreateArticle.dto';
import { CreateBlockDto } from '../blocks/dto/CreateBlock.dto';

@Controller('articles')
export class ArticlesController {

  constructor(private articlesService: ArticlesService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // createPost(@Body() dto: CreateArticleDto,
  //            @UploadedFile() image) {
  //   return this.articlesService.create(dto, image)
  // }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto)
  }

  @Get("/:id")
  getArticleById(@Param("id") id: number) {
    return this.articlesService.getArticleById(id);
  }

  @Post("/:id")
  addBlock(
    @Body() dto: CreateBlockDto,
    @Param("id") id: number) {
    return this.articlesService.addBlock(dto, id)
  }

}
