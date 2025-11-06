// store.js
import { defineStore } from 'pinia'

export const useCursorStore = defineStore('cursor', {
    state: () => ({ 
        active: false,
        title: '',
        subtitle: '',
        text: ''
    }),
})
