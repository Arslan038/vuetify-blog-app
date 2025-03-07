<template>
    <v-snackbar v-model="appStore.notification.show" location="top" :color="appStore.notification.type" timeout="3000">
      {{ appStore.notification.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="appStore.notification.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script setup>
  import { useAppStore } from '@/stores/app';
  
  const appStore = useAppStore();
  </script>
  