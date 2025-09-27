import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BugService } from './bug.service';
import { BugController } from './bug.controller';
import { Bug, BugSchema } from './schemas/bug.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bug.name, schema: BugSchema }])],
  controllers: [BugController],
  providers: [BugService],
})
export class BugModule {}