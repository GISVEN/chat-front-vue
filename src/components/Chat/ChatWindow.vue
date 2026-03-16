<script setup lang="ts">
import MessagesHeader from "./Messages/MessagesHeader.vue";
import MessagesList from "./Messages/MessagesList.vue";
</script>

<template>
  <div class="chat-window">
    <div class="container h-50">
      <div class="row-1 mb-2 w-100">
        <MessagesHeader></MessagesHeader>
      </div>
      <div class="row h-75 w-100">
        <MessagesList :messages="(() => [])()"></MessagesList>
      </div>
      <div class="row-1 w-100">send message</div>
    </div>
  </div>
</template>

<style>
.chat-window {
  height: 100%;
}
.chat-header-title {
  width: 95%;
}
</style>
