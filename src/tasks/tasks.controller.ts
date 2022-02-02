import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string): Task {
        // NestJS allows us to retrieve the data with 2 annotations
        // To get all the body we can use @Body() 

        // Second way to do this is to get the values individually as @Body('title') 
        // In this was NestJS is going to retieve the individual value from the body

        return this.taskService.createTask(title, description);
    }

}
