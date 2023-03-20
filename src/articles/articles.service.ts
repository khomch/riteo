import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { Article } from './articles.model';
import { CreateArticleDto } from './dto/CreateArticle.dto';
import { CreateBlockDto } from '../blocks/dto/CreateBlock.dto';
import { BlocksService } from '../blocks/blocks.service';
import { Block } from '../blocks/blocks.model';

@Injectable()
export class ArticlesService {

  constructor(@InjectModel(Article)
              private articleRepository: typeof Article,
              private filesService: FilesService,
              private blocksService: BlocksService

  ) {}

  async create(dto: CreateArticleDto) {
    const article = await this.articleRepository.create({...dto})
    return article;
  }

  async getArticleById(id: number) {
    const article = await this.articleRepository.findAll({
      include: [
        {
          model: Block,
          where: {
            articleId: id
          }
        }
      ]
    })

    console.log(article)

    return article;
  }

  async addBlock(dto: CreateBlockDto, id) {
    const article = await this.articleRepository.findByPk(id);

    if (article) {
      const block = await this.blocksService.create(dto, id)
      console.log(id)

      return block;
    }

    throw new HttpException("Article not found", HttpStatus.NOT_FOUND);

  }
}
