<script setup>
  import { onBeforeMount, ref } from "vue";
  import User from "../user.vue";
  import UserPlaceholder from "../user-placeholder.vue";
  import Blockchain from "../../infra/blockchain.js";
  const { id, isConnected } = defineProps(["id", "isConnected"]);
  const followers = ref([]);
  const isLoading = ref(true);
  onBeforeMount(async () => {
    const blockchain = new Blockchain();
    const { success, data } = await blockchain.getFollwers(id);
    if (success) {
      followers.value = data;
    }
    isLoading.value = false;
  })
</script>
<template>
  <template v-if="!isLoading">
    <div v-if="followers.length > 0" class="users">
      <template v-for="item in followers">
        <user :avatar="item.avatar" :name="item.name" :handle="item.handle" :hasSubscription="item.hasSubscription" :owner="item.owner" :isFollowing="item.isFollowing" :isConnected="isConnected"/>
      </template>
    </div>
    <div v-else class="no-users">Not followed by anyone</div>
  </template>
  <template v-else>
    <div class="users">
      <user-placeholder/>
      <user-placeholder/>
      <user-placeholder/>
    </div>
  </template>
</template>