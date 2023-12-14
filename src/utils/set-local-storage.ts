export const setLocalStorage = (): void => {
  localStorage.setItem("auth", "");
  localStorage.setItem("mobile", "");
  localStorage.setItem("botList", "[]");

  localStorage.setItem("socketUrl", "");
  localStorage.setItem("chatHistoryUrl", "");
  localStorage.setItem("botDetailsUrl", "");
};
