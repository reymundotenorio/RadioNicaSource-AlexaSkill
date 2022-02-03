import { Component, BaseComponent, Global, Handle } from '@jovotech/framework';

import { UserComponent } from './UserComponent';

/*
|--------------------------------------------------------------------------
| Global Component
|--------------------------------------------------------------------------
|
| The global component handlers can be reached from anywhere in the app
| Learn more here: www.jovo.tech/docs/components#global-components
|
*/
@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH(): Promise<void> {
    return this.$redirect(UserComponent);
  }

  @Handle({ intents: ['AMAZON.RepeatIntent'] })
  RepeatHandler(): Promise<void> {
    const prevOutput = this.$history.prev?.output;

    if (!prevOutput) return this.LAUNCH();

    return this.$send(prevOutput);
  }

  @Handle({ intents: ['AMAZON.HelpIntent'] })
  async HelpHandler(): Promise<void> {
    const message =
      "You can stream a radio station giving your name, location and your favorite genre of music, the genres available are hip hop, pop, rock, classic. Let's start again";
    await this.$send({ message, listen: false });

    return this.RepeatHandler();
  }

  @Handle({ intents: ['AMAZON.FallbackIntent'] })
  async FallbackHandler(): Promise<void> {
    const message = "I'm sorry, I didn't understand what you said.";
    await this.$send({ message, listen: false });

    return this.RepeatHandler();
  }
}
