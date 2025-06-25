<template>
  <div class="wrapper">
    <header>
      <div class="column volume-slider"><span>Volume</span><input type="range" min="0" max="1" value="0.5" step="any" /></div>
      <div class="octave-modif">
        <div class="octave-modif-bt-div">
          <button class="btn btn-outline-secondary text-white octave-modif-bt" data-key="<" id="octave-minus">
            <span>Octave - (c)</span>
          </button>
          <button class="btn btn-outline-secondary text-white octave-modif-bt" data-key=">" id="octave-plus">
            <span>Octave + (v)</span>
          </button>
        </div>
        <label id="octave-lb" class="white-label">4</label>
      </div>
      <div class="column keys-checkbox"><span>Touches</span><input type="checkbox" checked /></div>
    </header>
    <ul class="piano-keys">
      <li class="key white" data-key="C4">
        <span
          >DO(C) <br />
          q</span
        >
      </li>
      <li class="key black" data-key="C#4">
        <span
          >DO#(c#) <br />
          z</span
        >
      </li>
      <li class="key white" data-key="D4">
        <span
          >RE(D) <br />
          s</span
        >
      </li>
      <li class="key black" data-key="D#4">
        <span
          >RE#(D#) <br />
          e</span
        >
      </li>
      <li class="key white" data-key="E4">
        <span
          >MI(E) <br />
          d</span
        >
      </li>
      <li class="key white" data-key="F4">
        <span
          >FA(F) <br />
          f</span
        >
      </li>
      <li class="key black" data-key="F#4">
        <span
          >FA#(F#) <br />
          t</span
        >
      </li>
      <li class="key white" data-key="G4">
        <span
          >SOL(G) <br />
          g</span
        >
      </li>
      <li class="key black" data-key="G#4">
        <span
          >SOL#(G#) <br />
          y</span
        >
      </li>
      <li class="key white" data-key="A4">
        <span
          >LA(A) <br />
          h</span
        >
      </li>
      <li class="key black" data-key="A#4">
        <span
          >LA#(A#) <br />
          u</span
        >
      </li>
      <li class="key white" data-key="B4">
        <span
          >SI(B) <br />
          j</span
        >
      </li>
      <li class="key white" data-key="C5">
        <span
          >DO(C) <br />
          k</span
        >
      </li>
      <li class="key black" data-key="C#5">
        <span
          >DO#(C#) <br />
          o</span
        >
      </li>
      <li class="key white" data-key="D5">
        <span
          >RE(D) <br />
          l</span
        >
      </li>
      <li class="key black" data-key="D#5">
        <span
          >RE#(D#) <br />
          p</span
        >
      </li>
      <li class="key white" data-key="E5">
        <span
          >MI(E) <br />
          m</span
        >
      </li>
      <li class="key white" data-key="F5">
        <span
          >FA(F) <br />
          ù</span
        >
      </li>
      <li class="key black" data-key="F#5">
        <span
          >FA#(F#) <br />
          )</span
        >
      </li>
      <li class="key white" data-key="G5">
        <span
          >SOL(G) <br />
          *</span
        >
      </li>
      <li class="key black" data-key="G#5">
        <span
          >SOL#(G#) <br />
          $</span
        >
      </li>
      <li class="key white" data-key="A5">
        <span
          >LA(A) <br />
          _</span
        >
      </li>
      <li class="key black" data-key="A#5">
        <span
          >LA#(A#)<br />
          _</span
        >
      </li>
      <li class="key white" data-key="B5">
        <span
          >SI(B)<br />
          _</span
        >
      </li>
    </ul>
    <br />
    <!-- Ajout du boutton options pour optimiser le visuel de la page / clavier -->
    <!--<button id="toggleButton1" class="btn btn-outline-secondary text-white" type="button" data-bs-toggle="collapse" data-bs-target="#bellow-keyboard" aria-expanded="false" aria-controls="bellow-keyboard" data-button="options1">
          Options avancées
        </button>-->
    <!--<div class='below-keyboard collapse collapse-vertical' id="bellow-keyboard">-->
    <div class="d-flex gap-4">
      <!-- <button data-key='r' id='silence-bt'><span>Silence (b)</span></button> -->
      <button class="m-5" data-key="r" id="silence-bt">
        <span>
          <img src="public/silences_pics/s1.png" height="40px" alt="Silence" />
          /
          <img src="public/silences_pics/s4.png" height="40px" />
          /
          <img src="public/silences_pics/s8.png" height="40px" />
          (b)
        </span>
      </button>

      <div class="rhythm-modif">
        <button class="rhythm-modif-bt" data-key="w" id="whole-bt">
          <img src="public/notes_pics/1.png" height="50px" alt="Whole" />
        </button>
        <button class="rhythm-modif-bt" data-key="hd" id="half-dotted-bt">
          <img src="public/notes_pics/2d.png" height="50px" alt="Dotted half" />
        </button>
        <button class="rhythm-modif-bt" data-key="h" id="half-bt">
          <img src="public/notes_pics/2.png" height="50px" alt="Half" />
        </button>
        <button class="rhythm-modif-bt" data-key="qd" id="quarter-dotted-bt">
          <img src="public/notes_pics/4d.png" height="50px" alt="Dotted quarter" />
        </button>
        <button class="rhythm-modif-bt" data-key="q" id="quarter-bt">
          <img src="public/notes_pics/4.png" height="50px" alt="Quarter" />
        </button>
        <button class="rhythm-modif-bt" data-key="8d" id="8th-dotted-bt">
          <img src="public/notes_pics/8d.png" height="50px" alt="Dotted 8-th" />
        </button>
        <button class="rhythm-modif-bt" data-key="8" id="8th-bt">
          <img src="public/notes_pics/8.png" height="50px" alt="8-th" />
        </button>
        <button class="rhythm-modif-bt" data-key="16d" id="16th-dotted-bt">
          <img src="public/notes_pics/16d.png" height="50px" alt="Dotted 16-th" />
        </button>
        <button class="rhythm-modif-bt" data-key="16" id="16th-bt">
          <img src="public/notes_pics/16.png" height="50px" alt="16-th" />
        </button>
        <button class="rhythm-modif-bt" data-key="32d" id="32th-dotted-bt">
          <img src="public/notes_pics/32d.png" height="50px" alt="Dotted 32-th" />
        </button>
        <button class="rhythm-modif-bt" data-key="32" id="32th-bt">
          <img src="public/notes_pics/32.png" height="50px" alt="32-th" />
        </button>
      </div>

      <!-- <div class='qwerty-switch'>
            <label class='white-label'>
              <input type='checkbox' id='qwerty-checkbox'>
              Qwerty
            </label>
          </div> -->
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Clavier',
});
</script>

<style scoped>
</style>