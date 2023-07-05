import { ContractFactory } from './../../domain/contract.factory';
import { IContractRepository } from './../../domain/repository/icontract.repository';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateContractCommand } from './create-contract.command';

@Injectable()
@CommandHandler(CreateContractCommand)
export class CreateContractHandler
  implements ICommandHandler<CreateContractCommand>
{
  constructor(
    private contractFactory: ContractFactory,
    @Inject('ContractRepository')
    private contractRepository: IContractRepository,
  ) {}

  async execute(command: CreateContractCommand) {
    const { contractAddress, code } = command;

    const contract = await this.contractRepository.findByContractAddress(
      contractAddress,
    );
    if (contract !== null) {
      throw new UnprocessableEntityException(
        'already registered contract address',
      );
    }

    const name = 'test Name';
    const abiCode = Buffer.from([0x01, 0x02, 0x03]);
    const byteCode = '0110101';
    await this.contractRepository.save(
      contractAddress,
      name,
      code,
      abiCode,
      byteCode,
    );

    this.contractFactory.create(contractAddress, name, code, abiCode, byteCode);
  }
}
