import { ref, watch, type Ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { ChatResponse, type Chat } from "@/DTO/chat";
import { useAxios, useCookies } from "@vueuse/integrations";
import { useUserStore, type User } from "./user";

type Chats = Chat[];

const cookie = useCookies(["access_token"]);

export const useChatsStore = defineStore("chatsList", () => {
  const { user } = storeToRefs(useUserStore());

  const chats: Ref<Chats> = ref([]);

  const selected: Ref<Chat | null> = ref(null);

  async function fetchChats(user: User) {
    if (user.id === "") {
      return;
    }
    const access_token = cookie.get("access_token");

     const { data, error } = await useAxios(import.meta.env.VITE_BACKEND_URL + "/chats", {
      method: "GET",
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (error.value) {
      console.error("[chats] chats error", error.value);
      return;
    }

    const resolvedChats = ChatResponse.parse(data.value);

    chats.value = resolvedChats;
  }

  function selectChat(chat: Chat | null) {
    selected.value = chat;
  }

  watch(
    user,
    async (newUser) => {
      await fetchChats(newUser);
    },
    { immediate: true },
  );

  return { chats, selected, selectChat, fetchChats };
});
