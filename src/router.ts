import { createRouter, createWebHistory } from "vue-router";
import AllRepos from "./views/AllRepos.vue";
import User from "./views/User.vue";
import Repo from "./views/Repo.vue";

const routes = [
  { path: "/", component: AllRepos },
  { path: "/users/:user/", name: "users-user", component: User },
  { path: "/users/:user/:repo", name: "users-user-repo", component: Repo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
