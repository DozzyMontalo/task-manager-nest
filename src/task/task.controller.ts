import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TaskService } from './task.service';
import { GetUser } from 'src/auth/decorator';
import { CreateTaskDto } from './dto';
import { EditTaskDto } from './dto/edit-task.dto';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService){}
  @Get()
  getTasks(@GetUser('id') userId: number){
    return this.taskService.getTasks(
        userId
    );
  }
  
  @Post()
  createTask(
    @GetUser('id') userId: number,
    @Body() dto: CreateTaskDto,
){
    return this.taskService.createTask(
        userId,
        dto
    )
}
  
  @Get(':id')
  getTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
                ){return this.taskService.getTaskById(
                    userId,
                    taskId,
                )}
  
  @Patch(':id')
  editTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: EditTaskDto
){
    return this.taskService.editTaskById(
        userId,
        taskId,
        dto
    )
}
  
  @Delete(':id')
  deleteTaskById(
  @GetUser('id') userId: number,
  @Param('id', ParseIntPipe) taskId: number,
){
   return this.taskService.deleteTaskById(
     userId,
     taskId
   ) 
}
}
