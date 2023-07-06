import { IQuery } from '@nestjs/cqrs';
export class GetWalletInfoQuery implements IQuery {
  constructor(readonly address: string) {}
}
