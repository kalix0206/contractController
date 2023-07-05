import { ContractCreatedEvent } from './../../domain/contract-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

@EventsHandler(ContractCreatedEvent)
export class ContractEventsHandler
  implements IEventHandler<ContractCreatedEvent>
{
  //   constructor(
  //     @Inject('ContractService') private contractService: IContractService,
  //   ) {}
  async handle(event: ContractCreatedEvent) {
    switch (event.name) {
      case ContractCreatedEvent.name: {
        console.log('ContractCreatedEvent!');
        const { contractAddress } = event as ContractCreatedEvent;
        // await this.contractService.

        break;
      }
      default:
        break;
    }
  }
}
