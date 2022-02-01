import { BaseOutput, Output, OutputOptions, OutputTemplate } from '@jovotech/framework';

export interface MyCountryOutputOptions extends OutputOptions {
  name: string;
}

@Output()
export class MyCountryOutput extends BaseOutput<MyCountryOutputOptions> {
  /*
  |--------------------------------------------------------------------------
  | Output Template
  |--------------------------------------------------------------------------
  |
  | This structured output is later turned into a native response
  | Learn more here: www.jovo.tech/docs/output
  |
  */
  build(): OutputTemplate | OutputTemplate[] {
    return {
      message: `Great, where are you from ${this.options.name}?`,
      reprompt: 'Please answer with your country name',
      listen: true,
    };
  }

  getDefaultOptions(): MyCountryOutputOptions {
    return {
      name: 'User',
    };
  }
}
