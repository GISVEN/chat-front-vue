import { defineStore, storeToRefs } from "pinia";
import { UserSchema, useUserStore, type User } from "./user";
import { useChatsStore } from "./chats";
import { ref, watch, type Ref } from "vue";
import { useAxios } from "@vueuse/integrations";
import z from "zod/v3";

export interface Message {
  id: string;
  text: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  isError: boolean;
}

const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  user: UserSchema,
  createdAt: z.number().pipe(z.coerce.date()),
  updatedAt: z.number().pipe(z.coerce.date()),
  isError: z.boolean().optional().default(false),
});

const MessagesResponse = z.array(MessageSchema);

export type Messages = Message[];

const useMessagesStore = defineStore("messagesStore", () => {
  const messages: Ref<Messages | null> = ref(null);

  const { selected } = storeToRefs(useChatsStore());

  watch(selected, async (selectedChat) => {
    if (selectedChat === null) {
      messages.value = null;
      return;
    }

    await fetchMessages();
  });

  async function fetchMessages() {
    console.log("[messages] fetching...");
    if (selected.value === null) {
      return;
    }
    console.log("[messages] in chat", selected.value);

    const { user } = storeToRefs(useUserStore());
    if (user.value.id === "") {
      return;
    }

    const { data, error } = await useAxios("http://localhost:8081/chat/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { chatId: selected.value.id },
    });

    if (error.value) {
      console.log(error.value);
      return;
    }

    console.log("[messages] fetched", data.value);
    const resolvedMessages = MessagesResponse.parse(data.value);
    messages.value = resolvedMessages;
  }

  return { messages };
});

export default useMessagesStore;
