<script setup lang="ts">
import { useChatsStore } from "@/stores/chats";
import { storeToRefs } from "pinia";

const { selected } = storeToRefs(useChatsStore());
const { selectChat } = useChatsStore();
</script>

<template>
  <div class="btn-toolbar">
    <div class="input-group w-100">
      <div class="chat-header-title">
        <div class="form-control w-80">
          <div>{{ selected?.title ?? "not selected" }}</div>
        </div>
      </div>

      <button
        v-if="selected"
        type="button"
        class="form-control btn btn-outline-danger"
        @click="selectChat(null)"
      >
        X
      </button>
      <button
        v-else
        disabled
        type="button"
        class="form-control btn btn-outline-secondary"
        @click="selectChat(null)"
      >
        X
      </button>
    </div>
  </div>
</template>
