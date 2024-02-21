export const setLocalStorage = (): void => {
  console.log("hello storage")
  localStorage.setItem("auth", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRwSFNCOUYteGw5OGZLSnJ0LVEyVDV6UjQ3cyJ9.eyJhdWQiOiIzMjBiMDIwYS0zZDg0LTRkOGEtYTE5MS1kYTRlOTcyYzI5NTEiLCJleHAiOjE3Mzg3NTQ3OTMsImlhdCI6MTcwNzIxODc5MywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiJjNjU0ODc1Mi0wZDdmLTRhM2MtYjUxNS1hNTU0NjdlYzAyMjEiLCJqdGkiOiI0NzkxNTcyMy00ZjFmLTQ1MTYtYWFkMi0xODM0YjhhMGRhOWQiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJSRUZSRVNIX1RPS0VOIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiOTk5OTk5OTk5OSIsImFwcGxpY2F0aW9uSWQiOiIzMjBiMDIwYS0zZDg0LTRkOGEtYTE5MS1kYTRlOTcyYzI5NTEiLCJ0aWQiOiIwMTA1NjZmZC1lMWNiLWM2NTgtYjY1OS1hMWQzZTA3MGJhYTgiLCJyb2xlcyI6W10sImF1dGhfdGltZSI6MTcwNzIxODQxMCwic2lkIjoiZjkzNjkyZjEtOWM3Ny00MTMyLTg2ZWItNTRjNjE0YTZhM2ZiIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIk9wZW5Sb2xlIiwiRElFVCIsIm1hbmF2X3NhbXBhZGEiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiRElFVCIsIlgtSGFzdXJhLVVzZXItSWQiOiI5OTk5OTk5OTk5In0sImFwaVJvbGVzIjpbIkRJRVQiXX0.xEFpH_spqvngf5Eidzt-3ApF1Aa94ZZd9hg8Gdc9rWWcbRENmZdbU3CpuFVJI0ARMah2ScC0YkWnMC3xE8haIWLLk5g9_94ANNoct99qD2HDy28RQdu4tdLAF8bV0L5zTOmhO3hSUt5KQh1HJ-BKmBbXZ52PZw2oU00e9m6x3s6ABdDA6ffpzDpLS_Vp5UFLkU62zfiAQjWXC0fkc5FoB1tmYNN-fXd4ER-Z7xHAwu1-nYCn0r5uEC10eHC1aNOaXlj4v_ti0-HTwkoCZyJkyO1EUplAEPsMChQ7_FUTeZl9ZT6ue8NWytBi1gnBNgLSH7dxu_d7pvIhgyjgvCy50Q");
  localStorage.setItem("mobile", "9999999999");
  localStorage.setItem("botList", JSON.stringify([
    "11e0c848-6b12-4b1e-a6e1-074435732989",
    "0488ebe7-a5c9-40c6-950f-747510dde8d4",
    "aa8845fc-d80a-4ec0-b60e-f1d328780d31",
    "f3acc237-2987-4f36-b52b-cf8cf74902fb",
    "efbb8f8b-b8ca-4006-a187-4971ab528f32",
    "e45f1b88-4489-4929-8026-7c9a84a2a357",
    "b44ab4a3-ff91-4a03-ad97-53fe9ca1dfc8",
    "30b85e73-93ba-497a-af33-9ebe80c9819f",
    "751d1592-368c-4c4a-8518-f8a8a3f52971"
  ]));

  // localStorage.setItem("socketUrl", "");
  // localStorage.setItem("chatHistoryUrl", "");
  // localStorage.setItem("botDetailsUrl", "");
};
