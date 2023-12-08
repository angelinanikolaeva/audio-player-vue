<template>
  <div class="main_page">
    <audio-player :audio-list="audioList"></audio-player>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AudioPlayer from '@/shared/ui/AudioPlayer/AudioPlayer.vue';
import { AudioPlayerOption } from '@/shared/ui/AudioPlayer/types';

export default defineComponent({
  name: 'MainPage',
  components: { AudioPlayer },
  computed: {
    // IMPORTANT: a list of fake audio list
    audioList(): AudioPlayerOption[] {
      return [
        {
          src: 'badass.mp3',
          title: 'Badass',
          coverImg: 'badass.webp',
        },
        {
          src: 'evolution.mp3',
          title: 'Evolution',
          coverImg: 'evolution.webp',
        },
        {
          src: 'ofeliasdream.mp3',
          title: 'Ofelias Dream',
          coverImg: 'ofeliasdream.webp',
        },
        {
          src: 'onceagain.mp3',
          title: 'Once again',
          coverImg: 'onceagain.webp',
        },
        {
          src: 'photoalbum.mp3',
          title: 'Photo album',
          coverImg: 'photoalbum.webp',
        },
        {
          src: 'pianomoment.mp3',
          title: 'Piano moment',
          coverImg: 'pianomoment.webp',
        },
        {
          src: 'slowmotion.mp3',
          title: 'Slow motion',
          coverImg: 'slowmotion.webp',
        },
        {
          src: 'tomorrow.mp3',
          title: 'Tomorrow',
          coverImg: 'tomorrow.webp',
        },
      ];
    },
  },
});
</script>

<style lang="scss" scoped>
.main_page {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
