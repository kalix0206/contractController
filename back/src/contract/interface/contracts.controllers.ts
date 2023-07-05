import { GetContractInfoQuery } from './../application/query/get-user-info.query';
import { ContractInfo } from './ContractInfo';
import { CreateContractCommand } from './../application/command/create-contract.command';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateContractDto } from './dto/create-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  async createContract(@Body() dto: CreateContractDto): Promise<void> {
    const { contractAddress, code } = dto;

    const command = new CreateContractCommand(contractAddress, code);

    return this.commandBus.execute(command);
  }

  @Get(':contractAddress')
  async getContractInfo(
    @Param('contractAddress') contractAddress: string,
  ): Promise<ContractInfo> {
    const getContractInfoQuery = new GetContractInfoQuery(contractAddress);

    return this.queryBus.execute(getContractInfoQuery);
  }
}
