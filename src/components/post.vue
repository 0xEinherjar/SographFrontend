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
  authorHasSubscription,
  date,
  like,
  shared,
  hasLiked,
  hasShared,
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
  "authorHasSubscription",
  "date",
  "like",
  "shared",
  "hasLiked",
  "hasShared",
  "isConnected",
  "isMyProfile",
]);
const post = ref({
  hasLiked: null,
  totalLiked: 0,
  hasShared: null,
  totalShared: 0,
});
const textPost = computed(() => {
  return String(text).split("\n");
});
async function redeemPost(_id) {
  const blockchain = new Blockchain();
  const result = await blockchain.redeemPost(_id);
}
async function handleShare(_id) {
  const blockchain = new Blockchain();
  if (post.value.hasShared == false) {
    const result = await blockchain.share(_id);
    if (result.success) {
      post.value.totalShared += 1;
      post.value.hasShared = true;
    }
  } else {
    const result = await blockchain.unshare(_id);
    if (result.success) {
      post.value.totalShared -= 1;
      post.value.hasShared = false;
    }
  }
}
// async function handleShare(_id) {
//   const blockchain = new Blockchain();
//   const result = await blockchain.share(_id);
//   if (result.success) {
//     if (post.value.hasShared == false) {
//       post.value.totalShared += 1;
//       post.value.hasShared = true;
//     } else {
//       post.value.totalShared -= 1;
//       post.value.hasShared = false;
//     }
//   }
// }
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
  post.value.hasShared = hasShared;
  post.value.totalShared = Number(shared);
});
</script>
<!-- prettier-ignore -->
<template>
  <article class="c-post">
    <div v-if="hasShared" class="c-post__reposted u-flex-line">
      <svg  class="c-post__icon" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.83337 11C1.83337 5.93998 5.90337 1.83331 11 1.83331C17.1142 1.83331 20.1667 6.92998 20.1667 6.92998M20.1667 6.92998V2.34665M20.1667 6.92998H16.0967" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path opacity="0.4" d="M20.0658 11C20.0658 16.06 15.9592 20.1667 10.8992 20.1667C5.83917 20.1667 2.75 15.07 2.75 15.07M2.75 15.07H6.89333M2.75 15.07V19.6533" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>{{ "Rodrigo" }} reposted</span>
    </div>
    <div class="u-flex-line-between">
      <div class="c-post__info u-flex-line">
        <div class="c-post__author">
          <Avatar :avatar="avatar" length="28px"/>
          <h3 class="c-post__author-name">{{ name }}</h3>
        </div>
        <span class="c-post__dot"></span>
        <time class="c-post__time" :datetime="date">{{ dateFormat(date) }}</time>
      </div>
      <button v-if="isMyProfile" class="post__dropdown">
        <svg  class="c-post__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z" stroke-width="1.5"/>
          <path d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z" stroke-width="1.5"/>
          <path opacity="0.4" d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" stroke-width="1.5"/>
        </svg>
        <!-- <svg class="c-post__icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 6.5H16" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <g opacity="0.4">
          <path d="M6 6.5H2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <path d="M8 17.5H2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <g opacity="0.4">
          <path d="M22 17.5H18" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </svg> -->
        <ul class="post__dropdown-menu">
          <li><button @click="redeemPost(id)">Redeem</button></li>
        </ul>
      </button>
    </div>
    <div v-if="attachment" class="c-post__attachment">
      <img class="c-post__image" :src="attachment" alt="" />
    </div>
    <p v-if="text.length" class="c-post__paragraph">
      <template v-for="item in textPost">
        <template v-if="item.length > 0">{{ item }}</template>
        <template v-else><br /></template>
      </template>
    </p>
    <div class="u-flex-line-between">
      <div class="c-post__actions">
        <button v-if="isConnected" class="c-post__action" @click="">
          <svg class="c-post__icon"  width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5833 8.24998C15.5833 11.7975 12.5033 14.6666 8.70825 14.6666L7.85576 15.6933L7.35159 16.2983C6.92076 16.8117 6.09575 16.7016 5.81158 16.0875L4.58325 13.3833C2.91492 12.21 1.83325 10.3491 1.83325 8.24998C1.83325 4.70248 4.91325 1.83331 8.70825 1.83331C11.4766 1.83331 13.8691 3.36415 14.9416 5.56415C15.3541 6.37999 15.5833 7.28748 15.5833 8.24998Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.4" d="M20.1668 11.7883C20.1668 13.8875 19.0851 15.7483 17.4168 16.9217L16.1885 19.6258C15.9043 20.24 15.0793 20.3592 14.6484 19.8367L13.2918 18.205C11.0734 18.205 9.09346 17.2241 7.85596 15.6933L8.70845 14.6666C12.5034 14.6666 15.5834 11.7975 15.5834 8.24997C15.5834 7.28747 15.3543 6.37998 14.9418 5.56415C17.9393 6.25165 20.1668 8.78163 20.1668 11.7883Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.4" d="M6.41675 8.25H11.0001" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="c-post__action-count">{{ "0" }}</span>
        </button>
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
        <button v-if="isConnected" class="c-post__action" @click="handleShare(id)">
          <svg class="c-post__icon" :class="{ 'c-post__icon--shared': post.hasShared && isMyProfile }" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.83337 11C1.83337 5.93998 5.90337 1.83331 11 1.83331C17.1142 1.83331 20.1667 6.92998 20.1667 6.92998M20.1667 6.92998V2.34665M20.1667 6.92998H16.0967" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.4" d="M20.0658 11C20.0658 16.06 15.9592 20.1667 10.8992 20.1667C5.83917 20.1667 2.75 15.07 2.75 15.07M2.75 15.07H6.89333M2.75 15.07V19.6533" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="c-post__action-count">{{ post.totalShared }}</span>
        </button>
        <button v-else class="c-post__action">
          <svg  class="c-post__icon" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.83337 11C1.83337 5.93998 5.90337 1.83331 11 1.83331C17.1142 1.83331 20.1667 6.92998 20.1667 6.92998M20.1667 6.92998V2.34665M20.1667 6.92998H16.0967" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.4" d="M20.0658 11C20.0658 16.06 15.9592 20.1667 10.8992 20.1667C5.83917 20.1667 2.75 15.07 2.75 15.07M2.75 15.07H6.89333M2.75 15.07V19.6533" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="c-post__action-count">{{ post.totalShared }}</span>
        </button>
      </div>
      <span class="c-post__id">#{{ id }}</span>
    </div>
  </article>
</template>

<style>
.c-post {
  width: min(456px, 100%);
  margin-inline: auto;
  display: grid;
  gap: 18px;
}
.c-post__id {
  font-weight: 500;
  font-size: 1.5rem;
}
.c-post__reposted {
  gap: 12px;
  font-size: 1.4rem;
  font-weight: 500;
  color: rgba(244, 244, 244, 0.4);
}
.c-post__reposted .c-post__icon {
  height: 1.6rem !important;
  width: 1.6rem !important;
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
  z-index: 2;
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
  gap: 48px;
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
  height: 2rem;
  width: 2rem;
}
.c-post__icon--liked {
  fill: #ff6370 !important;
  stroke: #ff6370 !important;
}
.c-post__icon--shared {
  stroke: #2fc687 !important;
}
</style>
<!-- <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-1ly5nwx"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 6C9.10457 6 10 5.10457 10 4C10 2.89543 9.10457 2 8 2C6.89543 2 6 2.89543 6 4C6 5.10457 6.89543 6 8 6ZM13 4.00001C13 4.02066 12.9999 4.04128 12.9996 4.06186C16.9461 4.55379 20 7.92026 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 10.558 4.38151 9.20514 5.04911 8.0368C4.4838 7.62286 4.00868 7.09304 3.65872 6.48232C2.6105 8.06377 2 9.9606 2 12C2 17.5229 6.47715 22 12 22C17.5228 22 22 17.5229 22 12C22 6.67571 17.839 2.32327 12.5914 2.01721C12.8543 2.62513 13 3.29556 13 4.00001Z" fill="currentColor"></path></svg> -->
