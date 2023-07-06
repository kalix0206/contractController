import { RWeb3, Account } from 'rigo-sdk-js';

const rweb3 = new RWeb3('http://192.168.252.60:26657');

export async function getBlockHeight() {
  rweb3.queryBlockByHeight(1413893).then((res) => console.log(res));
}

export async function createWallet(
  name: string,
  secret: string,
): Promise<{ address: string; prvKey: string; pubKey: string }> {
  const account = await Account.New(name, secret);
  return JSON.parse(account.marshal());
}
