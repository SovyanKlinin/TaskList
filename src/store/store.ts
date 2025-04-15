import { defineStore } from 'pinia'

export const useNewTask = defineStore('modal', {
    state: () => ({
        cardActive: true
    }),
    actions: {
        console() {
            console.log(this.cardActive);
        },

        open() {
            this.cardActive = true;
        },

        close() {
            this.cardActive = false;
        }
    }
})