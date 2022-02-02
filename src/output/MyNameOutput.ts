import { BaseOutput, Output, OutputTemplate } from '@jovotech/framework';

import BackgroundPLAOutput from './BackgroundPLAOutput';

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

      platforms: BackgroundPLAOutput(
        'Radio NicaSource',
        'https://upload.wikimedia.org/wikipedia/commons/d/d2/Logo-de-World-Hits-Radio.png',
        'https://p4.wallpaperbetter.com/wallpaper/122/787/757/background-radio-receiver-wallpaper-preview.jpg',
      ),
    };
  }
}
