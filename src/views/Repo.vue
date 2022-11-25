<template>
  <div class="container mx-auto p-6">
    <div v-if="isLoading">Getting repo...</div>
    <div v-else-if="isError">Sorry, try later...</div>
    <div v-else-if="repo">
      <h1 class="mb-4">{{ repo.name }}</h1>
      <p>{{ repo.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import { api } from "../helpers/api";

import { Repo } from "../types";

const route = useRoute();

const repo = ref<Repo>();
const isLoading = ref(false);
const isError = ref(false);

function getRepo() {
  isLoading.value = true;
  api
    .get<Repo>(`/repos/${route.params.user}/${route.params.repo}`)
    .then(({ data }) => {
      repo.value = data;
      isError.value = false;
    })
    .catch((err) => {
      console.error(err);
      isError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}
getRepo();
</script>
