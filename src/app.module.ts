import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles';

@Module({
  imports: [ArticlesModule],
})
export class AppModule {}
