import {ArgumentMetadata, PipeTransform, ValidationPipe} from '@nestjs/common';
import {RpcException} from '@nestjs/microservices';

export class RpcValidationPipe extends ValidationPipe implements PipeTransform {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      await super.transform(value, metadata);
    } catch (err) {
      throw new RpcException(err.message);
    }
    return value;
  }
}
