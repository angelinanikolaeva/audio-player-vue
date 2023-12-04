<template>
  <div class="audio-player">
    <audio
      ref="audioPlayer"
      :src="getAudioUrl(audioOption.src)"
      class="audio-player__audio"
      @pause="onAudioPause"
      @play="onAudioPlay"
      @loadedmetadata="onLoadMetaData"
      @ended="onAudioEnded"
    ></audio>
    <div class="audio-player__volume">
      <app-button
        class="audio-player__button"
        @click="setVolumeToMin"
      >
        <app-icon name="volume-cross" />
      </app-button>
      <app-slider
        :model-value="volume"
        :min="0"
        :max="1"
        :step="0.01"
        @update:model-value="setVolume"
      ></app-slider
      ><app-button
        class="audio-player__button"
        @click="setVolumeToMax"
      >
        <app-icon name="volume-loud" />
      </app-button>
    </div>
    <h2 class="audio-player__song">{{ audioOption.title || '' }}</h2>
    <img
      alt="Audio cover"
      :src="getAudioImageUrl(audioOption.coverImg ? audioOption.coverImg : '')"
      :class="`${isPlaying ? 'audio__player-cover-anim' : ''}`"
    />
    <div class="audio-player__controls">
      <div class="audio-player__controls-item">
        <span class="time">{{ currentTimeStr }}</span>
        <app-slider
          class="slider"
          :model-value="currentTime"
          :min="0"
          :max="totalTime"
          @update:model-value="setTime"
        ></app-slider>
        <span class="time">{{ totalTimeStr }}</span>
      </div>

      <div class="audio-player__controls-item">
        <app-button
          aria-label="Play previous audio"
          class="audio-player__button"
          @click="playPrevAudio"
        >
          <app-icon
            name="rewind-left"
            width="20"
            height="20"
          />
        </app-button>
        <app-button
          :aria-label="isPlaying ? 'Pause audio' : 'Play audio'"
          class="audio-player__button"
          @click="togglePlayer"
        >
          <app-icon
            v-if="isPlaying"
            name="pause-stream"
            width="20"
            height="20"
          />
          <app-icon
            v-else
            name="play-stream"
            width="20"
            height="20"
          />
        </app-button>
        <app-button
          aria-label="Play next audio"
          class="audio-player__button"
          @click="playNextAudio"
        >
          <app-icon
            name="rewind-right"
            width="20"
            height="20"
          />
        </app-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  ref,
  toRefs,
} from 'vue';

import AppSlider from '../AppSlider/AppSlider.vue';
import AppButton from '../AppButton/AppButton.vue';
import { formatSecondsToTime } from '../../lib/util/formatTime';
import AppIcon from '../AppIcon/AppIcon.vue';
import { AudioPlayerOption } from './types';

const AudioPlayerOptionDefault: AudioPlayerOption = {
  src: '',
  title: '',
  autoPlay: false,
  coverImg: '',
};

const getAudioImageUrl = (name: string) => {
  return new URL(`../../assets/audio/covers/${name}`, import.meta.url).href;
};

const getAudioUrl = (name: string) => {
  return new URL(`../../assets/audio/${name}`, import.meta.url).href;
};

export default defineComponent({
  components: {
    AppSlider,
    AppButton,
    AppIcon,
  },
  props: {
    audioList: {
      type: Array as PropType<AudioPlayerOption[]>,
      required: true,
    },
  },
  emits: ['end'],
  setup(props) {
    const audioPlayer = ref<HTMLAudioElement>();
    const progressInterval = 200;
    let timer: any = null;

    const state = reactive({
      isPlaying: false,
      isLoop: true,
      isDragging: false,
      currentTime: 0,
      currentTimeStr: '00:00',
      totalTime: 0,
      totalTimeStr: '00:00',
      volume: 0.5,
      currentAudioIndex: 0,
    });

    const audioOption = computed(() => {
      if (props.audioList.length <= state.currentAudioIndex) {
        return AudioPlayerOptionDefault;
      }
      return props.audioList[state.currentAudioIndex];
    });

    const playUpdate = () => {
      if (state.isDragging || !audioPlayer.value) {
        return;
      }
      state.currentTime = audioPlayer.value.currentTime;
      state.currentTimeStr = formatSecondsToTime(state.currentTime);
    };

    const startTimer = () => {
      clearTimer();
      timer = window.setInterval(playUpdate, progressInterval);
      state.isPlaying = true;
    };

    const clearTimer = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const play = () => {
      if (!audioPlayer.value) return;
      audioPlayer.value.volume = state.volume;
      audioPlayer.value
        .play()
        .then(() => {
          startTimer();
          setTotalTime(audioPlayer.value!.duration);
        })
        .catch((error: any) => {
          console.error('Error occured while starting player', error);
        });
    };

    const pause = () => {
      if (!audioPlayer.value) return;
      audioPlayer.value.pause();
      state.isPlaying = false;
    };

    const togglePlayer = () => {
      if (state.isPlaying) {
        pause();
      } else {
        play();
      }
    };
    const setTotalTime = (seconds: number) => {
      state.totalTime = seconds;
      state.totalTimeStr = formatSecondsToTime(state.totalTime);
    };
    const setTime = (seconds: number) => {
      if (!audioPlayer.value) return;
      state.currentTime = seconds;
      audioPlayer.value.currentTime = seconds;
      state.totalTimeStr = formatSecondsToTime(state.totalTime);
      if (state.totalTime <= seconds) {
        return playNextAudio();
      }
      playUpdate();
    };
    const onAudioEnded = () => {
      playUpdate();
      clearTimer();
      playNextAudio();
    };
    const onAudioPause = () => {
      state.isPlaying = false;
      clearTimer();
    };
    const onAudioPlay = () => {
      state.isPlaying = true;
    };
    const onLoadMetaData = (e: any) => {
      setTotalTime(e.target.duration);
    };
    const setVolume = (volume: number) => {
      if (!audioPlayer.value) return;
      state.volume = volume;
      audioPlayer.value.volume = volume;
    };
    const setVolumeToMin = () => {
      if (!audioPlayer.value) return;
      state.volume = 0;
      audioPlayer.value.volume = 0;
    };
    const setVolumeToMax = () => {
      if (!audioPlayer.value) return;
      state.volume = 1;
      audioPlayer.value.volume = 1;
    };
    const playPrevAudio = () => {
      if (state.currentAudioIndex <= 0 && !state.isLoop) {
        return;
      }

      // if current audio is playing, restart it
      if (Math.floor(state.currentTime) > 0) {
        clearTimer();
        if (!audioPlayer.value) return;
        pause();
        setTime(0);
        play();
        return;
      }

      clearTimer();

      if (state.currentAudioIndex <= 0 && state.isLoop) {
        state.currentAudioIndex = props.audioList.length - 1;
      } else {
        state.currentAudioIndex--;
      }

      nextTick(() => {
        play();
      });
    };
    const playNextAudio = () => {
      if (
        state.currentAudioIndex + 1 >= props.audioList.length &&
        !state.isLoop
      ) {
        return;
      }

      clearTimer();

      if (
        state.currentAudioIndex + 1 >= props.audioList.length &&
        state.isLoop
      ) {
        state.currentAudioIndex = 0;
      } else {
        state.currentAudioIndex++;
      }

      nextTick(() => {
        play();
      });
    };

    return {
      audioPlayer,
      audioOption,
      ...toRefs(state),
      setTime,
      setVolume,
      setVolumeToMin,
      setVolumeToMax,
      togglePlayer,
      onAudioPause,
      onAudioPlay,
      onAudioEnded,
      onLoadMetaData,
      playPrevAudio,
      playNextAudio,
      getAudioImageUrl,
      getAudioUrl,
    };
  },
});
</script>

<style scoped lang="scss">
.audio-player {
  background-color: #ffff;
  background-image: url('@/shared/assets/icons/background_agima.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  padding: 10px;

  border-radius: 8px;
  box-shadow: 0px 16px 64px rgba(0, 0, 0, 0.08);

  .audio-player__button {
    background-color: var(--color-primary);
    border-radius: 50%;
    width: 30px;
    height: 30px;

    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: var(--color-primary-dark);
    }
  }

  .audio-player__volume {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .audio-player__song {
    font: var(--font-l);
  }

  .audio-player__audio {
    width: 100%;
    margin-bottom: 1rem;
  }
  .audio-player__controls {
    display: flex;
    flex-direction: column;
    gap: 5px;

    width: 100%;

    .audio-player__controls-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      .time {
        font: var(--font-m);
      }
      .slider {
        flex: 1;
      }
    }
  }
}
</style>
