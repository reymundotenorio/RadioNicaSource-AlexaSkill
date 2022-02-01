import { BaseOutput, Output, OutputTemplate } from '@jovotech/framework';

import cardJson from '../apl/card.json';
import nativePla from './nativePla';

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
    const message = 'Welcome to Radio NicaSource skill. We want to know, what is your name?';

    return {
      message,
      reprompt: 'Please answer with your name',

      // card: {
      //   title: 'Welcome',
      //   content: 'Welcome to Radio NicaSource',
      //   imageUrl:
      //     'https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/headline/HeadlineBackground_Dark.png',
      //   imageAlt: 'Image',
      // },

      listen: true,
      platforms: nativePla(cardJson, message),
    };
  }
}
