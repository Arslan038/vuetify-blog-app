import { defineStore } from 'pinia';
import PostService from '@/services/postService';
import { useAppStore } from '@/stores/app';

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [],
    post: null,
    isLoading: false,
  }),

  actions: {
    async fetchPosts() {
      const appStore = useAppStore();
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        PostService.getPosts().then((response) => {
          if (response.status === 200) {
            this.posts = [...response.data];
            resolve(this.posts);
          }
          reject(response)
        }).catch(err => {
          appStore.showNotification(err.response.data || 'Failed to load posts', 'error');
          reject(err);
        }).finally(() => {
          this.isLoading = false;
        });
      })
    },

    async fetchPost(id) {
      const appStore = useAppStore();
      return new Promise((resolve, reject) => {
        this.post = null;
        PostService.getPost(id).then((response) => {
          this.post = { ...response.data };
          resolve(this.post);
        }).catch(err => {
          appStore.showNotification(err.response.data || 'Failed to load posts', 'error');
          reject(err);
        });
      })
    },

    async addPost(post) {
      const appStore = useAppStore();
      return new Promise((resolve, reject) => {
        PostService.createPost(post).then((response) => {
          this.posts.push(response.data);
          appStore.showNotification('Post added successfully', 'success');
          resolve(response.data);
        }).catch(err => {
          appStore.showNotification(err.response.data || 'Failed to add posts', 'error');
          reject(err);
        })
      })
    },

    updatePost(updatedPost) {
      const appStore = useAppStore();
      return new Promise((resolve, reject) => {
        PostService.updatePost(updatedPost.id, updatedPost).then((response) => {
          if (response.status === 200) {
            const post = { ...response.data };

            this.posts = this.posts.map((item) =>
              item.id === updatedPost.id ? { ...post } : item
            );

            appStore.showNotification('Post updated successfully', 'success');

            resolve(post);
          }
        }).catch(err => {
          appStore.showNotification(err.response.data || 'Failed to load posts', 'error');
          reject(err);
        });
      })
    },

    async deletePost(id) {
      const appStore = useAppStore();
      return new Promise((resolve, reject) => {
        PostService.deletePost(id).then((response) => {
          if (response.status === 200) {
            this.posts = this.posts.filter(post => post.id !== id);
            appStore.showNotification('Post deleted successfully', 'success');
            resolve(response.data);
          }
        }).catch(err => {
          appStore.showNotification(err.response.data || 'Failed to delete post', 'error');
          reject(err);
        });
      })
    }
  },
  persist: {
    enabled: true, // Enable persistence
    strategies: [
      {
        key: 'posts', // Key to use in localStorage
        storage: localStorage, // Use localStorage for persistence
        paths: ['posts'],
      },
    ],
  },
});
