import {Module} from '@nestjs/common';
import {PostModule} from './post/post.module';
import {UserModule} from './user/user.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    PostModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
