import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Wallet } from './wallet';

@Injectable()
export class WalletFactoy {
  constructor(private eventBus: EventBus) {}

  create(
    nickName: string,
    name: string,
    secret: string,
    address: string,
    prvKey: string,
    pubKey: string,
  ): Wallet {
    const wallet = new Wallet(nickName, name, secret, address, prvKey, pubKey);

    // this.eventBus.publish(new WalletCreatedEvent(walletAddress));

    return wallet;
  }

  //   regist();
  reconstitue(
    nickName: string,
    name: string,
    secret: string,
    address: string,
    prvKey: string,
    pubKey: string,
  ): Wallet {
    return new Wallet(nickName, name, secret, address, prvKey, pubKey);
  }
}
