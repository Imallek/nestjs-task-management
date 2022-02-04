import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
  ], // This line allows to dependency inject TaskRepository wherever we want in the modlule
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
