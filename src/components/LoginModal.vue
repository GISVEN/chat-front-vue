<script lang="ts" setup>
import { useUserStore } from "@/stores/user";

const { login } = useUserStore();
</script>

<script lang="ts">
function getLoginAndPassword(): [string, string] {
  const loginInput: HTMLInputElement = document.getElementById("login") as HTMLInputElement;
  const passwordInput: HTMLInputElement = document.getElementById("password") as HTMLInputElement;

  return [loginInput.value, passwordInput.value];
}
</script>

<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Авторизация</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="w-50 d-inline-flex">
            <div>
              <div class="mb-3">
                <label for="Login" class="form-label">Логин</label>
                <input type="text" class="form-control" id="login" aria-describedby="emailHelp" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input ref="password" type="password" class="form-control" id="password" />
              </div>
              <button
                class="btn btn-primary"
                @click="
                  () => {
                    login(...getLoginAndPassword());
                  }
                "
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
