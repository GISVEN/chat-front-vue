import { describe, it, expect, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import ChatButton from "@/components/Chat/ChatButton.vue";

describe("Chat button", () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("renders properly", () => {
    const wrapper = mount(ChatButton, { props: { chat: { id: "123", title: "title" } } });
    expect(wrapper.text()).toContain("title");
  });
});
