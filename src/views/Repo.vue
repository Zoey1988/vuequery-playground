<template>
  <div class="container mx-auto p-6">
    <div v-if="isLoading">Getting repo...</div>
    <div v-else-if="isError">Sorry, try later...</div>
    <div v-else-if="repo">
      <h1 class="mb-4 text-xl font-bold">{{ repo.name }}</h1>
      <div class="mb-4">
        <input class="border rounded mr-2 p-2" v-model="newName" />
        <button
          class="border rounded bg-orange-500 text-white p-2"
          @click="changeName"
        >
          change name
        </button>
      </div>
      <hr class="my-2" />
      <h4 class="font-bold mb-2">Updated At:</h4>
      <p>{{ repo.updated_at || "---" }}</p>
      <hr class="my-2" />
      <h4 class="font-bold mb-2">Description:</h4>
      <p>{{ repo.description || "---" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO-4 Use useQuery for getting a single repo

// TODO-5 use useMutation for changing name of the repo
// https://tanstack.com/query/v4/docs/guides/mutations

// TODO-6 invalidate your query, as you updated your data.
// https://tanstack.com/query/v4/docs/guides/query-invalidation

import { ref } from "vue";
import { useRoute } from "vue-router";

import { api } from "../helpers/api";

import { Repo } from "../types";

const newName = ref();

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
      newName.value = data.name;
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

function changeName() {
  api({
    method: "patch",
    url: `/repos/${route.params.user}/${route.params.repo}`,
    data: {
      name: newName.value,
    },
  })
    .then(({ data }) => {
      repo.value = data;
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>
