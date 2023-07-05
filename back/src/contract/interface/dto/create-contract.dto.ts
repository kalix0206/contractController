import { IsString } from 'class-validator';

export class CreateContractDto {
  @IsString()
  readonly contractAddress: string;

  @IsString()
  readonly code: string;
}
