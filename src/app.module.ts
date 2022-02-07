import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,

    /* Note that these configurations are synchronous, because we dont have/need to wait for any module to use these values
       When we are using configModule to load up the values, thats async because we have to wait for the configModule to load up and then the values are available for us to use

       */
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: process.env.DB_PORT,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'task-management',
    //   autoLoadEntities: true, // This will load the .entity.ts files, Stick to this filename convention for entity files
    //   synchronize: true,
    // }),

    // By using forRootAsync we are telling NestJs to do the async initialization of this module
    TypeOrmModule.forRootAsync({
      // what module we depend on
      imports: [ConfigModule],

      // What do I need to inject from those modules
      inject: [ConfigService],

      // This is the function that would be called by NestJs when we want to initialize TypeOrmModule
      // This would return the configration for the current module
      // We can do anything in this async function (any async thing even HTTP call)
      // Whatever is retured from this function would be the configuration of this module

      // As we have mentioned that we have ConfigModule as dependency and we want to inject ConfigService from that module,
      // NESTJs would wait for ConfigModule because we have mentioned that as a dependency in here
      // We have ConfigService available for us in following async method
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true, // This will load the .entity.ts files, Stick to this filename convention for entity files
          synchronize: true,
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
