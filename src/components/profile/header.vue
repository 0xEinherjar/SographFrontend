<script setup>
import { useUtils } from "../../composables/utils.js";
import Blockchain from "../../infra/blockchain.js";
import { useAccountStore } from "../../store/account.js";
import { storeToRefs } from "pinia";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);
const { isAddress, truncateAddress } = useUtils();
const {
  owner,
  name,
  username,
  description,
  avatar,
  role,
  isMyProfile,
  isFollowing,
} = defineProps([
  "owner",
  "name",
  "username",
  "description",
  "avatar",
  "role",
  "isMyProfile",
  "isFollowing",
]);

async function handleFollow(address) {
  const blockchain = new Blockchain();
  const result = await blockchain.follow(address);
  if (result.success) {
  }
}

async function handleUnfollow(address) {
  const blockchain = new Blockchain();
  const result = await blockchain.unfollow(address);
  if (result.success) {
  }
}
</script>
<!-- prettier-ignore -->
<template>
  <section class="profile__header u-flex-line-between">
    <div class="profile__content u-flex-line">
      <img class="profile__avatar" :src="avatar" alt="Avatar profile">
      <div class="profile__details">
        <div class="profile__line u-flex-line">
          <h1 class="profile__name">{{ name }}</h1>
          <svg v-if="role == 5" class="profile__badge" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7499 2.45007C11.4399 1.86007 12.5699 1.86007 13.2699 2.45007L14.8499 3.81007C15.1499 4.07007 15.7099 4.28007 16.1099 4.28007H17.8099C18.8699 4.28007 19.7399 5.15007 19.7399 6.21007V7.91007C19.7399 8.30007 19.9499 8.87007 20.2099 9.17007L21.5699 10.7501C22.1599 11.4401 22.1599 12.5701 21.5699 13.2701L20.2099 14.8501C19.9499 15.1501 19.7399 15.7101 19.7399 16.1101V17.8101C19.7399 18.8701 18.8699 19.7401 17.8099 19.7401H16.1099C15.7199 19.7401 15.1499 19.9501 14.8499 20.2101L13.2699 21.5701C12.5799 22.1601 11.4499 22.1601 10.7499 21.5701L9.16988 20.2101C8.86988 19.9501 8.30988 19.7401 7.90988 19.7401H6.17988C5.11988 19.7401 4.24988 18.8701 4.24988 17.8101V16.1001C4.24988 15.7101 4.03988 15.1501 3.78988 14.8501L2.43988 13.2601C1.85988 12.5701 1.85988 11.4501 2.43988 10.7601L3.78988 9.17007C4.03988 8.87007 4.24988 8.31007 4.24988 7.92007V6.20007C4.24988 5.14007 5.11988 4.27007 6.17988 4.27007H7.90988C8.29988 4.27007 8.86988 4.06007 9.16988 3.80007L10.7499 2.45007Z" fill="#6B6BFF"/>
            <path d="M10.7499 2.45007C11.4399 1.86007 12.5699 1.86007 13.2699 2.45007L14.8499 3.81007C15.1499 4.07007 15.7099 4.28007 16.1099 4.28007H17.8099C18.8699 4.28007 19.7399 5.15007 19.7399 6.21007V7.91007C19.7399 8.30007 19.9499 8.87007 20.2099 9.17007L21.5699 10.7501C22.1599 11.4401 22.1599 12.5701 21.5699 13.2701L20.2099 14.8501C19.9499 15.1501 19.7399 15.7101 19.7399 16.1101V17.8101C19.7399 18.8701 18.8699 19.7401 17.8099 19.7401H16.1099C15.7199 19.7401 15.1499 19.9501 14.8499 20.2101L13.2699 21.5701C12.5799 22.1601 11.4499 22.1601 10.7499 21.5701L9.16988 20.2101C8.86988 19.9501 8.30988 19.7401 7.90988 19.7401H6.17988C5.11988 19.7401 4.24988 18.8701 4.24988 17.8101V16.1001C4.24988 15.7101 4.03988 15.1501 3.78988 14.8501L2.43988 13.2601C1.85988 12.5701 1.85988 11.4501 2.43988 10.7601L3.78988 9.17007C4.03988 8.87007 4.24988 8.31007 4.24988 7.92007V6.20007C4.24988 5.14007 5.11988 4.27007 6.17988 4.27007H7.90988C8.29988 4.27007 8.86988 4.06007 9.16988 3.80007L10.7499 2.45007Z" fill="#6B6BFF"/>
            <path d="M10.7901 15.17C10.5901 15.17 10.4001 15.09 10.2601 14.95L7.84006 12.53C7.55006 12.24 7.55006 11.76 7.84006 11.47C8.13006 11.18 8.61006 11.18 8.90006 11.47L10.7901 13.36L15.0901 9.06003C15.3801 8.77003 15.8601 8.77003 16.1501 9.06003C16.4401 9.35003 16.4401 9.83003 16.1501 10.12L11.3201 14.95C11.1801 15.09 10.9901 15.17 10.7901 15.17Z" fill="#C5CEDD"/>
          </svg>
        </div>
        <strong class="profile__username">{{ isAddress(username) ? truncateAddress(username) : `@${username}` }}</strong>
        <p class="profile__description">{{ description }}</p>
      </div>
    </div>
    <template v-if="account.hasAccount">
      {{ isFollowing }}
      <button v-if="!isMyProfile && !isFollowing == true" class="profile__button" @click="handleFollow(owner)">Follow</button>
      <button v-if="!isMyProfile && isFollowing == true" class="profile__button" @click="handleUnfollow(owner)">Following</button>
      <button v-if="isMyProfile" class="profile__button">Nada</button>
    </template>
    <button v-else class="profile__button" disabled>Follow</button>
    <!-- <button v-if="isMyProfile && role == 4" class="profile__button u-font-500">Subscription</button> -->
  </section>
</template>

<style>
.profile {
  padding-inline: 80px;
}
.profile__header {
  padding-block: 40px 66px;
}
.profile__content {
  gap: 40px;
}
.profile__avatar {
  height: 150px;
  width: 150px;
  object-fit: cover;
  border-radius: 24px;
}
.profile__details {
  display: grid;
  gap: 14px;
  max-width: 552px;
}
.profile__line {
  gap: 9px;
}
.profile__badge {
  margin-bottom: 3px;
}
.profile__name {
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 3.2rem;
}
.profile__username {
  font-size: 1.4rem;
  line-height: 1.4rem;
  font-weight: 500;
  color: var(--text-color-secondary);
}
.profile__description {
  line-height: 150%;
}
.profile__button {
  font-weight: 600;
  color: #f4f4f4;
  border-radius: 8px;
  padding-inline: 24px;
  font-size: 15px;
  height: 40px;
  background-color: #4e4f51;
}
</style>
