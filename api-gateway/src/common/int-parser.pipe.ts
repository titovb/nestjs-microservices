import {ArgumentMetadata, Injectable, ParseIntPipe, ParseIntPipeOptions} from '@nestjs/common';

export interface IntParserPipeOptions extends ParseIntPipeOptions {
  default?: number;
  min?: number;
}

@Injectable()
export class IntParserPipe extends ParseIntPipe {
  private readonly min?: number;
  private readonly default?: number;

  constructor(options?: IntParserPipeOptions) {
    super(options);
    this.min = options.min;
    this.default = options.default;
  }

  public async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    if (!value && this.default) {
      return this.default;
    }
    const val = await super.transform(value, metadata);
    if (this.min && val < this.min) {
      this.exceptionFactory(`${metadata.data} must not be less than ${this.min}`);
    }
    return val;
  }
}
