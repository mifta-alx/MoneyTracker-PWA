export const useToastStore = defineStore("toast", () => {
  const show = ref(false);
  const message = ref("");
  const type = ref<"success" | "error">("success");
  let timer: NodeJS.Timeout | null = null;

  const success = (msg: string) => {
    message.value = msg;
    type.value = "success";
    trigger();
  };

  const error = (msg: string) => {
    message.value = msg;
    type.value = "error";
    trigger();
  };

  const trigger = () => {
    show.value = true;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      show.value = false;
    }, 3000);
  };

  return { show, message, type, success, error };
});