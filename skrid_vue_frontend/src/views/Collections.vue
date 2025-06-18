<template>
  <div>
    <div class="searchbar-box">
      <h1 class="searchbar-title p-2">Les collections</h1>
    </div>
    <div class="father_container d-flex flex-row gap-1" id="fatherContainer">
      <!-- MENU LEFT -->
      <div
        class="card-lg shadow bg-body-tertiary gap-5 position-fixed rounded-end"
        id="collectionMenu"
        style="width: 18rem; top: 30; left: 0; height: 60vh; z-index: 1"
      >
        <div class="card-header text-center fs-1 d-flex flex-column">
          <i class="bi bi-people-fill fs-1" style="color: #006485"></i>
          Collections
        </div>
        <hr />
        <br />
        <div class="list-group gap-5" id="list-tab" role="tablist">
          <a
            v-for="(author, index) in authors.listeAuthors"
            :key="index"
            class="btn list-group-item-action w-75 mx-auto d-flex align-items-center"
            :class="selectedIndexAuthor == index ? 'selected' : 'authors'"
            @click="authorButtonHandler(author, index)"
          >
            {{ author }}
          </a>
        </div>
      </div>
      <!-- PARTITIONS VIEW (avec du margin-left pour ne pas être caché sous le menu) -->
      <div class="archives" style="margin-left: 18rem">
        <p id="archives" class="text-secondary m-4">
          Télécharger la collection sous la forme d'une archive :
          <a :href="`data/${selectedNameAuthor}/archives/${selectedNameAuthor}_FilesMei.zip`">MEI</a>,
          <a :href="`data/${selectedNameAuthor}/archives/${selectedNameAuthor}_FilesLy.zip`">LY</a>,
          <a :href="`data/${selectedNameAuthor}/archives/${selectedNameAuthor}_FilesMid.zip`">MID</a>,
          <a :href="`data/${selectedNameAuthor}/archives/${selectedNameAuthor}_FilesMusicXML.zip`">MUSICXML</a>,
          <a :href="`data/${selectedNameAuthor}/archives/${selectedNameAuthor}_FilesPdf.zip`">PDF</a>,
          <a :href="`data/${selectedNameAuthor}/archives/${selectedNameAuthor}_FilesSvg.zip`">SVG</a>
        </p>
        <paginated-result :data="dataCollection"/>
      </div>
    </div>
  </div>

  <!-- Hidden div to store authors data (c'est moche !!!)-->
  <!-- <div id="authors" style="display: none;">
    <%= JSON.stringify(authors) %>
  </div> -->
</template>

<script setup>
import PaginatedResult from '@/components/common/PaginatedResult.vue';
import { useAuthorsStore } from '@/stores/authorsStore';
import { computed, onMounted, ref } from 'vue';

defineOptions({
  name: 'CollectionsView',
});

const authors = useAuthorsStore();
const selectedIndexAuthor = ref(0);
const selectedNameAuthor = computed(() => authors.listeAuthors[selectedIndexAuthor.value]);

const dataCollection = ref([]);

onMounted(() => {
  authors.loadAuthors();
  
});

const authorButtonHandler = (author, index) => {
  selectedIndexAuthor.value = index;
};
</script>

<style scoped>
#menuCollection {
  margin-top: 8%;
}

.searchbar-box {
  background-color: white;
  color: black;
  border-bottom: 0.5px solid aqua;
}
.selected {
  background-color: #006485;
  color: white;
}

.selected:hover {
  background-color: #0082aa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.authors {
  background-color: #edebe6;
}
.authors:hover {
  /* background-color: #d0d0d0; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>