import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { RouteInfo } from '@nestjs/common/interfaces';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [AuthModule, UserModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const excludedPaths: RouteInfo[] = [
      { path: '/auth/signin', method: RequestMethod.POST },
      { path: '/users/signup', method: RequestMethod.POST },
      { path: 'api-docs', method: RequestMethod.GET },
    ];
    consumer
      .apply(AuthMiddleware)
      .exclude(...excludedPaths)
      .forRoutes('*');
  }
}
