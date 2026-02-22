import { defineStore } from "pinia";
import { useAxios, useCookies } from "@vueuse/integrations";
import z from "zod/v3";
import { reactive, ref } from "vue";

const cookie = useCookies(["access_token"]);

interface User {
  id: string;
  login: string;
}

function anonymousUser() {
  return {
    id: "",
    login: "anonymous",
  };
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
  const user: User = reactive(anonymousUser());

  const inProgress = ref(true);

  resolveUser();

  async function login(login: string, password: string) {
    if (user.id !== "") {
      return true;
    }

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
      return false;
    }

    const loginResponse = LoginResponse.parse(data.value);
    user.id = loginResponse.user.id;
    user.login = loginResponse.user.login;
    cookie.set("access_token", loginResponse.access_token);
  }

  function logout() {
    cookie.remove("access_token");
    const anon = anonymousUser();
    user.id = anon.id;
    user.login = anon.login;
  }

  async function resolveUser() {
    const access_token = cookie.get("access_token");

    if (typeof access_token !== "string" || access_token === "") {
      inProgress.value = false;
      return null;
    }

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
      cookie.remove("access_token");
    } else {
      const resolvedUser = UserSchema.parse(data.value);
      user.id = resolvedUser.id;
      user.login = resolvedUser.login;
    }

    inProgress.value = false;
  }

  return { user, login, inProgress, logout };
});
