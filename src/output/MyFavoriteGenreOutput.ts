import { BaseOutput, Output, OutputTemplate } from '@jovotech/framework';

@Output()
export class MyFavoriteGenreOutput extends BaseOutput {
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
      message: 'Last question, what is your favorite genre of music?',
      reprompt: 'Please answer with your favorite genre of music',
      listen: true,
    };
  }
}
