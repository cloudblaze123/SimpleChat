import { useAuthStore } from '@/stores/auth';




function switchUser(userId: string){
    const authStore = useAuthStore();
    authStore.switchUser(userId);
};




export { switchUser };