<script setup>
	import { storeToRefs } from "pinia";
	import { onBeforeMount, ref } from "vue";
	import PageHeader from "../components/page-header.vue";
	import CreatePost from "../components/create-post.vue";
	import { useAccountStore } from "../store/account.js";
	import Blockchain from "../infra/blockchain.js";
	import { useUserStore } from "../store/user.js";
	import Post from "../components/post.vue";
  import PostPlaceholder from "../components/post-placeholder.vue";
	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);
	const accountStore = useAccountStore();
	const { account } = storeToRefs(accountStore);
	const publications = ref([]);
  const isLoadingPost = ref(true);

	onBeforeMount(async () => {
		const blockchain = new Blockchain();
		const { success, data } = await blockchain.getPostFollowings(user.value.id);
		if (success) {
			publications.value = data;
		}
    isLoadingPost.value = false;
	});
</script>
<template>
  <create-post v-if="account.hasAccount && account.isConnected" />
  <page-header />
	<template v-if="!isLoadingPost">
    <section v-if="publications.length > 0" class="posts">
      <template v-for="item of publications">
        <post
          :id="item.id"
          :name="item.authorName"
          :avatar="item.authorAvatar"
          :attachment="item.attachment"
          :handle="item.authorHandle"
          :text="item.text"
          :owner="item.owner"
          :like="item.totalLike"
          :hasLiked="account.isConnected ? item.hasLiked : false"
          :isConnected="account.isConnected"
        />
      </template>
    </section>
    <div style="text-align: center; margin-top: 80px;" v-else>No has publications in the your feed</div>
  </template>
  <template v-else>
    <section class="posts">
      <post-placeholder/>
    </section>
  </template>
</template>