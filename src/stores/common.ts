import { defineStore } from 'pinia';


export const useCommonStore = defineStore('common', {
    state: () => ({
        darkMode: false as boolean,
        darkModeFollowSystem: true as boolean
    }),
    actions: {
        initialize(){
            this.restoreDarkMode();
            this.restoreDarkModeFollowSystem();
        },
        toggleDarkMode(){
            this.darkMode = !this.darkMode;
            localStorage.darkMode = this.darkMode.toString();
        },
        restoreDarkMode(){
            if(localStorage.darkMode){
                this.darkMode = localStorage.darkMode === 'true';
            }else{
                this.darkMode = false;
            }
        },
        toggleDarkModeFollowSystem(){
            this.darkModeFollowSystem = !this.darkModeFollowSystem;
            localStorage.darkModeFollowSystem = this.darkModeFollowSystem.toString();
        },
        restoreDarkModeFollowSystem(){
            if(localStorage.darkModeFollowSystem){
                this.darkModeFollowSystem = localStorage.darkModeFollowSystem === 'true';
            }else{
                this.darkModeFollowSystem = true;
            }
        }
    }
});
