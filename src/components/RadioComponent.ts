import { Component, BaseComponent } from '@jovotech/framework';

import { YesNoOutput } from '../output/YesNoOutput';

const song = 'https://s3.amazonaws.com/jovo-songs/song1.mp3';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/
@Component()
export class RadioComponent extends BaseComponent {
  // START handler (the entry point when another component redirects or delegates to it)
  START() {
    return this.$send({
      message: 'Thanks, we have your radio streaming request. ¡Enjoy!',
      listen: false,
    });
  }

  // @Intents(['YesIntent'])
  // lovesPizza() {
  //   return this.$send({ message: 'Yes! I love pizza, too.', listen: false });
  // }

  // @Intents(['NoIntent'])
  // hatesPizza() {
  //   return this.$send({ message: `That's OK! Not everyone likes pizza.`, listen: false });
  // }

  UNHANDLED() {
    return this.START();
  }
}
