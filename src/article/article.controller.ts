import { Controller, Get, Post } from "@nestjs/common";
import { ArticleService } from "./article.service";

@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async getHello(): Promise<string> {
    return await this.articleService.createArticle();
  }
}
