/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { MyNameOutput } from '../output/MyNameOutput';

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
export class UserComponent extends BaseComponent {
  // START handler (the entry point when another component redirects or delegates to it)
  START() {
    return this.$send(MyNameOutput);
  }

  @Intents(['MyNameIntent'])
  whereAreYouFrom() {
    this.$user.data.name = this.$entities.name?.value;

    return this.$send({
      message: `Great, where are you from ${this.$user.data.name}`,
      listen: false,
    });
  }

  UNHANDLED() {
    return this.START();
  }
}
