<template>
    <section role="posts">
        <h4 class="text-h4 my-5 text-center">Blog Posts</h4>
        <v-row class="mb-7">
            <v-col v-for="post in posts" :key="post.id" cols="12" sm="6" lg="4" xl="3">
                <PostCard v-if="post.id" :post="post" />
            </v-col>
            <template v-if="isLoading">
                <v-col v-for="post in 12" :key="post + '-loading'" cols="12" sm="6" lg="4" xl="3">
                    <SkeletonCard />
                </v-col>
            </template>
        </v-row>

        <div v-if="!posts.length" class="text-center">
            <h4 class="text-h4">No Post Found.</h4>
        </div>

        <v-btn rounded="xl" position="fixed" location="right bottom" color="primary" class="mb-5 mr-2 text-capitalize"
            @click="actions.toggleDialog">
            <v-icon class="mr-1">mdi-pencil</v-icon>
            Create Post</v-btn>

        <PostForm :show="postDialog" @close="actions.toggleDialog" />
    </section>
</template>

<script setup>
import { ref } from 'vue';
import PostCard from './PostCard.vue';
import PostForm from './PostForm.vue';
import { usePostStore } from '@/stores/post';
import { storeToRefs } from 'pinia';
import SkeletonCard from './SkeletonCard.vue';

const store = usePostStore();

const { isLoading, posts } = storeToRefs(store);

const postDialog = ref(false);

const actions = {
    toggleDialog() {
        postDialog.value = !postDialog.value;
    }
}

</script>