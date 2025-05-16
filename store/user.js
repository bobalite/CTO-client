import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    persist: true,
    state: () => ({
        user: null,
        currentUsersPage: 1,
        selectedUser: null,
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        setSelectedUser(data) {
            this.selectedUser = data;
        },
        resetUser() {
            this.user = null;
        },
        resetSelectedUser() {
            this.selectedUser = null;
        },
    },
    getters: {
        getUser: (state) => state.user,
        getSelectedUser: (state) => state.selectedUser,
    },
});