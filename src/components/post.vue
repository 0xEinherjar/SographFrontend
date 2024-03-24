<script setup>
import { computed, onMounted, ref } from "vue";
import Blockchain from "../infra/blockchain.js";
import { useUtils } from "../composables/utils.js";
import Avatar from "./avatar.vue";
const { dateFormat } = useUtils();
const {
  id,
  name,
  avatar,
  handle,
  attachment,
  text,
  owner,
  date,
  like,
  hasLiked,
  isConnected,
  isMyProfile,
} = defineProps([
  "id",
  "name",
  "avatar",
  "attachment",
  "handle",
  "text",
  "owner",
  "date",
  "like",
  "hasLiked",
  "isConnected",
  "isMyProfile",
]);
const post = ref({
  hasLiked: null,
  totalLiked: 0,
});
const textPost = computed(() => {
  return String(text).split("\n");
});
async function redeemPost(_id) {
  const blockchain = new Blockchain();
  const result = await blockchain.redeemPost(_id);
}
async function handleLike(_id) {
  const blockchain = new Blockchain();
  const result = await blockchain.like(_id);
  if (result.success) {
    if (post.value.hasLiked == false) {
      post.value.totalLiked += 1;
      post.value.hasLiked = true;
    } else {
      post.value.totalLiked -= 1;
      post.value.hasLiked = false;
    }
  }
}
onMounted(() => {
  post.value.hasLiked = hasLiked;
  post.value.totalLiked = Number(like);
});
</script>
<!-- prettier-ignore -->
<template>
  <article class="c-post">
    <div v-if="attachment" class="c-post__attachment">
      <img class="c-post__image" :src="attachment" alt="" />
    </div>
    <p v-if="text.length" class="c-post__paragraph">
      <template v-for="item in textPost">
        <template v-if="item.length > 0">{{ item }}</template>
        <template v-else><br /></template>
      </template>
    </p>
    <div class="c-post__details u-flex-line-between">
      <div class="c-post__info u-flex-line">
        <div class="c-post__author">
          <Avatar :avatar="avatar" length="28px"/>
          <h3 class="c-post__author-name">{{ name }}</h3>
        </div>
        <span class="c-post__dot"></span>
        <time class="c-post__time" :datetime="date">{{ dateFormat(date) }}</time>
      </div>
      <div class="c-post__actions">
        <button v-if="isConnected" class="c-post__action" @click="handleLike(id)">
          <svg class="c-post__icon" :class="{ 'c-post__icon--liked': post.hasLiked }" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M19.86 8.09009C19.86 8.51009 19.83 8.92009 19.78 9.31009C19.32 9.11009 18.82 9.00009 18.29 9.00009C17.07 9.00009 15.99 9.59008 15.32 10.4901C14.64 9.59008 13.56 9.00009 12.34 9.00009C10.29 9.00009 8.63 10.6701 8.63 12.7401C8.63 15.4201 10.05 17.4701 11.63 18.8601C11.58 18.8901 11.53 18.9001 11.48 18.9201C11.18 19.0301 10.68 19.0301 10.38 18.9201C7.79 18.0301 2 14.3501 2 8.09009C2 5.33009 4.21999 3.1001 6.95999 3.1001C8.58999 3.1001 10.03 3.88009 10.93 5.09009C11.84 3.88009 13.28 3.1001 14.9 3.1001C17.64 3.1001 19.86 5.33009 19.86 8.09009Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22 12.74C22 17.42 17.67 20.18 15.73 20.84C15.5 20.92 15.13 20.92 14.9 20.84C14.07 20.56 12.8 19.89 11.63 18.86C10.05 17.47 8.63 15.42 8.63 12.74C8.63 10.67 10.29 9 12.34 9C13.56 9 14.64 9.58999 15.32 10.49C15.99 9.58999 17.07 9 18.29 9C18.82 9 19.32 9.11 19.78 9.31C21.09 9.89 22 11.2 22 12.74Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="c-post__action-count">{{ post.totalLiked }}</span>
        </button>
        <button v-else class="c-post__action">
          <svg class="c-post__icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M19.86 8.09009C19.86 8.51009 19.83 8.92009 19.78 9.31009C19.32 9.11009 18.82 9.00009 18.29 9.00009C17.07 9.00009 15.99 9.59008 15.32 10.4901C14.64 9.59008 13.56 9.00009 12.34 9.00009C10.29 9.00009 8.63 10.6701 8.63 12.7401C8.63 15.4201 10.05 17.4701 11.63 18.8601C11.58 18.8901 11.53 18.9001 11.48 18.9201C11.18 19.0301 10.68 19.0301 10.38 18.9201C7.79 18.0301 2 14.3501 2 8.09009C2 5.33009 4.21999 3.1001 6.95999 3.1001C8.58999 3.1001 10.03 3.88009 10.93 5.09009C11.84 3.88009 13.28 3.1001 14.9 3.1001C17.64 3.1001 19.86 5.33009 19.86 8.09009Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22 12.74C22 17.42 17.67 20.18 15.73 20.84C15.5 20.92 15.13 20.92 14.9 20.84C14.07 20.56 12.8 19.89 11.63 18.86C10.05 17.47 8.63 15.42 8.63 12.74C8.63 10.67 10.29 9 12.34 9C13.56 9 14.64 9.58999 15.32 10.49C15.99 9.58999 17.07 9 18.29 9C18.82 9 19.32 9.11 19.78 9.31C21.09 9.89 22 11.2 22 12.74Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="c-post__action-count">{{ post.totalLiked }}</span>
        </button>
        <button v-if="isMyProfile" class="post__dropdown">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z" stroke="#F4F4F4" stroke-width="1.5"/>
            <path d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z" stroke="#F4F4F4" stroke-width="1.5"/>
            <path opacity="0.4" d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" stroke="#F4F4F4" stroke-width="1.5"/>
          </svg>
          <ul class="post__dropdown-menu">
            <li><button @click="redeemPost(id)">Redeem</button></li>
          </ul>
        </button>
      </div>
    </div>
  </article>
</template>

<style>
.c-post {
  width: min(456px, 100%);
  margin-inline: auto;
  display: grid;
  gap: 16px;
}
.post__dropdown {
  position: relative;
}
.post__dropdown-menu {
  display: none;
  position: absolute;
  top: 98%;
  right: 0;
  background-color: var(--bg-color-secondary);
  padding: 10px 20px;
  border-radius: 8px;
  width: 180px;
  color: #bdc1c6;
  font-size: 1.4rem;
  text-align: left;
}
.post__dropdown:hover .post__dropdown-menu {
  display: block;
}
.c-post__attachment {
  width: 100%;
  aspect-ratio: 456/400;
  overflow: hidden;
  border-radius: 20px;
}
.c-post__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.c-post__title {
  font-size: 2.8rem;
  font-weight: 500;
  line-height: 135%;
}
.c-post__paragraph {
  opacity: 0.8;
}
.c-post__details {
  margin-top: 8px;
}
.c-post__author-name {
  font-size: 1.5rem;
  font-weight: 500;
  margin-left: 16px;
}
.c-post__dot {
  height: 2px;
  width: 2px;
  border-radius: 50%;
  background-color: #f4f4f4;
  opacity: 0.7;
}
.c-post__info {
  gap: 8px;
}
.c-post__time {
  font-size: 1.5rem;
  opacity: 0.4;
}
.c-post__actions {
  gap: 32px;
}
.c-post__action {
  gap: 8px;
}
.c-post__author,
.c-post__actions,
.c-post__action {
  display: flex;
  align-items: center;
}
.c-post__action-count {
  opacity: 0.4;
  font-size: 1.5rem;
}
.c-post__icon {
  fill: none;
  stroke: #f4f4f4;
}
.c-post__icon--liked {
  fill: #ff6370 !important;
  stroke: #ff6370 !important;
}
</style>
./avatar.vue/index.js
