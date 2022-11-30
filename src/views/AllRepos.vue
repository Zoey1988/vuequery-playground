<template>
  <div class="container mx-auto p-6">
    <select
      name="perPage"
      class="p-2 border rounded mb-4"
      @change="changePerPage"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
    <h1 class="mb-4">All repositories</h1>
    <div v-if="isLoading">Searching...</div>
    <div v-else-if="isError">Sorry, try later...</div>
    <div v-else-if="!allRepos.length">There is no repo for your search</div>
    <div v-else class="flex flex-wrap">
      <div
        v-for="repo in allRepos"
        class="border p-4 mr-2 mb-3 basis-1/3 grow rounded"
      >
        <router-link
          :to="{
            name: 'users-user-repo',
            params: { user: repo.owner.login, repo: repo.name },
          }"
          class="font-bold"
        >
          {{ repo.name }}
        </router-link>

        <p class="mb-4">
          {{ repo.description }}
        </p>

        <router-link
          :to="{ name: 'users-user', params: { user: repo.owner.login } }"
          class="text-orange-400"
        >
          {{ repo.owner.login }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

import { api } from "../helpers/api";

import { Repo } from "../types";

const perPage = ref("10");

const allRepos = ref<Repo[]>([]);
const isLoading = ref(false);
const isError = ref(false);

function changePerPage(e: Event) {
  perPage.value = (e.target as HTMLSelectElement).value;
}
function searchRepos() {
  isLoading.value = true;
  api
    .get<Repo[]>("/user/repos", {
      params: {
        per_page: perPage.value,
        visiblility: "private",
        type: "owner",
      },
    })
    .then(({ data }) => {
      allRepos.value = data;
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
watch(
  perPage,
  () => {
    searchRepos();
  },
  { immediate: true }
);
</script>
