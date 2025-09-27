import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BugService } from './bug.service';
import { Bug } from './schemas/bug.schema';
import { CreateBugDto } from './dto/create-bug.dto';

@Controller('bugs')
export class BugController {
  constructor(private readonly bugService: BugService) {}

  @Get()
  async findAll(): Promise<Bug[]> {
    return this.bugService.findAll();
  }

  @Post()
  async create(@Body() createBugDto: CreateBugDto): Promise<Bug> {
    return this.bugService.create(createBugDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBugDto: any): Promise<Bug|null> {
    return this.bugService.update(id, updateBugDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bugService.delete(id);
  }
}