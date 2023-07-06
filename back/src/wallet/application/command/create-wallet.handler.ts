import { IWalletRepository } from './../../domain/repository/iwallet.repository';
import { WalletRepository } from './../../infra/db/repository/WalletRepository';
import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletFactoy } from 'src/wallet/domain/wallet.factory';
import { CreateWalletCommand } from './create-wallet.command';
import { createWallet } from 'src/rweb3/wallet.rweb3';

@Injectable()
@CommandHandler(CreateWalletCommand)
export class CreateWalletHandler
  implements ICommandHandler<CreateWalletCommand>
{
  constructor(
    private walletFactory: WalletFactoy,
    @Inject('WalletRepository')
    private WalletRepository: IWalletRepository,
  ) {}

  async execute(command: CreateWalletCommand) {
    const { nickName, name, secret } = command;
    const createdWallet = await createWallet(name, secret);
    const { address, prvKey, pubKey } = createdWallet;

    await this.WalletRepository.save(
      nickName,
      name,
      secret,
      address,
      prvKey,
      pubKey,
    );

    // const createdWallet = sdkRepository.createWallet();
    // if (createdWallet) {
    //   // 정상인지 체크
    // }
    // const { walletAddress, privateKey } = createdWallet;

    // await this.WalletRepository.save(walletAddress, name, privateKey);

    // this.walletFactory.create(walletAddress, name, privateKey);
  }
}
