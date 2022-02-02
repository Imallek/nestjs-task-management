import { Body, Controller, Delete, Get, Param, Post, Patch, Query, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length){
           return this.taskService.getTaskWithFilters(filterDto);
        }
        return this.taskService.getAllTasks();
    }
  
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        const found =  this.taskService.getTaskById(id);
        if(!found){
            // This exception is bubbled up in NestJs internals and then handled there
            // If you are not handling it explicitly (in controller or anything) then NestJs internals would get this exception and map 
            // it to the appropriate HTTP code (i-e 404 in this case) 
            // There are many other exceptions that you can throw as well
            throw new NotFoundException(`Task with ID '${id}' not found`);
        }
        return found;
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        // NestJS allows us to retrieve the data with 2 annotations
        // To get all the body we can use @Body() 

        // Second way to do this is to get the values individually as @Body('title') 
        // In this was NestJS is going to retieve the individual value from the body

        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string){
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status') status:TaskStatus
        ):Task{
        return this.taskService.updateTaskStatus(id, status);
    }
    
}
