import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { ArticleEntity } from "./entities/article.entity";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly userRepository: Repository<ArticleEntity>,
  ) {}
  async createArticle() {
    console.log(this.userRepository);
    return "create";
  }
}
