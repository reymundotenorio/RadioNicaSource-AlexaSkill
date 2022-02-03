import { AlexaPlatform } from '@jovotech/platform-alexa';
import { App } from '@jovotech/framework';
import { DynamoDb } from '@jovotech/db-dynamodb';

import { GlobalComponent } from './components/GlobalComponent';
import { UserComponent } from './components/UserComponent';
import { RadioComponent } from './components/RadioComponent';

/*
|--------------------------------------------------------------------------
| APP CONFIGURATION
|--------------------------------------------------------------------------
|
| All relevant components, plugins, and configurations for your Jovo app
| Learn more here: www.jovo.tech/docs/app-config
|
*/
const app = new App({
  /*
  |--------------------------------------------------------------------------
  | Components
  |--------------------------------------------------------------------------
  |
  | Components contain the Jovo app logic
  | Learn more here: www.jovo.tech/docs/components
  |
  */
  components: [GlobalComponent, UserComponent, RadioComponent],

  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  |
  | Includes platforms, database integrations, third-party plugins, and more
  | Learn more here: www.jovo.tech/marketplace
  |
  */
  plugins: [
    // Add Jovo plugins here
    new AlexaPlatform({
      intentMap: { 'AMAZON.StopIntent': 'END', 'AMAZON.CancelIntent': 'END' },
    }),
    // new DynamoDb({
    //   table: {
    //     name: 'RadioNicaSourceDB',
    //   },
    // }),
  ],

  /*
  |--------------------------------------------------------------------------
  | Other options
  |--------------------------------------------------------------------------
  |
  | Includes all other configuration options like logging
  | Learn more here: www.jovo.tech/docs/app-config
  |
  */
  logging: true,
});

export { app };
