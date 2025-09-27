import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bug, BugDocument } from './schemas/bug.schema';
import { CreateBugDto } from './dto/create-bug.dto';

@Injectable()
export class BugService {
  constructor(@InjectModel(Bug.name) private bugModel: Model<BugDocument>) {}

  async findAll(): Promise<Bug[]> {
    return this.bugModel.find().exec();
  }

  async create(createBugDto: CreateBugDto): Promise<Bug> {
    const createdBug = new this.bugModel(createBugDto);
    return createdBug.save();
  }

  async update(id: string, updateBugDto: any): Promise<Bug | null> {
    return this.bugModel.findByIdAndUpdate(id, updateBugDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.bugModel.deleteOne({ _id: id }).exec();
  }
}