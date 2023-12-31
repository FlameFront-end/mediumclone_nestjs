import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { ArticleEntity } from "./entities/article.entity";
import { UserEntity } from "../user/entities/user.entity";
import { CreateArticleDto } from "./dto/create-article.dto";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import slugify from "slugify";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async createArticle(
    currentUser: UserEntity,
    dto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, dto);

    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this.getSlug(dto.title);

    article.author = currentUser;

    return await this.articleRepository.save(article);
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article: article };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, {
        lower: true,
      }) +
      "-" +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
