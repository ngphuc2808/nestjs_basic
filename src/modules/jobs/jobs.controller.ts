import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from '../users/users.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ResponseMessage('Fetch list job with paginate')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(+currentPage, +limit, qs);
  }

  @Post('create')
  @ResponseMessage('Create job')
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get(':id')
  @ResponseMessage('Find job')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch('update/:id')
  @ResponseMessage('Update job')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateCompanyDto, user);
  }

  @Delete('delete/:id')
  @ResponseMessage('Delete job')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}