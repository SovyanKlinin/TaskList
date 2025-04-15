import { defineStore } from 'pinia'

export const useNewTask = defineStore('modal', {
    state: () => ({
        cardActive: true,
    }),
    actions: {
        console() {
            console.log(this.cardActive);
        },

        open() {
            this.cardActive = true;
            console.log(this.cardActive);
        },

        close() {
            this.cardActive = false;
            console.log(this.cardActive);
        }
    }
})