<template>
  <div>
    <div class="search-pattern">
      <stave></stave>
      <clavier></clavier>

    </div>
  </div>
</template>

<script setup>
import Clavier from '@/components/common/Clavier.vue';
import Stave from '@/components/common/Stave.vue';

defineOptions({
  name: 'SearchInterfaceView',
});
</script>

<style scoped>
.search-pattern {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
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