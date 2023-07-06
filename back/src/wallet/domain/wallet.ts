export class Wallet {
  constructor(
    private nickName: string,
    private name: string,
    private secret: string,
    private address: string,
    private prvKey: string,
    private pubKey: string,
  ) {}

  getAddress(): Readonly<string> {
    return this.address;
  }

  getName(): Readonly<string> {
    return this.name;
  }

  getPrvKey(): Readonly<string> {
    return this.prvKey;
  }

  getPubKey(): Readonly<string> {
    return this.pubKey;
  }

  getSecret(): Readonly<string> {
    return this.secret;
  }

  getNickName(): Readonly<string> {
    return this.nickName;
  }
}
