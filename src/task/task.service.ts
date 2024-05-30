import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditTaskDto, CreateTaskDto  } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    getTasks(userId: number){
        return this.prisma.task.findMany({
            where: {
              userId,
            },
          });
    }
    
    async createTask(
        userId: number,
        dto: CreateTaskDto
    ){
      console.log('userId type:', typeof userId);
      console.log('dto:', dto);

    const task = await this.prisma.task.create({
      data: {
        userId: userId,  // Ensure the type is correct here
        description: dto.description,
      },
    });
    }
    
    getTaskById(
        userId: number,
        taskId: number,
    ){
        return this.prisma.task.findFirst({
            where: {
              id: taskId,
              userId,
            },
          });
    }
    
    async editTaskById(
        userId: number,
        taskId: number,
        dto: EditTaskDto,
    ){
        // get the task by id
    const task =
    await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

  // check if user owns the task
  if (!task || task.userId !== userId)
    throw new ForbiddenException(
      'Access to resources denied',
    );

  return this.prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...dto,
    },
  });

    }
    

    async deleteTaskById(
        userId: number,
        taskId: number,
    ){
        const task =
      await this.prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });

    // check if user owns the task
    if (!task || task.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    }
}
