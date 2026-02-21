<script setup lang="ts">
import ChatButton from "./ChatButton.vue";

import { useChatsStore } from "@/stores/chats";

const { chats } = useChatsStore();
</script>

<script lang="ts">
export default {
  methods: {},

  mounted() {
    const { fetchChats } = useChatsStore();

    fetchChats();
  },
};
</script>

<template>
  <div class="list-group">
    <div v-for="chat in chats" :key="chat.id">
      <ChatButton :chat></ChatButton>
    </div>
  </div>
</template>
