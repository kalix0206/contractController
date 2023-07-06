import { ICommand } from '@nestjs/cqrs';

export class CreateWalletCommand implements ICommand {
  constructor(
    readonly nickName: string,
    readonly name: string,
    readonly secret: string,
  ) {}
}
