import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { useAxios, useCookies } from "@vueuse/integrations";
import z from "zod/v3";

const cookie = useCookies(["access_token"]);

interface User {
  id: string;
  login: string;
}

const UserSchema = z.object({
  id: z.string(),
  login: z.string(),
});

const LoginResponse = z.object({
  user: UserSchema,
  access_token: z.string(),
});

export const useUserStore = defineStore("userStore", () => {
  const user: Ref<User | null> = ref(null);
  async function login(login: string, password: string) {
    console.log("login...", user.value, login, password);
    // if (user.value !== null) {
    //   console.log("exit");

    //   return;
    // }

    const { data, error } = await useAxios("http://localhost:8081/login", {
      method: "POST",
      timeout: 1000,
      data: {
        login: login,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (error.value) {
      console.log(error);
      user.value = null;
      return;
    }

    const loginResponse = LoginResponse.parse(data.value);
    user.value = loginResponse.user;
    cookie.set("access_token", loginResponse.access_token);
  }

  async function resolveUser() {
    const access_token = cookie.get("access_token");

    if (typeof access_token !== "string" || access_token === "") {
      return null;
    }

    await tryResolveUser(access_token);
  }

  async function tryResolveUser(access_token: string) {
    console.log("resolving...");
    const { data, error } = await useAxios("http://localhost:8081/user/get", {
      method: "POST",
      timeout: 1000,
      data: { test: "test" },
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (error.value) {
      cookie.set("access_token", null);
      user.value = null;
    } else {
      user.value = UserSchema.parse(data.value);
    }
  }

  return { user, login, resolveUser };
});
