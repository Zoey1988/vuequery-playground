<template>
  <div
    v-if="repo"
    class="border p-4 mr-2 mb-3 basis-1/4 grow rounded-lg bg-white"
  >
    <router-link
      :to="{
        name: 'users-user-repo',
        params: { user: repo.owner.login, repo: repo.name },
      }"
      class="font-bold hover:underline block mb-2"
    >
      {{ repo.name }}
    </router-link>

    <p class="mb-4">
      {{ repo.description }}
    </p>

    <router-link
      :to="{ name: 'users-user', params: { user: repo.owner.login } }"
      class="text-orange-400 hover:underline"
    >
      {{ repo.owner.login }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

import { Repo } from "../types";

defineProps<{ repo: Repo }>();
</script>
