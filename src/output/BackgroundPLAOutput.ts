import { OutputTemplatePlatforms } from '@jovotech/framework';
import backgroundPla from '../apl/backgroundPla.json';

const BackgroundPLAOutput = (
  title: string,
  logoUrl: string,
  backgroundUrl: string,
): OutputTemplatePlatforms | undefined => {
  return {
    alexa: {
      nativeResponse: {
        response: {
          directives: [
            {
              type: 'Alexa.Presentation.APL.RenderDocument',
              token: 'token',
              document: backgroundPla,
              datasources: {
                PLA_DATA: {
                  type: 'object',
                  objectId: 'backgroundPla',
                  properties: {
                    title,
                    logoUrl,
                    backgroundUrl,
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

export default BackgroundPLAOutput;
