<template>
  <div class="container mx-auto p-6 bg-white">
    <div v-if="isLoading">Getting post...</div>
    <div v-else-if="isError">Sorry, try later...</div>
    <div v-else-if="post">
      <div class="font-bold text-xl">{{ post.title }}</div>
      <div class="my-2">{{ post.body }}</div>
    </div>
    <hr class="my-4" />
    <h2 class="font-bold tex-xl">Comments:</h2>
    <div v-for="comment in postComments" class="w-full pb-6">
      <div>
        {{ comment.body }}
      </div>
      <div>Author: {{ comment.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO-3 Use the same useQuery for getting comments

import { ref } from "vue";
import { useRoute } from "vue-router";

import { api } from "../helpers/api";

import { Comment, Post } from "../types/Post";

const route = useRoute();
const postId = route.params.id;

const post = ref<Post>();
const isLoading = ref(false);
const isError = ref(false);

function getPost() {
  isLoading.value = true;
  api
    .get<Post>(`/posts/${postId}`)
    .then(({ data }) => {
      post.value = data;
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

const postComments = ref<Comment[]>();
const postCommentsLoading = ref(false);
const postCommentsError = ref(false);

function getComments() {
  postCommentsLoading.value = true;
  api
    .get<Comment[]>(`/posts/${postId}/comments`)
    .then(({ data }) => {
      postComments.value = data.slice(0, 5);
      postCommentsError.value = false;
    })
    .catch((err) => {
      console.error(err);
      postCommentsError.value = true;
    })
    .finally(() => {
      postCommentsLoading.value = false;
    });
}

getPost();
getComments();
</script>
