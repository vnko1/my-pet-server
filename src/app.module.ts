import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesModule } from './articles/articles.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { NoticesModule } from './notices/notices.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_ACCESS_URI),
    ArticlesModule,
    SponsorsModule,
    UsersModule,
    PetsModule,
    NoticesModule,
  ],
})
export class AppModule {}
