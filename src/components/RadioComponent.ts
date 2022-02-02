import {
  Component,
  BaseComponent,
  Intents,
  Handle,
  DeepPartial,
  Jovo,
  ComponentOptions,
} from '@jovotech/framework';

import {
  AlexaHandles,
  AudioPlayerPlayOutput,
  AudioPlayerPlayOutputOptions,
  AudioPlayerStopOutput,
} from '@jovotech/platform-alexa';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RadioBrowser from 'radio-browser';
import { RadioStations, Station } from '../types';
import { backgroundImage } from '../output/MyNameOutput';

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
  // START handler (the entry point when another component redirects or delegates to it)
  private _station: Station | null;

  constructor(jovo: Jovo) {
    super(jovo);
    this._station = null;
  }

  public get station(): Station | null {
    return this._station;
  }

  public set station(newStation: Station | null) {
    console.log('Has been set');
    console.log(newStation);

    this._station = newStation;
  }

  START(): Promise<void> {
    return this.searchRadioByData();
  }

  @Intents(['AMAZON.ResumeIntent'])
  resumeAudio(): void {
    return this.resumeCurrentRadioStation();
  }

  @Intents(['AMAZON.PauseIntent'])
  END(): Promise<void> {
    return this.$send(AudioPlayerStopOutput);
  }

  UNHANDLED(): Promise<void> {
    return this.START();
  }

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

  async searchRadioByData(): Promise<void> {
    const filter = {
      limit: 5,
      tag: this.$user.data.musicGenre || 'hip hop',
      country: this.$user.data.country || 'Nicaragua',
      codec: 'MP3',
      is_https: true,
      hidebroken: true,
    };

    let radios: RadioStations[];

    try {
      radios = await RadioBrowser.searchStations(filter);

      // No radio station found with country and tag (Genre)
      if (radios.length === 0) {
        delete filter.tag;

        // Searcg radio station only by country
        radios = await RadioBrowser.searchStations(filter);

        if (radios.length === 0) {
          delete filter.country;

          // Searcg radio station only by country
          radios = await RadioBrowser.searchStations(filter);
        }
      }

      if (radios.length === 0) throw 'There are no radio stations in your country';

      const randomStation = Math.floor(Math.random() * (radios.length - 1 - 0)) + 0;
      const radioStation = radios[randomStation];

      // Save station in DB

      this.station = {
        streamUrl: radioStation.url_resolved,
        token: radioStation.stationuuid,
        title: radioStation.name,
        artUrl: radioStation.favicon,
      };

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

  resumeCurrentRadioStation(): void {
    console.log('#################################################');
    console.log(this.$component);
    console.log('#################################################');

    // return this.playRadioInterface(
    //   this.$user.data.station_streamUrl,
    //   this.$user.data.station_token,
    //   this.$user.data.station_title,
    //   'from Radio NicaSource',
    //   this.$user.data.station_artUrl,
    //   backgroundImage,
    // );
  }

  @Handle(AlexaHandles.onAudioPlayer('PlaybackController.PlayCommandIssued'))
  resumeAudioForce(): void {
    // return this.playRadioInterface(
    //   this.$user.data.station_streamUrl,
    //   this.$user.data.station_token,
    //   this.$user.data.station_title,
    //   'from Radio NicaSource',
    //   this.$user.data.station_artUrl,
    //   backgroundImage,
    // );
    return this.resumeCurrentRadioStation();
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackStarted'))
  playbackStarted(): void {
    // console.log('AudioPlayer.PlaybackStarted');
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackNearlyFinished'))
  playbackNearlyFinished(): void {
    // console.log('AudioPlayer.PlaybackNearlyFinished');
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackFailed'))
  playbackFailed(): void {
    // if (this.$alexa) {
    //   const error = this.$alexa.audioPlayer.error;
    //   console.log('AudioPlayer.PlaybackFailed', error?.type, error?.message);
    // }
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackStopped'))
  playbackStopped(): void {
    // console.log('AudioPlayer.PlaybackStopped');
  }

  @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackFinished'))
  playbackFinished(): void {
    // console.log('AudioPlayer.PlaybackFinished');
  }
}
