import { ContractEntity } from './../../infra/db/entity/contract.entity';
import { GetContractInfoQuery } from './get-user-info.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractInfo } from 'src/contract/interface/ContractInfo';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetContractInfoQuery)
export class GetContractInfoQueryHandler
  implements IQueryHandler<GetContractInfoQuery>
{
  constructor(
    @InjectRepository(ContractEntity)
    private contractsRepository: Repository<ContractEntity>,
  ) {}

  async execute(query: GetContractInfoQuery): Promise<ContractInfo> {
    const { contractAddress } = query;

    const contract = await this.contractsRepository.findOne({
      where: { contractAddress: contractAddress },
    });

    if (!contract) {
      throw new NotFoundException('The contract does not exist');
    }

    return {
      contractAddress: contract.contractAddress,
      name: contract.name,
      code: contract.code,
      byteCode: contract.byteCode,
      abiCode: contract.abiCode,
    };
  }
}
