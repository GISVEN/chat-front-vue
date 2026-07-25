import { defineStore } from "pinia";
import { useAxios, useCookies } from "@vueuse/integrations";
import z from "zod/v3";
import { ref, type Ref } from "vue";

const cookie = useCookies(["access_token"]);

export interface User {
  id: number;
  email: string;
}

function anonymousUser() {
  return {
    id: -1,
    email: "anonymous",
  };
}

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
});

const LoginResponse = z.object({
  user: UserSchema,
  access_token: z.string(),
});

export const useUserStore = defineStore("userStore", () => {
  const user: Ref<User> = ref(anonymousUser());

  const inProgress = ref(true);

  resolveUser();

  async function login(email: string, password: string) {
    if (user.value.id !== -1) {
      return true;
    }

    try {
      const { data, error } = await useAxios(import.meta.env.VITE_BACKEND_URL + "/login", {
        method: "POST",
        timeout: 1000,
        data: {
          email: email,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (error.value) {
        console.log(error.value);
        throw new Error("Login failed: " + error.value);
      }

      const loginResponse = LoginResponse.parse(data.value);
      user.value = loginResponse.user;
      cookie.set("access_token", loginResponse.access_token);
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  function logout() {
    cookie.remove("access_token");
    user.value = anonymousUser();
  }

  async function resolveUser() {
    const access_token = cookie.get("access_token");

    if (typeof access_token !== "string" || access_token === "") {
      inProgress.value = false;
      return null;
    }

    try {
      const { data, error } = await useAxios(import.meta.env.VITE_BACKEND_URL + "/me", {
        method: "POST",
        timeout: 1000,
        data: {},
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (error.value) {
        cookie.remove("access_token");
      } else {
        user.value = UserSchema.parse(data.value);
      }
    } catch (e) {
      console.log(e);
      cookie.remove("access_token");
    }

    inProgress.value = false;
  }

  return { user, login, inProgress, logout };
});
