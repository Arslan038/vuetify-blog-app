<template>
  <v-main>
    <Appbar />

    <v-container fluid>
      <router-view />
    </v-container>

    <Notification />
  </v-main>

</template>

<script setup>
import Appbar from '@/components/app/AppBar.vue';
import Notification from '@/components/app/Notification.vue';
import { onMounted } from 'vue';
import { usePostStore } from '@/stores/post';

const store = usePostStore();

onMounted(() => {
  store.fetchPosts();
});

</script>
