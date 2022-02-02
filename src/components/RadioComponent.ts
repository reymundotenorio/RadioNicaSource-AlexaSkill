import { Component, BaseComponent, Intents, Handle, DeepPartial } from '@jovotech/framework';

import {
  AlexaHandles,
  AudioPlayerPlayOutput,
  AudioPlayerPlayOutputOptions,
  AudioPlayerStopOutput,
} from '@jovotech/platform-alexa';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RadioBrowser from 'radio-browser';
import { RadioStations } from '../types';

const backgroundImage =
  'https://p4.wallpaperbetter.com/wallpaper/122/787/757/background-radio-receiver-wallpaper-preview.jpg';

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
export class RadioComponent extends BaseComponent {
  playRadioInterface(
    streamUrl: string,
    token: string,
    title: string,
    subtitle: string,
    artUrl: string,
    backgroundImageUrl: string,
    message = '',
    isStarting = false,
  ): Promise<void> {
    const playerSettings: DeepPartial<AudioPlayerPlayOutputOptions> = {
      audioItem: {
        stream: {
          url: streamUrl,
          token,
        },
        metadata: {
          title,
          subtitle,
          art: {
            sources: [
              {
                url: artUrl,
              },
            ],
          },
          backgroundImage: {
            sources: [
              {
                url: backgroundImageUrl,
              },
            ],
          },
        },
      },
      playBehavior: 'REPLACE_ALL',
    };

    if (isStarting) playerSettings.message = message;

    return this.$send(AudioPlayerPlayOutput, playerSettings);
  }

  resumeCurrentRadioStation(): Promise<void> {
    return this.playRadioInterface(
      this.$user.data.station.streamUrl,
      this.$user.data.station.token,
      this.$user.data.station.title,
      'from Radio NicaSource',
      this.$user.data.station.artUrl,
      backgroundImage,
    );
  }

  async searchRadioByData(): Promise<void> {
    const filter = {
      limit: 5,
      // language: 'en',
      tag: this.$user.data.musicGenre || 'hip hop',
      country: this.$user.data.country || 'Nicaragua',
    };

    let radios: RadioStations[];

    try {
      radios = await RadioBrowser.searchStations(filter);

      // No radio station found with country and tag (Genre)
      if (radios.length === 0) {
        const filterOnlyByCountry = {
          limit: 5,
          country: this.$user.data.country || 'Nicaragua',
        };

        // Searcg radio station only by country
        radios = await RadioBrowser.searchStations(filterOnlyByCountry);
      }

      if (radios.length === 0) throw 'There are no radio stations in your country';

      const radioStation = radios[0];

      // Save station in DB
      this.$user.data.station.streamUrl = radioStation.url_resolved;
      this.$user.data.station.token = radioStation.stationuuid;
      this.$user.data.station.title = radioStation.name;
      this.$user.data.station.artUrl = radioStation.favicon;

      return this.playRadioInterface(
        radioStation.url_resolved,
        radioStation.stationuuid,
        radioStation.name,
        'from Radio NicaSource',
        radioStation.favicon,
        backgroundImage,
        'Thanks, we have your radio streaming request. ¡Enjoy!',
        true,
      );
    } catch (error) {
      console.error('Error searching radio stations: ', error);
      return this.$send({ message: 'Error searching radio stations' });
    }
  }

  // START handler (the entry point when another component redirects or delegates to it)
  START(): Promise<void> {
    return this.searchRadioByData();
  }

  @Intents(['AMAZON.ResumeIntent'])
  resumeAudio(): Promise<void> {
    return this.resumeCurrentRadioStation();
  }

  @Handle(AlexaHandles.onAudioPlayer('PlaybackController.PlayCommandIssued'))
  resumeAudioForce(): Promise<void> {
    return this.resumeCurrentRadioStation();
  }

  @Intents(['AMAZON.PauseIntent'])
  END(): Promise<void> {
    return this.$send(AudioPlayerStopOutput);
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackStarted'))
  playbackStarted(): void {
    console.log('AudioPlayer.PlaybackStarted');
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackNearlyFinished'))
  playbackNearlyFinished(): void {
    console.log('AudioPlayer.PlaybackNearlyFinished');
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackFailed'))
  playbackFailed(): void {
    if (this.$alexa) {
      const error = this.$alexa.audioPlayer.error;
      console.log('AudioPlayer.PlaybackFailed', error?.type, error?.message);
    }
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackStopped'))
  playbackStopped(): void {
    console.log('AudioPlayer.PlaybackStopped');
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackFinished'))
  playbackFinished(): void {
    console.log('AudioPlayer.PlaybackFinished');
  }

  UNHANDLED(): Promise<void> {
    return this.START();
  }
}
