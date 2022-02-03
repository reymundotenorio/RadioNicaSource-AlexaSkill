import { Component, BaseComponent, Global, Intents, Handle } from '@jovotech/framework';

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

  // @Handle({ intents: ['AMAZON.RepeatIntent'] })
  // RepeatPreviousIntent(): Promise<void> {
  //   const prevOutput = this.$history.prev?.output;
  //   if (!prevOutput) return this.$redirect(UserComponent);

  //   return this.$send(prevOutput);
  // }
}
