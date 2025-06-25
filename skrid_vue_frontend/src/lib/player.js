/**
 * Class defining methods to play music from the vexflow stave
 */
class Player {
    // #currently_played_notes;

    /** Stores notes when they are beeing played */
    #currently_played_notes_playback;

    /** Store when the user plays the melody */
    #is_playing;
    /** Flag to stop the melody from playing */
    #stop_melody;

    constructor() {
        // this.#currently_played_notes = {};
        this.#currently_played_notes_playback = {};

        this.#is_playing = false;
        this.#stop_melody = false;
    }

    /**
     * Plays the sound of the button that has been pressed
     *
     * @param {string} note - the note to play (format example : C#4, C4)
     * @param {Audio} [audio=null] - if not null, use this audio to make the sound
     * @param {number} [volume=0.5] - the audio volume (in [0, 1])
     * */
    playTune(note, audio=null, volume=0.5) {
        if (note == 'r')
            return;

        if (audio == null) {
            this.#currently_played_notes_playback[note] = {audio: new Audio()};
            audio = this.#currently_played_notes_playback[note].audio;
        }

        let key = note.replace('#', 's');

        if (key.includes('s')) { // convert sharp to flat
            const Notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

            for (let k = 0 ; k < Notes.length ; ++k) {
                if (key[0] == Notes[k]) {
                    key = key.replace(Notes[k], Notes[(k + 1) % Notes.length]);
                    key = key.replace('s', 'b');
                    break;
                }
            }
        }

        audio.volume = volume;
        audio.src = `acoustic_grand_piano-mp3/${key}.mp3`;

        audio.play();
    }

    /**
     * Stops the sound for the given note, with a fade out.
     *
     * @param {string} note - the note to stop playing (format example : C#/4, C/4)
     * @param {Audio} [audio=null] - if not null, use this audio to stop the sound.
     */
    stopTune(note, audio=null) {
        if (note == 'r')
            return;

        let note_arr = note.replace('/', '');

        if (audio == null) {
            audio = this.#currently_played_notes_playback[note_arr].audio;
            delete this.#currently_played_notes_playback[note_arr];
        }

        var fadeAudio = setInterval(function() {
            if (audio.volume > 0) {
                audio.volume -= 1/8;
            }
            else {
                clearInterval(fadeAudio);
                audio.pause();
            }
        }, 30);
    }

    /**
     * Plays a note and stop after the given rhythm.
     *
     * @param {string} note - the note (pitch) to play (e.g C#/4) ;
     * @param {string} rhythm - the rhythm of the note (e.g h, 8d, ...)
     */
    playNoteWithRhythm(note, rhythm) {
        let audio = new Audio();

        this.playTune(note, audio);

        // let audio = currently_played_notes_playback[note].audio;

        let class_inst = this;
        var stopAudio = setInterval(function() {
            if (audio.currentTime >= 2 * durationNoteWithDots[rhythm]) {
                clearInterval(stopAudio);
                class_inst.stopTune(note, audio);
            }
        }, 1)
    }

    /**
     * Wait `ms` ms.
     *
     * @param {number} ms - the time to wait, in ms.
     */
    #sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Plays / stop the melody from the `melody` global array.
     *
     * If the melody is already playing, it stops it. Otherwise, it plays it.
     *
     * @param {Array} melody - the `melody` array from {@linkcode StaveRepresentation}
     */
    async playMelody(melody) {
        for (let k = 0 ; k < melody.length ; ++k) {
            if (!this.#stop_melody) {
                let duration = melody[k].dots > 0 ? melody[k].duration + 'd' : melody[k].duration;

                if (melody[k].noteType == 'r')
                    this.playNoteWithRhythm('r')
                else
                    melody[k].keys.forEach((key) => {this.playNoteWithRhythm(key.replace('/', ''), duration)}); // Play chord (or just one note)

                await this.#sleep(1000 * durationNoteWithDots[duration]);
            }
            else {
                this.#stop_melody = false;
                break;
            }
        }
    }

    /**
     * Plays the melody if it not currently playing.
     * Otherwise stop it.
     *
     * @param {HTMLElement} play_bt - the HTML button used to play / stop the melody. Here it is used to change the color (for 'play' or 'stop').
     * @param {Array} melody - the `melody` array from {@linkcode StaveRepresentation}
     */
    async playMelodyBtHandler(play_bt, melody) {
        // const play_bt = document.getElementById('play_melody');

        if (!this.#is_playing) {
            this.#is_playing = true;
            // play_bt.disabled = true;
            play_bt.innerText = 'Arrêter la mélodie';
            play_bt.style.backgroundColor = 'red';

            await this.playMelody(melody);

            this.#is_playing = false;
            // play_bt.disabled = false;
            play_bt.innerText = 'Jouer la mélodie';
            play_bt.style.backgroundColor = '#62aadd';
        }
        else
            this.#stop_melody = true;
    }
}

export default Player;