import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from './cqrs-event';

export class ContractCreatedEvent extends CqrsEvent implements IEvent {
  constructor(readonly contractAddress: string) {
    super(ContractCreatedEvent.name);
  }
}
