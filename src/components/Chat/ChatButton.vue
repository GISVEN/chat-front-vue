<script setup lang="ts">
import type { Chat } from "@/DTO/chat";

defineProps<{
  chat?: Chat;
}>();
</script>

<script lang="ts"></script>

<template>
  <a
    class="no-pounter-link list-group-item list-group-item-action btn btn-light"
    href="#"
    role="button"
    >{{ chat?.title }}</a
  >
</template>

<style lang="css">
.no-pounter-link {
  cursor: default;
}
</style>
