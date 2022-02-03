import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, 
  TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"postgres",
    database:"task-management",
    autoLoadEntities:true,      // This will load the .entity.ts files, Stick to this filename convention for entity files
    synchronize: true

  }), AuthModule
],
  
})
export class AppModule {}