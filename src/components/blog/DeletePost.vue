<template>
    <v-dialog v-if="showDialog" v-model="showDialog" max-width="550" persistent>
        <v-card v-if="post">
            <v-card-text>
                <div class="d-flex align-center justify-space-between">
                    <h5 class="text-h5">Delete Post</h5>
                    <v-icon @click="actions.close">mdi-close</v-icon>
                </div>
                <v-divider class="my-3"></v-divider>

                <div class="text-center">
                    <p class="mb-3">Are you sure you want to delete post "{{ post.title }}" ?</p>

                    <v-btn color="red" variant="flat" class="mr-2" :loading="isLoading" @click="actions.deletePost">Yes, Delete</v-btn>
                    <v-btn color="primary" variant="flat" :disabled="isLoading" @click="actions.close">No, Cancel</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { usePostStore } from '@/stores/post';

const props = defineProps({
    show: {
        type: Boolean,
        default: true
    },
    post: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['close', 'onDeleted']);

const store = usePostStore();

const showDialog = computed(() => props.show);
const isLoading = ref(false);

const actions = {
    close() {
        emit('close')
    },

    deletePost() {
        isLoading.value = true;
        store.deletePost(props.post.id).then(() => {
            emit('onDeleted')
        }).finally(() => {
            isLoading.value = false;
        });
    }
}
</script>