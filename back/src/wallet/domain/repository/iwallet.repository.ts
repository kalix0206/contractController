import { Wallet } from '../wallet';

export interface IWalletRepository {
  getAllWalletAddress: () => Promise<Wallet[] | null>;

  save: (
    nickName: string,
    name: string,
    secret: string,
    address: string,
    prvKey: string,
    pubKey: string,
  ) => Promise<void>;
}
