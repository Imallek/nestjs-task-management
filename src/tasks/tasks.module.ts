import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule], // This line allows to dependency inject TaskRepository wherever we want in the modlule
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
