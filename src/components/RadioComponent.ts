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
import { RadioApiFilter, RadioStations } from '../types';
import { backgroundImage } from '../output/MyNameOutput';

const default_streamUrl = 'https://stereoromance.radioca.st/streams/128kbps.m3u';
const default_token = 'radio-nicasource';
const default_title = 'Radio NicaSource';
const default_artUrl = backgroundImage;

// const default_title = 'Estéreo Romance';
// const default_artUrl = 'https://www.stereo-romance.com/images/logo-web.png';

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
  // private _station: Station | null;

  // constructor(jovo: Jovo) {
  //   super(jovo);
  //   this._station = null;
  // }

  // public get station(): Station | null {
  //   return this._station;
  // }

  // public set station(newStation: Station | null) {
  //   this._station = newStation;
  // }

  START(): Promise<void> {
    return this.searchRadioByData();
  }

  @Intents(['AMAZON.PauseIntent'])
  END(): Promise<void> {
    return this.$send(AudioPlayerStopOutput);
  }

  @Intents(['AMAZON.ResumeIntent'])
  resumeAudio(): Promise<void> {
    return this.resumeCurrentRadioStation();
  }

  @Handle(AlexaHandles.onAudioPlayer('PlaybackController.PlayCommandIssued'))
  resumeAudioForce(): Promise<void> {
    return this.resumeCurrentRadioStation();
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

  async reserachRadioStations(filter: RadioApiFilter): Promise<RadioStations[]> {
    const stations: RadioStations[] = await RadioBrowser.searchStations(filter);

    return stations.filter((station) => station.url_resolved.endsWith('.mp3'));
  }

  async searchRadioByData(withMessage = true): Promise<void> {
    const filter = {
      limit: 100,
      // tag: this.$user.data.musicGenre || 'hip hop',
      country: this.$user.data.country || 'Nicaragua',
      codec: 'MP3',
      is_https: true,
      hidebroken: true,
    };

    let radios: RadioStations[];

    try {
      radios = await this.reserachRadioStations(filter);

      // No radio station found with country and tag (Genre)
      if (radios.length === 0) {
        delete filter.country;

        // Search radio station only by country
        radios = await this.reserachRadioStations(filter);

        if (radios.length === 0) {
          filter.limit = 500;

          // Search 500 radio stations without country
          radios = await this.reserachRadioStations(filter);
        }
      }

      if (radios.length === 0) throw 'There are no radio stations in your country';

      const randomStation = Math.floor(Math.random() * (radios.length - 1)) + 1;
      const radioStation = radios[randomStation - 1];

      // Save station in DB

      if (withMessage)
        this.$user.data.station = {
          streamUrl: radioStation.url_resolved || default_streamUrl,
          token: radioStation.stationuuid || default_token,
          title: radioStation.name || default_title,
          artUrl: radioStation.favicon || default_artUrl,
        };

      return this.playRadioInterface(
        radioStation.url_resolved || default_streamUrl,
        radioStation.stationuuid || default_token,
        radioStation.name || default_title,
        'from Radio NicaSource',
        radioStation.favicon || default_artUrl,
        backgroundImage,
        'Thanks, we have your radio streaming request. ¡Enjoy!',
        withMessage,
      );
    } catch (error) {
      console.error('Error searching radio stations: ', error);
      return this.$send({ message: 'Error searching radio stations' });
    }
  }

  playRadioInterface(
    streamUrl: string,
    token: string,
    title: string,
    subtitle: string,
    artUrl: string,
    backgroundImageUrl: string,
    message = '',
    withMessage = false,
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
    };

    if (withMessage) playerSettings.message = message;

    return this.$send(AudioPlayerPlayOutput, playerSettings);
  }

  resumeCurrentRadioStation(): Promise<void> {
    // return this.playRadioInterface(
    //   this.$user.data.station_streamUrl,
    //   this.$user.data.station_token,
    //   this.$user.data.station_title,
    //   'from Radio NicaSource',
    //   this.$user.data.station_artUrl,
    //   backgroundImage,
    // );

    return this.searchRadioByData(false);
  }
}
