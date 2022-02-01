/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { MyNameOutput } from '../output/MyNameOutput';
import { MyCountryOutput } from '../output/MyCountryOutput';

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
    // Save name in DB
    this.$user.data.name = this.$entities.name?.value || 'User';

    return this.$send(MyCountryOutput, { name: this.$user.data.name });
  }

  // @Intents(['MyCityIntent'])
  // favoriteGenreMusic() {
  //   // Save city in DB
  //   this.$user.data.city = this.$entities.city?.value || 'United States';

  //   return this.$send({ message: 'Last question', listen: false });
  // }

  UNHANDLED() {
    return this.START();
  }
}
