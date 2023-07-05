import { ContractEntity } from './../entity/contract.entity';
import { ContractFactory } from './../../../domain/contract.factory';
import { IContractRepository } from './../../../domain/repository/icontract.repository';
import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from 'src/contract/domain/contract';

@Injectable()
export class ContractRepository implements IContractRepository {
  constructor(
    private connection: Connection,
    @InjectRepository(ContractEntity)
    private ContractRepository: Repository<ContractEntity>,
    private contractFactory: ContractFactory,
  ) {}

  async findByContractAddress(
    contractAddress: string,
  ): Promise<Contract | null> {
    const contractEntity = await this.ContractRepository.findOne({
      where: { contractAddress },
    });
    if (!contractEntity) {
      return null;
    }
    const { name, code, byteCode, abiCode } = contractEntity;

    return this.contractFactory.reconstitue(
      contractAddress,
      name,
      code,
      byteCode,
      abiCode,
    );
  }

  async save(
    contractAddress: string,
    name: string,
    code: string,
    byteCode: Buffer,
    abiCode: string,
  ): Promise<void> {
    await this.connection.transaction(async (manager) => {
      const contract = new ContractEntity();
      contract.contractAddress = contractAddress;
      contract.name = name;
      contract.code = code;
      contract.byteCode = byteCode;
      contract.abiCode = abiCode;

      await manager.save(contract);
    });
  }
}
