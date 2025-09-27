import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module'; // Step 1: Import TodoModule

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://akel2_db_user:Mindakob5@cluster0.co4gmnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    TodoModule, // עדכן כאן את ה-URI
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}