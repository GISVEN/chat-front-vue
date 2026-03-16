<script setup lang="ts">
import type { Chat } from "@/DTO/chat";
import { useChatsStore } from "@/stores/chats";

defineProps<{
  chat: Chat;
}>();
const { selectChat } = useChatsStore();
</script>

<script lang="ts"></script>

<template>
  <button class="list-group-item list-group-item-action btn btn-light" @click="selectChat(chat)">
    {{ chat.title }}
  </button>
</template>

<style lang="css">
.no-pounter-link {
  cursor: default;
}
</style>
