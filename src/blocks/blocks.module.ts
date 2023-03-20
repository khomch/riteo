import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlocksController } from './blocks.controller';
import { BlocksService } from './blocks.service';
import { FilesModule } from '../files/files.module';
import { Article } from '../articles/articles.model';
import { Block } from './blocks.model';

@Module({
  providers: [BlocksService],
  controllers: [BlocksController],
  imports: [
    SequelizeModule.forFeature([Article, Block]),
    FilesModule
  ],
  exports: [
    BlocksService,
  ]
})
export class BlocksModule {}
