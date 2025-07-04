<template>
  <div>
    <div id="music-score"></div>
    <div class="clear_buttons">
      <button @click="staveRepr.clear_all_pattern()" type="button" class="btn btn-info text-white">Supprimer tout</button>
      <button @click="staveRepr.remove_last_note()" type="button" class="btn btn-info text-white">
        Supprimer la dernière note
      </button>
      <button
        type="button"
        class="btn btn-info text-white"
        v-if="player.is_playing.value"
        @click="player.stopMelody()"
        id="stop_melody"
      >
        Arrêter la mélodie
      </button>
      <button 
        v-else @click="player.playMelody(staveRepr.melody)" type="button" class="btn btn-info text-white">
        Jouer la mélodie
      </button>
    </div>
  </div>
</template>

<script setup>
import Player from '@/lib/player.js';
import StaveRepresentation from '@/lib/stave.js';
import { onMounted } from 'vue';

defineOptions({
  name: 'Stave',
});

const staveRepr = StaveRepresentation.getInstance();
const player = Player.getInstance();

onMounted(() => {
  staveRepr.init();
});
</script>

<style scoped>
#stop_melody {
  background: red;
}
button {
  background: #7ab6e0;
}
.clear_buttons {
  align-self: center;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>