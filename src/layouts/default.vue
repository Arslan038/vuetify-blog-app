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
//
</script>
