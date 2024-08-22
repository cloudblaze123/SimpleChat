import { defineStore } from 'pinia';


export const useCommonStore = defineStore('common', {
    state: () => ({
        darkMode: false as boolean,
    }),
    actions: {
        toggleDarkMode(){
            this.darkMode = !this.darkMode;
        }
    }
});
