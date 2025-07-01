<template>
  <div>
    <div class="search-pattern">
      <stave></stave>
      <br />
      <clavier></clavier>
      <br />
      <div class="flex-column" style="display: flex; justify-content: space-between; gap: 20px">
        <div class="collections-options">
          <label for="collections">Collection dans lesquelles rechercher : </label><br />
          <select id="collections" name="collections">
            <option v-for="author in authors.listeAuthors" :key="author" :value="author">{{ author }}</option>
          </select>
        </div>
        <hr />
        <!-- START TEST PRESET BUTTON -->
        <div class="flex-column" style="display: flex; gap: 20px">
          <h4 class="text-center">Sélectionnez le type de recherche</h4>
          <div class="flex-row" style="display: flex; gap: 40px">
            <button id="stricte" type="button" class="btn text-white tooltip-lb" style="background-color: #7ab6e0">
              Recherche exacte
            </button>
            <button id="modereeMelo" type="button" class="btn text-white" style="background-color: #7ab6e0">
              Recherche avec tolérance <br />
              sur la hauteur des notes
            </button>
            <button id="modereeRythm" type="button" class="btn text-white" style="background-color: #7ab6e0">
              Recherche avec tolérance <br />
              sur le rythme
            </button>
            <!--<button id="libre" type="button" class="btn text-white" style="background-color: #7ab6e0;">Recherche exploratoire</button>-->
          </div>
        </div>
        <button
          id="toggleButton2"
          class="btn btn-outline-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidthExample"
          aria-expanded="false"
          aria-controls="collapseWidthExample"
          data-button="options2"
        >
          Options avancées
        </button>

        <div style="min-height: 120px">
          <div class="collapse collapse-vertical" id="collapseWidthExample">
            <div class="card card-body" style="width: 300px">
              <div class="general-options">
                <label class="tooltip-lb" id="pitch-lb">
                  <input id="pitch-cb" type="checkbox" checked />
                  Hauteur des notes
                  <!-- <span class='tooltiptext'>Permet de prendre en compte / ignorer la hauteur des notes</span> --> </label
                ><br />
                <label class="tooltip-lb" id="rhythm-lb">
                  <input id="rhythm-cb" type="checkbox" checked />
                  Rythme
                  <!-- <span class='tooltiptext'>Permet de prendre en compte / ignorer le rythme (la durée) des notes</span> --> </label
                ><br />
                <label id="transpose-lb" class="tooltip-lb">
                  <input id="transpose-cb" type="checkbox" />
                  Autoriser les transpositions
                  <!-- <span class='tooltiptext'>Permet d'obtenir les partitions dont la hauteur des notes de la mélodie est décalée</span> --> </label
                ><br />
                <label id="homothety-lb" class="tooltip-lb">
                  <input id="homothety-cb" type="checkbox" />
                  Autoriser les variations de tempo </label
                ><br />
                <label id="incipit-lb" class="tooltip-lb">
                  <input id="incipit-cb" type="checkbox" />
                  Chercher uniquement dans les incipits </label
                ><br />
                <!--<label id='contour-lb' class='tooltip-lb'>
                  <input id='contour-cb' type='checkbox'>
                  Correspondance du contour seulement
                  <span class='tooltiptext'>Garde seulement le signe des intervalles entres les notes (haut, bas, égal).</span>
                </label>-->
              </div>
              <div class="fuzzy-options">
                <label class="tooltip-lb" id="pitch-dist-lb">
                  Tolérance de hauteur
                  <input type="number" min="0" value="0" step="0.5" id="pitch-dist-select" class="nb-select" />
                  <!-- <span class='tooltiptext'>Permet d'augmenter la tolérance sur la hauteur de note (en tons)</span> --> </label
                ><br />

                <label class="tooltip-lb" id="duration-dist-lb">
                  Facteur de durée
                  <input type="number" min="1" value="1" step="0.125" id="duration-factor-select" class="nb-select-large" />
                  <!-- <span class='tooltiptext'>Permet d'augmenter la tolérance sur la durée des notes (coefficient multiplicateur).</span> --> </label
                ><br />

                <label class="tooltip-lb" id="sequencing-dist-lb">
                  Écart de durée
                  <input type="number" min="0" value="0" step="0.125" id="duration-gap-select" class="nb-select-large" />
                  <!-- <span class='tooltiptext'>Permet de sauter des notes (en durée : 1 pour pleine, 0.5 pour ronde, 0.25 pour croche, ...)</span> --> </label
                ><br />

                <label class="tooltip-lb" id="alpha-lb">
                  Alpha
                  <input type="number" min="0" max="100" value="0" step="5" id="alpha-select" class="nb-select" />
                  %
                  <!-- <span class='tooltiptext'>Permet de filtrer les résultats en retirant tous ceux qui ont un score inférieur à alpha.</span> -->
                </label>
                <hr />
                <div class="clear_buttons">
                  <button type="button" class="btn text-white send-button" style="background-color: #006485" id="send-button">
                    Recherche
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="flex card card-body position relative">
              <div class="flex flex-column position-absolute top-50 start-50 translate-middle">
                <button>ronde</button>
                <button>blanche</button>
                <button>noir</button>
                <button>croche</button>
              </div>
            </div>-->
        </div>
      </div>
    </div>
    <paginated-results :data="resultsQuery" />
  </div>
</template>

<script setup>
import Clavier from '@/components/common/Clavier.vue';
import Stave from '@/components/common/Stave.vue';
import PaginatedResults from '@/components/common/PaginatedResults.vue';
import { onMounted } from 'vue';
import { useAuthorsStore } from '@/stores/authorsStore.ts';
import StaveRepresentation from '@/lib/stave.js';
import Player from '@/lib/player.js';

defineOptions({
  name: 'SearchInterfaceView',
});

const authors = useAuthorsStore();
const staveRepr = new StaveRepresentation()
const player = new Player();

onMounted(() => {
  authors.loadAuthors();
  document.addEventListener('keydown', keyListener);
  document.addEventListener('keyup', keyListener);
});

/**
 * Manages event associated to key presses.
 */
function keyListener(event) {
    //------Get the key (convert if qwerty)
    const qwerty_ch = document.getElementById('qwerty-checkbox');
    let key;

    // if (qwerty_ch.checked) {
    //     key = qwerty_us_to_azerty[event.key] || event.key;
    // }
    // else
    //     key = event.key;

    key = event.key;

    //------Select the action corresponding to the key
    //---Delete all
    if (event.type == 'keydown' && event.key == 'Backspace' && event.ctrlKey)
        staveRepr.clear_all_pattern();

    //---Delete last note
    else if (event.type == 'keydown' && event.key == 'Backspace')
        staveRepr.remove_last_note();

    //---Change octave
    else if (event.type == 'keydown' && (event.key == '-' || event.key == '+' || event.key == 'c' || event.key == 'v')) {
        if (event.key == '-' || event.key == 'c')
            changeOctave(-1);
        else
            changeOctave(1);
    }

    //---Ignore repeat key for all the following mappings
    else if (event.repeat)
        return;

    //---Research with enter
    else if (event.type == 'keydown' && event.key == 'Enter')
        searchButtonHandler()

    //---Handle piano keys
    else if (key in mapping_azerty) {
        let note_json = mapping_azerty[key];
        let note = note_json.pitch + '/' + (note_json.octave + octave);
        let key_id = note_json.pitch + (note_json.octave + 4);

        if (note_json.pitch == 'r') {
            note = 'r';
            key_id = 'r';
        }

        if (event.type == 'keydown') { // Pressed down : play sound, start timer
            keyDown(note, key_id);
        }
        else if (event.type == 'keyup') { // Key released : add note
            keyUp(note, key_id);
        }
    }
}
</script>

<style scoped>
.search-pattern {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin-top: 70px;
  /* border-radius: 20px; */
  /* background-color: rgb(198, 198, 235); */
  /* width: 1000px; */
  position: relative;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>