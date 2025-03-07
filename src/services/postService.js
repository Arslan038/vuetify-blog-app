import BaseApi from "./BaseApi";
const api = new BaseApi();

const PATH = 'posts';

const PostService = {
  async getPosts() {
    return await api.get(PATH);
  },
  async getPost(id) {
    return await api.get(`${PATH}/${id}`);
  },
  async createPost(post) {
    return await api.post(PATH, post);
  },
  async updatePost(id, post) {
    return await api.put(`${PATH}/${id}`, post);
  },
  async deletePost(id) {
    return await api.delete(`${PATH}/${id}`);
  },
};

export default PostService;