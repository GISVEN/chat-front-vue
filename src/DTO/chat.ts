import z from "zod/v3";

export type Chat = {
  id: string;
  title: string;
};

export const ChatResponse = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
  }),
);
