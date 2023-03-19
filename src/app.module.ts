import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { RouteInfo } from '@nestjs/common/interfaces';
import { MovieModule } from './modules/movie/movie.module';
import { RankingModule } from './modules/ranking/ranking.module';

@Module({
  imports: [TodoModule, AuthModule, UserModule, MovieModule, RankingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const excludedPaths: RouteInfo[] = [
      { path: '/auth/signin', method: RequestMethod.POST },
      { path: '/users/signup', method: RequestMethod.POST },
      { path: 'api', method: RequestMethod.GET },
    ];
    consumer
      .apply(AuthMiddleware)
      .exclude(...excludedPaths)
      .forRoutes('*');
  }
}
