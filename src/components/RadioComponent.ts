import { Component, BaseComponent, Intents, Handle, DeepPartial } from '@jovotech/framework';

import {
  AlexaHandles,
  AudioPlayerPlayOutput,
  AudioPlayerPlayOutputOptions,
  AudioPlayerStopOutput,
} from '@jovotech/platform-alexa';
import { MyNameOutput } from '../output/MyNameOutput';

const song = 'https://stereoromance.radioca.st/streams/128kbps.m3u';

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
  playRadio(
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

  // START handler (the entry point when another component redirects or delegates to it)
  START(): Promise<void> {
    return this.playRadio(
      'https://server.multimediamb.com:7000/stream/1/',
      'latuani',
      'La Tuani',
      'from Radio NicaSource',
      'https://cdn.webrad.io/images/logos/radios-co-ni/tuani.png',
      'https://p4.wallpaperbetter.com/wallpaper/122/787/757/background-radio-receiver-wallpaper-preview.jpg',
      'Thanks, we have your radio streaming request. ¡Enjoy!',
      true,
    );
  }

  @Intents(['AMAZON.ResumeIntent'])
  resumeAudio(): Promise<void> {
    return this.playRadio(
      'https://server.multimediamb.com:7000/stream/1/',
      'latuani',
      'La Tuani',
      'from Radio NicaSource',
      'https://cdn.webrad.io/images/logos/radios-co-ni/tuani.png',
      'https://p4.wallpaperbetter.com/wallpaper/122/787/757/background-radio-receiver-wallpaper-preview.jpg',
    );
  }

  @Handle(AlexaHandles.onAudioPlayer('PlaybackController.PlayCommandIssued'))
  resumeAudioForce(): Promise<void> {
    return this.playRadio(
      song,
      'romance',
      'Radio Romance',
      'from Radio NicaSource',
      'https://cdn.webrad.io/images/logos/radios-co-ni/stereo-romance.png',
      'https://p4.wallpaperbetter.com/wallpaper/122/787/757/background-radio-receiver-wallpaper-preview.jpg',
    );
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
