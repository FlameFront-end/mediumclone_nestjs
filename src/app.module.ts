import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TagModule } from "./tag/tag.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./datasource.config";
import { UserModule } from "./user/user.module";
import { AuthMiddleware } from "./user/middlewares/auth.middleware";
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TagModule, UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
