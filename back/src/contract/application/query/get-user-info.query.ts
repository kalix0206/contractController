import { IQuery } from '@nestjs/cqrs';

export class GetContractInfoQuery implements IQuery {
  constructor(readonly contractAddress: string) {}
}
