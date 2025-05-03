export type ChatMessage = {
  id: string;
  sender: "user" | "assistant";
  text: string;
};
