import { Wallet } from './../../../domain/wallet';
import { IWalletRepository } from './../../../domain/repository/iwallet.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { WalletEntity } from '../entity/wallet.entity';
import { WalletFactoy } from 'src/wallet/domain/wallet.factory';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(
    private connection: Connection,
    @InjectRepository(WalletEntity)
    private WalletRepository: Repository<WalletEntity>,
    private walletFactory: WalletFactoy,
  ) {}

  async getAllWalletAddress(): Promise<Wallet[] | null> {
    const walletEntity = await this.WalletRepository.find();
    if (!walletEntity) {
      return null;
    }
  }
  //   const {walletAddress, name, privateKey} = walletEntity;

  async save(
    nickName: string,
    name: string,
    secret: string,
    address: string,
    prvKey: string,
    pubKey: string,
  ): Promise<void> {
    await this.connection.transaction(async (manager) => {
      const wallet = new WalletEntity();
      wallet.nickName = nickName;
      wallet.name = name;
      wallet.secret = secret;
      wallet.address = address;
      wallet.prvKey = prvKey;
      wallet.pubKey = pubKey;

      await manager.save(wallet);
    });
  }
}
