import { GetContractInfoQueryHandler } from './application/query/get-contract-info.handler';
import { ContractEventsHandler } from './application/event/contract-events.handler';
import { ContractRepository } from './infra/db/repository/ContractRepository';
import { ContractFactory } from './domain/contract.factory';
import { CreateContractHandler } from './application/command/create-contract.handler';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsController } from './interface/contracts.controllers';
import { ContractEntity } from './infra/db/entity/contract.entity';
const commandHandlers = [
  CreateContractHandler,
  //   CallContractHandler, // call contract function handler
  //   DeployContractHandler, // deploy contract handler
];

const queryHandlers = [GetContractInfoQueryHandler];

const eventHandlers = [ContractEventsHandler];

const factories = [ContractFactory];

const repositories = [
  { provide: 'ContractRepository', useClass: ContractRepository },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ContractEntity])],
  controllers: [ContractsController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...factories,
    ...repositories,
  ],
})
export class ContractsModule {}
