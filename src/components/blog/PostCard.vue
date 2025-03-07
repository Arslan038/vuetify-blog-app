<template>
    <v-card v-if="post" :to="`/post/${post.id}`" elevation="2" height="100%">
        <v-card-title class="text-truncate pb-1 mb-0 text-primary">{{ post.title }}</v-card-title>
        <v-card-subtitle class="py-0 my-0 font-weight-bold text-secondary">By {{ post.author }} - {{ formateDate(post.createdAt) }}</v-card-subtitle>
        <v-card-text>
            <div class="text-body-1">
                {{ post.text.length > textMaxLength ? `${post.text.substr(0, textMaxLength)}...` : post.text }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { formateDate } from '@/utils/utils';
const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});

const textMaxLength = 160;
</script>