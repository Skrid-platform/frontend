<template>
  <div class="paginated-result">
    <div class="navigation">
      <button id="csv-button" class="pagination-bt">Télécharger les résultats en CSV</button>

      <label id="score_nb_lb">Nombre de partitions : 0</label>
      <button id="prevPage" class="pagination-bt">Page précédente</button>
      <input type="number" min="1" value="1" id="page_nb_input" class="page-nb-input" />
      <label id="page_max_nb_lb">/ 0</label>
      <button id="nextPage" class="pagination-bt">Page suivante</button>
      <select id="nb_per_page_select">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="*">Tout</option>
      </select>
      <label id="nb_per_page_lb"> par page</label>
    </div>

    <div class="results-container" id="results-container">
      <h3 v-if="!data">Chargement</h3>
    </div>

    <div class="navigation">
      <button id="prevPage-bot" class="pagination-bt">Page précédente</button>
      <label id="page_max_nb_lb-bot">/ 0</label>
      <button id="nextPage-bot" class="pagination-bt">Page suivante</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

defineOptions({
  name: 'PaginatedResult',
});

defineProps({
  data: Array,
});

</script>

<style scoped>
.paginated-result {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.navigation {
  text-align: right;
}

/* .paginated-result { */
/*     flex: 0 0 20%; */
/*     overflow: hidden; */
/* } */

/* .collections {
    flex: 0 0 20%;
    background-color: #62aadd;
    padding: 0px;
    font-size: 20px;
} */

.pagination-bt {
  border-radius: 5px;
  min-height: 30px;
  min-width: 100px;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  background-color: #bfdaed;
  color: black;
  font-size: 12px;
  padding: 0 10px;
}

.pagination-bt:hover {
  background-color: #62aadd;
}

.pagination-bt:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

#csv-button {
  float: inline-start;
}

.page-nb-input {
  width: 40px;
}
</style>