export class Contract {
  constructor(
    private contractAddress: string,
    private name: string,
    private code: string,
    private byteCode: Buffer,
    private abiCode: string,
  ) {}

  getCA(): Readonly<string> {
    return this.contractAddress;
  }

  getName(): Readonly<string> {
    return this.name;
  }

  getCode(): Readonly<string> {
    return this.code;
  }

  getByteCode(): Readonly<Buffer> {
    return this.byteCode;
  }

  getABICode(): Readonly<string> {
    return this.abiCode;
  }
}
