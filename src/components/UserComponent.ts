import { Component, BaseComponent, Intents, Handle } from '@jovotech/framework';

import { MyNameOutput } from '../output/MyNameOutput';
import { MyCountryOutput } from '../output/MyCountryOutput';
import { MyFavoriteGenreOutput } from '../output/MyFavoriteGenreOutput';
import { RadioComponent } from './RadioComponent';
import { GlobalComponent } from './GlobalComponent';

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

  @Handle({ intents: ['AMAZON.RepeatIntent'] })
  async RepeatIntent(): Promise<void> {
    return this.$redirect(GlobalComponent, 'RepeatHandler');
  }

  @Handle({ intents: ['AMAZON.HelpIntent'] })
  async HelpIntent(): Promise<void> {
    return this.$redirect(GlobalComponent, 'HelpHandler');
  }

  @Handle({ intents: ['AMAZON.FallbackIntent'] })
  async FallbackIntent(): Promise<void> {
    return this.$redirect(GlobalComponent, 'FallbackHandler');
  }

  UNHANDLED(): Promise<void> {
    return this.START();
  }
}
