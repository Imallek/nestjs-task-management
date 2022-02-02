import { Body, Controller, Delete, Get, Param, Post, Patch, Query, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import {  TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    // @Get()
    // getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
    //     if(Object.keys(filterDto).length){
    //        return this.taskService.getTaskWithFilters(filterDto);
    //     }
    //     return this.taskService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    // @Post()
    // createTask(@Body() cre ateTaskDto: CreateTaskDto): Task {
    //     // NestJS allows us to retrieve the data with 2 annotations
    //     // To get all the body we can use @Body() 

    //     // Second way to do this is to get the values individually as @Body('title') 
    //     // In this was NestJS is going to retieve the individual value from the body

    //     return this.taskService.createTask(createTaskDto);
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id:string){
    //     this.taskService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id:string,
    //     @Body() updateTaskStatusDto:UpdateTaskStatusDto
    //     ):Task{
    //         const {status} = updateTaskStatusDto;
    //         return this.taskService.updateTaskStatus(id, status);
    // }
    
}
