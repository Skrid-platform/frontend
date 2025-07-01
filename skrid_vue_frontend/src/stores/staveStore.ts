// src/stores/authorsStore.ts
import { defineStore } from 'pinia';
import { Renderer, Stave, Formatter, StaveNote, Accidental, Dot } from 'vexflow';


export const useStaveStore = defineStore('stave', {
    state: () => {
        return {
            melody: <any[]>[],

            width: <number>450,
            height: <number>200,
            init_pentagram_width: <number>450,

            html_element: <HTMLDivElement | null>null, // HTML element where the stave will be rendered
            stave: <Stave | null>null, // VexFlow Stave object
            renderer: <Renderer | null>null, // VexFlow Renderer object
            context: <any>null, // VexFlow rendering context
        }
    },
    getters: {

    },
    actions: {
        setSize(width: number, height: number): void {
            this.width = width;
            this.height = height;
        },

        init(html_element: HTMLDivElement): void {
            this.html_element = html_element;

            // Initialize the renderer
            this.renderer = new Renderer(this.html_element, Renderer.Backends.SVG);
            this.renderer.resize(this.width, this.height);
            this.context = this.renderer.getContext();
            this.context.setFont('Arial', 10);

            // Create the stave
            this.stave = new Stave(10, 40, this.init_pentagram_width);
            this.stave.addClef('treble').addTimeSignature('4/4');
            this.stave = new Stave(10, 40, this.width);
            this.stave.addClef("treble");
            this.stave.setContext(this.context).draw();
        },

        resizeStave(): void {
            if (this.stave === null || this.renderer === null) return;
            let totalWidth = 0;
            this.melody.forEach((note) => {
                totalWidth += note.getWidth() + 5;
            });

            totalWidth = Math.max(totalWidth, this.init_pentagram_width);

            // If the new width is greater or smaller than the initial width, update stave width and pentagran_width variable
            if (totalWidth > this.width || totalWidth < this.width) {
                this.stave.setWidth(totalWidth + 100);
                this.renderer.resize(totalWidth + 100, this.height)
                this.width = totalWidth;
            }

            // Cancel the previous pentagram
            const svg = document.querySelector("#music-score svg");
            if(svg === null) return; 
            while (svg.firstChild) {
                svg.removeChild(svg.firstChild);
            }
            this.stave.setContext(this.context).draw();

            // Re-draw it
            this.melody.forEach((note) => {
                note.setContext(this.context).draw();
            });
        }

    },
})
