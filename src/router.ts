import { createRouter, createWebHistory } from "vue-router";
import AllPosts from "./views/AllPosts.vue";
import Post from "./views/Post.vue";

const routes = [
  { path: "/", component: AllPosts },
  { path: "/posts/:id/", name: "posts-id", component: Post },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
