import { ContractCreatedEvent } from './contract-created.event';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Contract } from './contract';

@Injectable()
export class ContractFactory {
  constructor(private eventBus: EventBus) {}

  create(
    contractAddress: string,
    name: string,
    code: string,
    byteCode: Buffer,
    abiCode: string,
  ): Contract {
    const contract = new Contract(
      contractAddress,
      name,
      code,
      byteCode,
      abiCode,
    );

    this.eventBus.publish(new ContractCreatedEvent(contractAddress));

    return contract;
  }

  reconstitue(
    contractAddress: string,
    name: string,
    code: string,
    byteCode: Buffer,
    abiCode: string,
  ): Contract {
    return new Contract(contractAddress, name, code, byteCode, abiCode);
  }
}
