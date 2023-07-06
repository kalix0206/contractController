import { WalletEntity } from './../../infra/db/entity/wallet.entity';
import { GetWalletInfoQuery } from './get-wallet-info.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetWalletInfoQuery)
export class GetWalletInfoQueryHandler
  implements IQueryHandler<GetWalletInfoQuery>
{
  constructor(
    @InjectRepository(WalletEntity)
    private walletsRepository: Repository<WalletEntity>,
  ) {}

  async execute(query: GetWalletInfoQuery) {
    const { address } = query;
    console.log(address);
    let walletInfo;
    if (address) {
      walletInfo = await this.walletsRepository.findOne({
        where: { address: address },
      });
    } else {
      walletInfo = await this.walletsRepository.find();
    }

    return walletInfo;
  }
}

// Promise<WalletInfo | WalletInfo[]>
