/* eslint-disable @typescript-eslint/no-var-requires */
const { AlexaCli } = require('@jovotech/platform-alexa');
const { ProjectConfig } = require('@jovotech/cli-core');

/*
|--------------------------------------------------------------------------
| JOVO PROJECT CONFIGURATION
|--------------------------------------------------------------------------
|
| Information used by the Jovo CLI to build and deploy projects
| Learn more here: www.jovo.tech/docs/project-config
|
*/
const project = new ProjectConfig({
  defaultStage: 'dev',
  stages: {
    dev: {
      endpoint: '${JOVO_WEBHOOK_URL}',

      plugins: [
        // Add Jovo CLI plugins here
        new AlexaCli({
          locales: { en: ['en-US'] },
          files: {
            'skill-package/skill.json': {
              manifest: {
                apis: {
                  custom: {
                    interfaces: [
                      {
                        type: 'AUDIO_PLAYER',
                      },
                      {
                        type: 'ALEXA_PRESENTATION_APL',
                        supportedViewports: [
                          {
                            mode: 'HUB',
                            shape: 'ROUND',
                            minWidth: 100,
                            maxWidth: 599,
                            minHeight: 100,
                            maxHeight: 599,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 100,
                            maxHeight: 599,
                            minWidth: 960,
                            maxWidth: 1279,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 600,
                            maxHeight: 959,
                            minWidth: 960,
                            maxWidth: 1279,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 600,
                            maxHeight: 1279,
                            minWidth: 1280,
                            maxWidth: 1920,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 960,
                            maxHeight: 1279,
                            minWidth: 1920,
                            maxWidth: 2650,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 1920,
                            maxHeight: 2560,
                            minWidth: 960,
                            maxWidth: 1279,
                          },
                          {
                            mode: 'TV',
                            shape: 'RECTANGLE',
                            minHeight: 540,
                            maxHeight: 540,
                            minWidth: 960,
                            maxWidth: 960,
                          },
                          {
                            mode: 'MOBILE',
                            shape: 'RECTANGLE',
                            minHeight: 320,
                            maxHeight: 1920,
                            minWidth: 600,
                            maxWidth: 959,
                          },
                          {
                            mode: 'MOBILE',
                            shape: 'RECTANGLE',
                            minHeight: 320,
                            maxHeight: 1920,
                            minWidth: 960,
                            maxWidth: 1279,
                          },
                        ],
                      },
                    ],
                  },
                },
                publishingInformation: {
                  locales: {
                    'en-US': {
                      summary: 'Radio NicaSource Skill',
                      examplePhrases: ['Alexa open radio nicasource'],
                      keywords: ['radio', 'nicasource'],
                      name: 'Dev Radio NicaSource',
                      description: 'Radio Nicarouse Built with Jovo',
                      smallIconUri: 'https://via.placeholder.com/108/09f/09f.png',
                      largeIconUri: 'https://via.placeholder.com/512/09f/09f.png',
                    },
                  },
                },
              },
            },
          },
        }),
      ],
      models: {
        enabled: true,
        directory: 'models',
        override: {
          en: {
            invocation: 'dev radio nicasource',
          },
        },
      },
    },
    prod: {
      endpoint: 'arn:aws:lambda:us-east-1:676048017793:function:LambdaRadioNS',
      plugins: [
        // Add Jovo CLI plugins here
        new AlexaCli({
          locales: { en: ['en-US'] },
          files: {
            'skill-package/skill.json': {
              manifest: {
                apis: {
                  custom: {
                    interfaces: [
                      {
                        type: 'AUDIO_PLAYER',
                      },
                      {
                        type: 'ALEXA_PRESENTATION_APL',
                        supportedViewports: [
                          {
                            mode: 'HUB',
                            shape: 'ROUND',
                            minWidth: 100,
                            maxWidth: 599,
                            minHeight: 100,
                            maxHeight: 599,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 100,
                            maxHeight: 599,
                            minWidth: 960,
                            maxWidth: 1279,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 600,
                            maxHeight: 959,
                            minWidth: 960,
                            maxWidth: 1279,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 600,
                            maxHeight: 1279,
                            minWidth: 1280,
                            maxWidth: 1920,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 960,
                            maxHeight: 1279,
                            minWidth: 1920,
                            maxWidth: 2650,
                          },
                          {
                            mode: 'HUB',
                            shape: 'RECTANGLE',
                            minHeight: 1920,
                            maxHeight: 2560,
                            minWidth: 960,
                            maxWidth: 1279,
                          },
                          {
                            mode: 'TV',
                            shape: 'RECTANGLE',
                            minHeight: 540,
                            maxHeight: 540,
                            minWidth: 960,
                            maxWidth: 960,
                          },
                          {
                            mode: 'MOBILE',
                            shape: 'RECTANGLE',
                            minHeight: 320,
                            maxHeight: 1920,
                            minWidth: 600,
                            maxWidth: 959,
                          },
                          {
                            mode: 'MOBILE',
                            shape: 'RECTANGLE',
                            minHeight: 320,
                            maxHeight: 1920,
                            minWidth: 960,
                            maxWidth: 1279,
                          },
                        ],
                      },
                    ],
                  },
                },
                publishingInformation: {
                  locales: {
                    'en-US': {
                      summary: 'Radio NicaSource Skill',
                      examplePhrases: ['Alexa open radio nicasource'],
                      keywords: ['radio', 'nicasource'],
                      name: 'Radio NicaSource',
                      description: 'Radio Nicarouse Built with Jovo',
                      smallIconUri: 'https://via.placeholder.com/108/09f/09f.png',
                      largeIconUri: 'https://via.placeholder.com/512/09f/09f.png',
                    },
                  },
                },
              },
            },
          },
        }),
      ],
    },
  },
});

module.exports = project;
