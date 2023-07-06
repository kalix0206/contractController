import { CreateWalletCommand } from './../application/command/create-wallet.command';
import { createWalletDto } from './dto/create-wallet.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { WalletInfo } from './WalletInfo';

@Controller('wallets')
export class WalletsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/createWallet')
  async createWallet(@Body() dto: createWalletDto): Promise<WalletInfo> {
    const { nickName, name, secret } = dto;
    const command = new CreateWalletCommand(nickName, name, secret);
    return this.commandBus.execute(command);
  }

  //   @Post('importWallet')
  //   async importWallet() {}
}
