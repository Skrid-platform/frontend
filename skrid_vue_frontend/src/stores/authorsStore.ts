// src/stores/authorsStore.ts
import { defineStore } from 'pinia'
import { fetchAuthors } from '@/services/dataBaseQueryServices.ts';

export const useAuthorsStore = defineStore('authors', {
    state: () => {
        return { listeAuthors: <string[]>['chargement'] } // Initialize with a default value (print "chargement" while fetching data)
    },

    actions: {
        /**
        * Set the authors list
        * @param newAuthors - The new list of authors
        */
        setAuthors(newAuthors: string[]) {
            this.listeAuthors = newAuthors;
        },
        /**
        * Load authors from the server and update the store
        */
        async loadAuthors() {
            try {
                const data = await fetchAuthors();
                this.setAuthors(data);
            } catch (error) {
                console.error("Failed to load authors:", error);
            }
        }
    },
})
