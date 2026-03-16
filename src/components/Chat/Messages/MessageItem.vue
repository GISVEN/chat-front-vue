<script setup lang="ts">
import type { Message } from "@/stores/messages";

defineProps<{
  message: Message;
}>();
</script>

<script lang="ts">
function formatDate(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0"); // Получаем часы и добавляем 0 впереди, если нужно
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Получаем минуты и добавляем 0 впереди, если нужно
  const day = String(date.getDate()).padStart(2, "0"); // Получаем день
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Получаем месяц (прибавляем 1)
  const year = date.getFullYear(); // Получаем год

  return `${day}/${month}/${year} ${hours}:${minutes} `; // Форматируем строку
}
</script>

<template>
  <div class="border border-secondery message-item" v-if="!message.isError">
    {{ formatDate(message.createdAt) }} <strong>{{ message.user.login }}:</strong>
    {{ message.text }}
  </div>
  <div v-else class="message-item border-secondery bg-red-500">
    {{ formatDate(message.createdAt) }} <strong>{{ message.user.login }}:</strong>
    {{ message.text }}
  </div>
</template>

<style>
.message-item {
  margin-bottom: "2px";
}
</style>
