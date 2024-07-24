<template>
    <div class="p-4 bg-white shadow-md">
      <select v-model="selectedUser" class="px-4 py-2 border rounded-md" @change="changeUser">
        <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: ['用户1', '用户2', '用户3'],
        selectedUser: ''
      };
    },
    methods: {
      changeUser() {
        this.$emit('user-changed', this.selectedUser);
      }
    },
    mounted() {
      this.selectedUser = this.users[0]; // 默认选择第一个用户
      this.changeUser();
    }
  };
  </script>
  
  <style scoped>
  </style>
  