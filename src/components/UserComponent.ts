import { Component, BaseComponent, Intents, Handle } from '@jovotech/framework';

import { MyNameOutput } from '../output/MyNameOutput';
import { MyCountryOutput } from '../output/MyCountryOutput';
import { MyFavoriteGenreOutput } from '../output/MyFavoriteGenreOutput';
import { RadioComponent } from './RadioComponent';

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
  START(): Promise<void> {
    return this.$send(MyNameOutput);
  }

  @Intents(['MyNameIntent'])
  whereAreYouFrom(): Promise<void> {
    // Save name in DB
    this.$user.data.name = this.$entities.name?.value || 'User';

    return this.$send(MyCountryOutput, { name: this.$user.data.name });
  }

  @Intents(['MyCountryIntent'])
  favoriteGenreMusic(): Promise<void> {
    // Save country in DB
    this.$user.data.country = this.$entities.country?.value || 'Nicaragua';

    return this.$send(MyFavoriteGenreOutput);
  }

  @Intents(['MyMusicGenreIntent'])
  playFavoriteRadio(): Promise<void> {
    // Save genre in DB
    this.$user.data.musicGenre = this.$entities.musicGenre?.value || 'hip hop';

    return this.$redirect(RadioComponent);
  }

  @Handle({ intents: ['AMAZON.HelpIntent'] })
  async HelpIntent(): Promise<void> {
    const message =
      "You can stream a radio station giving your name, location and your favorite genre of music, the genres available are hip hop, pop, rock, classic. Let's start again";
    await this.$send({ message });

    return this.START();
  }

  UNHANDLED(): Promise<void> {
    return this.START();
  }
}
