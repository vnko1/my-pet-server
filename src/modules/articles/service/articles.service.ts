import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { DB } from 'src/services/db.service';

import { Article } from '../schema/articles.schema';
import { ArticlesQueryDto } from '../dto/articles-query.dto';

@Injectable()
export class ArticlesService extends DB {
  limit = 6;

  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {
    super();
  }

  async findAll(
    query: ArticlesQueryDto,
  ): Promise<{ data: Article[]; total: number }> {
    const queryPattern = this.getSearchQueryPattern(query.query);
    const sortPattern = this.getSortingPattern('date');
    const perPage = this.getSkipPattern(query.page, this.limit);
    const data = await this.articleModel
      .find(queryPattern, '-id')
      .skip(perPage)
      .limit(this.limit)
      .sort(sortPattern)
      .exec();

    const total = await this.articleModel.countDocuments(queryPattern);

    return { total, data };
  }
}
