<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import ChatButton from "./ChatButton.vue";

import { useChatsStore } from "@/stores/chats";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useUserStore());

const { chats } = storeToRefs(useChatsStore());
</script>

<template>
  <div v-if="user.id !== ''" class="list-group">
    <div v-for="chat in chats" :key="chat.id">
      <ChatButton :chat></ChatButton>
    </div>
  </div>
  <div v-else>todo anunymous chats</div>
</template>
