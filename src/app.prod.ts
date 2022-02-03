import { app } from './app';
// import { DynamoDb } from '@jovotech/db-dynamodb';

/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: www.jovo.tech/docs/staging
|
*/
app.configure({
  plugins: [
    // new DynamoDb({
    //   table: {
    //     name: 'RadioNicaSourceDB',
    //   },
    // }),
  ],
});

export * from './server.lambda';
