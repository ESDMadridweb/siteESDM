// store.js
import { defineStore } from 'pinia'

export const usePosterStore = defineStore('poster', {
    state: () => ({ 
        temas: [], 
        fechas: [], 
        tipos: [],
        pause: false,
        cursor: { 
            active: false, 
            title: '', 
            subtitle: '' 
        } 
    }),
    actions: {
        setPauseTrue() {
            this.pause = true
        },
        setPauseFalse() {
            this.pause = false
        },
    }
})
