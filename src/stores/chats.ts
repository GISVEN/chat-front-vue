import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { Chat } from "@/DTO/chat";

type Chats = Chat[];

export const useChatsStore = defineStore("chatsList", () => {
  const chats: Ref<Chats | null> | null = ref(null);

  function fetchChats() {
    console.log("fetchng chats...");
  }

  return { chats, fetchChats };
});
