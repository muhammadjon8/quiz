import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Admin } from './admin/entities/admin.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub_category/sub_category.module';
import { QuizModule } from './quiz/quiz.module';
import { ResultsModule } from './results/results.module';
import { Category } from './category/entities/category.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Admin, Category],
      synchronize: true,
      logging: false,
    }),
    AdminModule,
    UserModule,
    CategoryModule,
    SubCategoryModule,
    QuizModule,
    ResultsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
