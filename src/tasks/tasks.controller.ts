import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }
  
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        // NestJS allows us to retrieve the data with 2 annotations
        // To get all the body we can use @Body() 

        // Second way to do this is to get the values individually as @Body('title') 
        // In this was NestJS is going to retieve the individual value from the body

        return this.taskService.createTask(createTaskDto);
    }

    

}
