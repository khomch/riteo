import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { FilesModule } from '../files/files.module';
import { Article } from './articles.model';
import { Block } from '../blocks/blocks.model';
import { BlocksModule } from '../blocks/blocks.module';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [
    SequelizeModule.forFeature([User, Article, Block]),
    BlocksModule,
    FilesModule
  ],
})
export class ArticlesModule {}
