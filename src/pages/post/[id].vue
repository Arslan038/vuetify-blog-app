<template>
    <div class="post">
        <template v-if="isLoading">
            <SkeletonCard />
        </template>
        <template v-if="post">


            <v-card elevation="2">
                <v-card-text>
                    <div class="d-flex align-center justify-space-between mb-5">
                        <div class="d-flex">
                            <v-icon color="primary" size="40" @click="actions.navigateHome">mdi-chevron-left</v-icon>
                            <div class="d-flex flex-column">
                                <h4 class="text-capitalize text-primary text-h4">{{ post.title }}</h4>
                                <strong class="text-secondary">By {{ post.author }} - {{ formateDate(post.createdAt) }}</strong>
                            </div>
                        </div>

                        <div class="d-flex">
                            <v-btn color="primary" variant="flat" size="small" class="mr-2 text-capitalize"
                                @click="actions.toggleEditDialog"><v-icon>mdi-pencil</v-icon> Edit</v-btn>
                            <v-btn color="error" variant="flat" size="small" class="text-capitalize"
                                @click="actions.toggleDeleteDialog"><v-icon>mdi-delete</v-icon> Delete</v-btn>
                        </div>
                    </div>

                    <v-row>
                        <v-col cols="12" sm="10" lg="8" xl="9">
                            <p>
                                {{ post.text }}
                            </p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <PostForm :show="editDialog" :post="post" @onUpdated="actions.onPostUpdated"
                @close="actions.toggleEditDialog" />
            <DeletePost :show="deleteDialog" :post="post" @onDeleted="actions.onPostDeleted"
                @close="actions.toggleDeleteDialog" />
        </template>

        <template v-if="!isLoading && !post">
            <h5 class="text-h5 text-center">Post not found.</h5>
        </template>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '@/stores/post';
import { storeToRefs } from 'pinia';
import PostForm from '@/components/blog/PostForm.vue';
import DeletePost from '@/components/blog/DeletePost.vue';
import { formateDate } from '@/utils/utils';
import SkeletonCard from '@/components/blog/SkeletonCard.vue';

const route = useRoute();
const router = useRouter();

const postStore = usePostStore();
const { posts } = storeToRefs(postStore);

const isLoading = ref(false);

const post = ref(null);
const editDialog = ref(false);
const deleteDialog = ref(false);

onMounted(() => {
    actions.fetchPost();
})

const actions = {
    fetchPost() {
        post.value = posts.value.find(p => p.id == route.params.id);
        if (!post.value) {
            isLoading.value = true;
            postStore.fetchPost(route.params.id).then((data) => {
                post.value = { ...data };
            }).finally(() => {
                isLoading.value = false;
            });
        }
    },

    navigateHome() {
        router.push('/')
    },

    toggleEditDialog() {
        editDialog.value = !editDialog.value;
    },

    toggleDeleteDialog() {
        deleteDialog.value = !deleteDialog.value;
    },

    onPostUpdated(data) {
        actions.toggleEditDialog();
        post.value = { ...data };
    },

    onPostDeleted() {
        actions.toggleDeleteDialog();
        router.push('/');
    }
}
</script>