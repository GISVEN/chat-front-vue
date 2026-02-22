import { reactive, watch } from "vue";
import { defineStore } from "pinia";
import { ChatResponse, type Chat } from "@/DTO/chat";
import { useAxios, useCookies } from "@vueuse/integrations";
import { useUserStore, type User } from "./user";

interface Chats {
  data: Chat[];
}

const cookie = useCookies(["access_token"]);

export const useChatsStore = defineStore("chatsList", () => {
  const { user } = useUserStore();

  const chats: Chats = reactive({
    data: [],
  });

  async function fetchChats(user: User) {
    if (user.id === "") {
      console.log("[chats] no user");
      return;
    }
    const access_token = cookie.get("access_token");

    console.log("[chats] req chats");
    const { data, error } = await useAxios("http://localhost:8081/chats", {
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
    console.log("[chats] resolved", resolvedChats);

    chats.data = resolvedChats;
  }

  watch(
    user,
    async (newUser) => {
      console.log("[chats] new user", newUser);
      await fetchChats(newUser);
    },
    { immediate: true },
  );

  return { chats, fetchChats };
});
