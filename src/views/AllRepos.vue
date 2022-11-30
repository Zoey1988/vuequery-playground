<template>
  <div class="container mx-auto p-6">
    <label>
      Per page:
      <select
        name="perPage"
        class="p-2 border rounded mb-4"
        @change="changePerPage"
      >
        <option
          v-for="page in perPageOptions"
          :value="page"
          :selected="page === perPage"
        >
          {{ page }}
        </option>
      </select>
    </label>
    <h1 class="mb-4 text-2xl">All Repositories</h1>
    <div v-if="isLoading">Searching...</div>
    <div v-else-if="isError">Sorry, try later...</div>
    <div v-else-if="!allRepos.length">There is no repo for your search</div>
    <div v-else class="flex flex-wrap">
      <card v-for="repo in allRepos" :repo="repo" />
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO-2 Use useQuery for getting all repos
// https://tanstack.com/query/v4/docs/guides/queries

// TODO-3 in request params, use perPage.value for per_page
// now, you need to change your useQuery

import { ref, watch } from "vue";

import Card from "../components/Card.vue";

import { api } from "../helpers/api";

import { Repo } from "../types";

const perPageOptions = ["5", "10", "15", "20"];

const perPage = ref("10");

const allRepos = ref<Repo[]>([]);
const isLoading = ref(false);
const isError = ref(false);

function changePerPage(e: Event) {
  perPage.value = (e.target as HTMLSelectElement).value;
}

function searchRepos() {
  isLoading.value = true;
  // api guide: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
  api
    .get<Repo[]>("/user/repos", {
      params: {
        per_page: "10",
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
