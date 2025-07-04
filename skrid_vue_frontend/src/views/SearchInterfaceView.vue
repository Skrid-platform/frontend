<template>
  <div>
    <div class="search-pattern">
      <stave></stave>
      <br />
      <keyboard></keyboard>
      <br />
      <search-param></search-param>
    </div>
    <paginated-results :data="resultsQuery" v-if="resultsQuery"/>
  </div>
</template>

<script setup>
import Stave from '@/components/common/Stave.vue';
import Keyboard from '@/components/common/Keyboard.vue';
import SearchParam from '@/components/common/SearchParam.vue';
import PaginatedResults from '@/components/common/PaginatedResults.vue';
import { ref } from 'vue';

defineOptions({
  name: 'SearchInterfaceView',
});

const resultsQuery = ref(null);

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