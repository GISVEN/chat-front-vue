<script setup lang="ts">
import ChatsList from "@/components/ChatsList.vue";
import LoginModal from "@/components/LoginModal.vue";
import { useUserStore } from "@/stores/user";

const { user, resolveUser } = useUserStore();
resolveUser();
</script>

<script lang="ts">
export default {
  watch: {
    user() {},
  },
};
</script>

<template>
  <LoginModal />

  <div v-if="user === null">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#loginModal"
    >
      Login
    </button>
  </div>
  <div v-else>User: {{ user?.login }}</div>

  <div class="container">
    <div class="row">
      <div class="col-4">
        <h2>Чатов</h2>
        <ChatsList></ChatsList>
      </div>
      <div class="col-lg-auto">// opened chat</div>
    </div>
  </div>
</template>
