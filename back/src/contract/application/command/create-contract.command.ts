import { ICommand } from '@nestjs/cqrs';

export class CreateContractCommand implements ICommand {
  constructor(readonly contractAddress: string, readonly code: string) {}
}
