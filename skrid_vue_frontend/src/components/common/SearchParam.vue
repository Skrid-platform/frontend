<template>
   <div class="flex-column" style="display: flex; justify-content: space-between; gap: 20px">
        <!-- choix de la collection dans laquelle recherché -->
        <div class="collections-options">
          <label for="collections">Collection dans lesquelles rechercher : </label><br />
          <select id="collections" name="collections">
            <option @click="authors.selectedAuthorIndex = index;" v-for="(author, index) in authors.listeAuthors" :key="index" :value="author">{{ author }}</option>
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
</template>

<script setup>
import { useAuthorsStore } from '@/stores/authorsStore.ts';
import { onMounted } from 'vue';

defineOptions({
  name: 'SearchParam',
});

const authors = useAuthorsStore();
onMounted(() => {
  authors.loadAuthors();
});
</script>

<style scoped>

</style>