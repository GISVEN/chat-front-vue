<script setup lang="ts">
import ChatsList from "@/components/Chat/ChatsList.vue";
import ChatWindow from "@/components/Chat/ChatWindow.vue";
import LoginModal from "@/components/LoginModal.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { logout } = userStore;
const { user, inProgress } = storeToRefs(userStore);
</script>

<script lang="ts"></script>

<template>
  <LoginModal />

  <div class="main-container">
    <div class="header">
      <div class="btn-toolbar mb-3 w-min" role="toolbar">
        <div class="input-group w-100">
          <div class="input-group-text flex" id="btnGroupAddon">@</div>

          <div class="form-control w-80" placeholder="Input group example">
            <div v-if="inProgress">
              <span class="spinner-border spinner-border-sm"></span>
            </div>
            <div v-else>{{ user.login }}</div>
          </div>

          <button
            v-if="user.id === ''"
            type="button"
            class="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Login
          </button>
          <button v-else type="button" class="btn btn-outline-danger" @click="logout()">
            Logout
          </button>
        </div>
      </div>
    </div>

    <div class="row chats-frame">
      <div class="col-4">
        <h2>Чатов</h2>
        <ChatsList></ChatsList>
      </div>
      <div class="col-lg">
        <ChatWindow></ChatWindow>
      </div>
    </div>
  </div>
</template>
