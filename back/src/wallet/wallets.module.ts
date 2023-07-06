import { GetWalletInfoQueryHandler } from './application/query/get-walllet-info.handler';
import { GetWalletInfoQuery } from './application/query/get-wallet-info.query';
import { WalletFactoy } from './domain/wallet.factory';
import { WalletsController } from './interface/wallets.controllers';
import { CreateWalletHandler } from './application/command/create-wallet.handler';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './infra/db/entity/wallet.entity';
import { WalletRepository } from './infra/db/repository/WalletRepository';

const commandHandlers = [CreateWalletHandler];
const queryHandlers = [GetWalletInfoQueryHandler];
const eventHandlers = [];
const factories = [WalletFactoy];
const repositories = [
  { provide: 'WalletRepository', useClass: WalletRepository },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([WalletEntity])],
  controllers: [WalletsController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...factories,
    ...repositories,
  ],
})
export class WalletsModule {}
