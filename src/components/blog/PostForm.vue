<template>
    <v-dialog v-if="showDialog" v-model="showDialog" max-width="550" persistent>
        <v-card>
            <v-card-text>
                <div class="d-flex align-center justify-space-between">
                    <h5 class="text-h5">{{ formTitle }}</h5>
                    <v-icon @click="actions.close">mdi-close</v-icon>
                </div>
                <v-divider class="my-3"></v-divider>
                <v-form v-model="postForm" fast-fail @submit.prevent="actions.submit">
                    <v-row no-gutters>
                        <v-col cols="12">   
                            <v-text-field v-model="postData.title" label="Post Title" placeholder="Enter Post Title"
                                color="primary" variant="outlined" density="comfortable"
                                :rules="[rules.required]"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="postData.author" label="Author" placeholder="Enter Author Name"
                                color="primary" variant="outlined" density="comfortable"
                                :rules="[rules.required]"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="postData.text" label="Text" placeholder="Write your post..."
                                color="primary" variant="outlined" rows="5" density="comfortable"
                                :rules="[rules.required]"></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-btn type="submit" color="primary" variant="flat" :disabled="!isContentUpdated" :loading="isLoading" block>{{ formTitle }}</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
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

const emit = defineEmits(['close', 'onUpdated', 'onCreated']);

const store = usePostStore();

const showDialog = computed(() => props.show);
const formTitle = computed(() => props.post && props.post.id ? 'Edit Post' : 'Create Post');

const isContentUpdated = computed(() => {
    if (props.post && props.post.id) {
        const oldPost = { ...props.post };

        if (oldPost.title === postData.value.title.trim() && oldPost.text === postData.value.text && oldPost.author === postData.value.author.trim()) {
            return false;
        }
    }
    return true;
})

const postForm = ref(null);
const isLoading = ref(false);
const postData = ref({
    id: null,
    title: '',
    text: '',
    author: '',
    date: null
});

const rules = {
    required: value => !!value || 'Field is required',
}

const actions = {
    close() {
        emit('close')
    },
    async submit() {
        if (postForm.value) {
            const payload = { ...postData.value };

            payload.title = payload.title.trim();
            payload.author = payload.author.trim();

            isLoading.value = true;

            if (props.post && props.post.id) {
                store.updatePost(payload).then((data) => {
                    emit('onUpdated', data);
                }).finally(() => {
                    isLoading.value = false;
                });
            } else {
                delete payload.id;

                store.addPost(payload).then(() => {
                    actions.close();
                }).finally(() => {
                    isLoading.value = false;
                });
            }
        }
    }
}

watchEffect(() => {
    postData.value = { ...props.post };
})
</script>