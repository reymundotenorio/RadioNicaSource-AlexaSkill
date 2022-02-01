import { BaseOutput, Output, OutputTemplate } from '@jovotech/framework';

@Output()
export class MyNameOutput extends BaseOutput {
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
      message: 'Welcome to Radio NicaSource skill. We want to know, what is your name?',
      reprompt: 'Please answer with your name',
      listen: true,
    };
  }
}
