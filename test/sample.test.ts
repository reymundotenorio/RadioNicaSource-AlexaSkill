import { TestSuite, InputType } from '@jovotech/framework';

/*
|--------------------------------------------------------------------------
| UNIT TESTING
|--------------------------------------------------------------------------
|
| Run `npm test` to execute this sample test.
| Learn more here: www.jovo.tech/docs/unit-testing
|
*/

const testSuite = new TestSuite();

test('should ask the user for his/her name', async () => {
  const { output } = await testSuite.run({
    type: InputType.Launch, // or 'LAUNCH'
  });

  expect(output).toEqual([
    {
      message: 'Welcome to Radio NicaSource skill. We want to know, what is your name?',
      reprompt: 'Please answer with your name',
      listen: true,
    },
  ]);
});
