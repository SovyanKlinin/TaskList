import { defineStore } from 'pinia'

export const useNewTask = defineStore('modal', {
    state: () => ({
        cardActive: false,
        cardEditor: false,
    }),
    actions: {

        open(cardState: string) {
            switch (cardState) {
                case 'cardActive':
                    this.cardActive = true;
                    break;

                case 'cardEditor':
                    this.cardEditor = true;
                    break;


                default:
                    break;
            }
        },

        close(cardState: string) {
            switch (cardState) {
                case 'cardActive':
                    this.cardActive = false;
                    break;

                case 'cardEditor':
                    this.cardEditor = false;
                    break;

                default:
                    break;
            }
        },
    }
})