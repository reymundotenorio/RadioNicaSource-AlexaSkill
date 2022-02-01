import { OutputTemplatePlatforms } from '@jovotech/framework';

const nativePla = (
  plaJson: Record<string, unknown>,
  initText: string,
): OutputTemplatePlatforms | undefined => {
  return {
    alexa: {
      nativeResponse: {
        response: {
          directives: [
            {
              type: 'Alexa.Presentation.APL.RenderDocument',
              token: 'token',
              document: plaJson,
              datasources: {
                component_data: {
                  type: 'object',
                  objectId: 'cardId',
                  properties: {
                    initText: initText,
                  },
                },
              },
            },
          ],
        },
      },
    },
  };
};

export default nativePla;
