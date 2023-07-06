import { IsString } from 'class-validator';

export class createWalletDto {
  @IsString()
  readonly nickName: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly secret: string;
}
