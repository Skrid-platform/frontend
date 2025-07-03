<template>
  <div class="search-param">
    <!-- choose the collection in which to search -->
    <div class="collections-options">
      <label for="collections">Collection dans lesquelles rechercher : </label><br />
      <select id="collections" name="collections">
        <option
          @click="authors.selectedAuthorIndex = index"
          v-for="(author, index) in authors.listeAuthors"
          :key="index"
          :value="author"
        >
          {{ author }}
        </option>
      </select>
    </div>

    <hr />

    <h4 class="text-center">Sélectionnez le type de recherche</h4>

    <!-- Button to start research -->

    <div class="search-buttons">
      <button id="stricte" type="button" class="btn text-white tooltip-lb">Recherche exacte</button>
      <button id="modereeMelo" type="button" class="btn text-white">
        Recherche avec tolérance <br />
        sur la hauteur des notes
      </button>
      <button id="modereeRythm" type="button" class="btn text-white">
        Recherche avec tolérance <br />
        sur le rythme
      </button>
      <!--<button id="libre" type="button" class="btn text-white" style="background-color: #7ab6e0;">Recherche exploratoire</button>-->
    </div>

    <button id="optionToggleButton" class="btn btn-outline-secondary" type="button" @click="toggleAdvancedOption()">
      Options avancées
    </button>

    <transition name="collapse">
      <div class="toggle-options" v-if="advancedOptionShow">
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
        </div>
        <div class="fuzzy-options">
          <label class="tooltip-lb" id="pitch-dist-lb">
            Tolérance de hauteur
            <input type="number" min="0" value="0" step="0.5" id="pitch-dist-select" class="nb-select" />
            <!-- <span class='tooltiptext'>Permet d'augmenter la tolérance sur la hauteur de note (en tons)</span> -->
          </label>

          <label class="tooltip-lb" id="duration-dist-lb">
            Facteur de durée
            <input type="number" min="1" value="1" step="0.125" id="duration-factor-select" class="nb-select-large" />
            <!-- <span class='tooltiptext'>Permet d'augmenter la tolérance sur la durée des notes (coefficient multiplicateur).</span> -->
          </label>

          <label class="tooltip-lb" id="sequencing-dist-lb">
            Écart de durée
            <input type="number" min="0" value="0" step="0.125" id="duration-gap-select" class="nb-select-large" />
            <!-- <span class='tooltiptext'>Permet de sauter des notes (en durée : 1 pour pleine, 0.5 pour ronde, 0.25 pour croche, ...)</span> -->
          </label>

          <label class="tooltip-lb" id="alpha-lb">
            Alpha
            <input type="number" min="0" max="100" value="0" step="5" id="alpha-select" class="nb-select" />
            %
            <!-- <span class='tooltiptext'>Permet de filtrer les résultats en retirant tous ceux qui ont un score inférieur à alpha.</span> -->
          </label>

          <hr />

          <button type="button" class="btn text-white send-button" id="send-button">Recherche</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import StaveRepresentation from '@/lib/stave.js';
import { useAuthorsStore } from '@/stores/authorsStore.ts';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'SearchParam',
});

const staveRepr = StaveRepresentation.getInstance();
const authors = useAuthorsStore();
const advancedOptionShow = ref(false); //flag for display advanced options or not

const toggleAdvancedOption = () => {
  advancedOptionShow.value = !advancedOptionShow.value;
};

onMounted(() => {
  authors.loadAuthors();
});
</script>

<style scoped>
.search-param {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}
.search-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}
.search-buttons > button {
  background: #7ab6e0;
  color: white;
}
.search-buttons > button:hover {
  background: #006485;
}
.fuzzy-options {
  display: flex;
  flex-direction: column;
  justify-content: start;
}
#send-button {
  background: #006485;
  align-self: center;
}
#optionToggleButton {
  background: white;
}
#optionToggleButton:hover {
  background: #6c757d;
  color: white;
}

.nb-select {
  width: 50px;
}
.nb-select-large {
  width: 60px;
}
.toggle-options {
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;

  border-radius: 5px;
  max-width: 400px;
}

.collapse-enter-active {
  overflow: hidden;
  animation: collapse 0.5s;
}
.collapse-leave-active {
  overflow: hidden;
  animation: collapse 0.5s reverse;
}
@keyframes collapse {
  0% {
    max-height: 0px;
  }
  100% {
    max-height: 400px;
  }
}
</style>