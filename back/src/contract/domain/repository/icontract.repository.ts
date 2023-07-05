import { Contract } from '../contract';

export interface IContractRepository {
  findByContractAddress: (contractAddress: string) => Promise<Contract>;
  //   findByContractName: (name: string) => Promise<Contract>;

  save: (
    contractAddress: string,
    name: string,
    code: string,
    byteCode: Buffer,
    abiCode: string,
  ) => Promise<void>;
}
