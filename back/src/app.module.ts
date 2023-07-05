import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ContractsModule } from './contract/contracts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ContractsModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST, // localhost
      port: 3307,
      username: process.env.DATABASE_USERNAME, // root
      password: process.env.DATABASE_PASSWORD, // admin@123
      database: 'contractController',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/**/migrations/*.js'],
      // migrationsTableName: 'migrations',
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
