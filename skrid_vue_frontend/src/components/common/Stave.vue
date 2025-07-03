<template>
  <div>
    <div id="music-score"></div>
    <div class="clear_buttons">
      <button type="button" class="btn btn-info text-white" id="clear_all">Supprimer tout</button>
      <button @click="staveRepr.remove_last_note()" type="button" class="btn btn-info text-white">
        Supprimer la dernière note
      </button>
      <button
        type="button"
        class="btn btn-info text-white"
        v-if="player.is_playing"
        @click="player.stopMelody()"
        id="stop_melody"
      >
        Arrêter la mélodie
      </button>
      <button 
        v-else @click="player.plaMelody(staveRepr.melody)" type="button" class="btn btn-info text-white">
        Jouer la mélodie
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


const player = new Player();

onMounted(() => {
  
});
</script>

<style scoped>
#stop_melody {
  background: red;
}
button {
  background: #7ab6e0;
}
</style>