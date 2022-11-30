<template>
  <div class="container mx-auto p-6">
    <h1 class="font-bold text-2xl mb-4">All Posts</h1>
    <div v-if="allPostsLoading">Getting posts...</div>
    <div v-else-if="allPostsError">Sorry, try later...</div>
    <div v-else class="flex flex-wrap">
      <div
        v-for="post in allPosts"
        class="border p-4 mr-2 mb-3 basis-1/4 grow rounded-lg bg-white"
      >
        <router-link
          :to="{ name: 'posts-id', params: { id: post.id } }"
          class="font-bold text-xl hover:underline"
        >
          {{ post.title }}
        </router-link>

        <div class="flex justify-between mt-4">
          <span>userId: {{ post.userId }}</span>
          <button class="text-orange-400" @click="() => showComments(post.id)">
            comments
          </button>
        </div>
      </div>
    </div>
    <base-modal v-model="modalIsOpen">
      <div v-if="postCommentsLoading">Getting comments...</div>
      <div v-else-if="postCommentsError">Sorry, try later...</div>
      <div v-else-if="!postComments?.length">There is no comments</div>
      <div v-for="comment in postComments" class="w-full pb-6">
        <div>
          {{ comment.body }}
        </div>
        <div>Author: {{ comment.name }}</div>
      </div>
    </base-modal>
  </div>
</template>

<script setup lang="ts">
// TODO-1 Use useQuery for getting all posts
// https://tanstack.com/query/v4/docs/guides/queries

// TODO-2 Use useQuery for getting all comments

import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

import BaseModal from "../components/BaseModal.vue";

import { api } from "../helpers/api";

import type { Post, Comment } from "../types/Post";

const allPosts = ref<Post[]>([]);
const allPostsLoading = ref(false);
const allPostsError = ref(false);

function getPosts() {
  api
    .get<Post[]>("/posts")
    .then(({ data }) => {
      allPosts.value = data;
      allPostsError.value = false;
    })
    .catch((err) => {
      console.error(err);
      allPostsError.value = true;
    })
    .finally(() => {
      allPostsLoading.value = false;
    });
}
getPosts();

const postComments = ref<Comment[]>();
const postCommentsLoading = ref(false);
const postCommentsError = ref(false);

const modalIsOpen = ref<boolean>(false);

function showComments(id: number) {
  modalIsOpen.value = true;
  postCommentsLoading.value = true;
  api
    .get<Comment[]>(`posts/${id}/comments`)
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

watch(modalIsOpen, (value) => {
  if (value === false) {
    postComments.value = [];
  }
});
</script>
