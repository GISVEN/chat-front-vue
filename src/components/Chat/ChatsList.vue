<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import ChatButton from "./ChatButton.vue";

import { useChatsStore } from "@/stores/chats";
const { user } = useUserStore();

const { chats } = useChatsStore();
</script>

<template>
  <div v-if="user.id !== ''" class="list-group">
    <div v-for="chat in chats.data" :key="chat.id">
      <ChatButton :chat></ChatButton>
    </div>
  </div>
  <div v-else>todo anunymous chats</div>
</template>
