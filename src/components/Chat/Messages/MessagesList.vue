<script setup lang="ts">
import useMessagesStore from "@/stores/messages";
import { storeToRefs } from "pinia";
import MessageItem from "./MessageItem.vue";

const { messages } = storeToRefs(useMessagesStore());
</script>

<script lang="ts"></script>

<template>
  <div class="messages-list" v-for="message in messages" :key="message.id">
    <MessageItem :message></MessageItem>
  </div>
</template>

<style>
.messages-list {
  overflow-y: "scroll";
}
</style>
