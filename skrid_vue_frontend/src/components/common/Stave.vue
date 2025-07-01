<template>
  <div>
    <div id="music-score"></div>
    <div class="clear_buttons">
      <button type="button" class="btn btn-info text-white" style="background-color: #7ab6e0" id="clear_all">
        Supprimer tout
      </button>
      <button type="button" class="btn btn-info text-white" style="background-color: #7ab6e0" id="clear_last_note">
        Supprimer la dernière note
      </button>
      <button @click="player.play" type="button" class="btn btn-info text-white" style="background-color: #7ab6e0" id="play_melody">
        <span v-if="player.is_playing" id="stop_melody">
          Arrêter la mélodie
        </span>
        <span v-else id="play_melody">
          Jouer la mélodie
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import Player from '@/lib/player.js';
import { useStaveStore } from '@/stores/staveStore';
import { onMounted } from 'vue';

defineOptions({
  name: 'Stave',
});

const staveRepr = useStaveStore();
const player = new Player();

onMounted(() => {
  const musicScoreElement = document.getElementById('music-score');
  staveRepr.init(musicScoreElement);
});
</script>

<style scoped>
#stop_melody {
  background: red;
}
</style>