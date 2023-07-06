import { RWeb3 } from 'rigo-sdk-js';

const rweb3 = new RWeb3('http://192.168.252.60:26657');

export async function getBlockHeight() {
  rweb3.queryBlockByHeight(10818).then((res) => console.log(res));
}
