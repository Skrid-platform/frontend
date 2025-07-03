<template>
  <div>
    <div class="search-pattern">
      <stave></stave>
      <br />
      <keyboard></keyboard>
      <br />
      <search-param></search-param>
    </div>
    <paginated-results :data="resultsQuery" />
  </div>
</template>

<script setup>
import Stave from '@/components/common/Stave.vue';
import Keyboard from '@/components/common/Keyboard.vue';
import SearchParam from '@/components/common/SearchParam.vue';
import PaginatedResults from '@/components/common/PaginatedResults.vue';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'SearchInterfaceView',
});

const resultsQuery = ref([]);

onMounted(() => {
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