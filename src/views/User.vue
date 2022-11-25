<template>
  <div class="container mx-auto p-6">
    <div v-if="isLoading">Getting repo...</div>
    <div v-else-if="isError">Sorry, try later...</div>
    <div v-else-if="user">
      <h1 class="mb-4">{{ user.id }}</h1>
      <p>{{ user.login }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import { api } from "../helpers/api";

import { User } from "../types";

const route = useRoute();

const user = ref<User>();
const isLoading = ref(false);
const isError = ref(false);

function getRepo() {
  isLoading.value = true;
  api
    .get<User>(`/users/${route.params.user}`)
    .then(({ data }) => {
      user.value = data;
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
