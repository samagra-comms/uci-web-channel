import moment from "moment";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getConvHistoryUrl = (user: any): string =>
  `${
    localStorage.getItem("chatHistoryUrl") ||
    process.env.REACT_APP_CHAT_HISTORY_URL
  }/xmsg/conversation-history?provider=pwa&endDate=${moment()
    .add(7, "days")
    .format("DD-MM-YYYY")}&startDate=${moment(user.startDate).format(
    "DD-MM-YYYY"
  )}&botId=${user?.id}&userId=${`nlpwa:${
    localStorage.getItem("mobile") || process.env.REACT_APP_MOBILE
  }`}`;

export const getBotDetailsUrl = (): string =>
  `${
    localStorage.getItem("botDetailsUrl") ||
    process.env.REACT_APP_UCI_BOT_BASE_URL
  }/admin/bot/allContextual`;

export const botDetailsUrl = `${
  localStorage.getItem("botDetailsUrl") ||
  process.env.REACT_APP_UCI_BOT_BASE_URL
}/admin/bot/allContextual`;

export const socketUrl =
  localStorage.getItem("socketUrl") ||
  process.env.REACT_APP_TRANSPORT_SOCKET_URL;
// export const getBotDetailsUrl = (botId: string): string =>
// 	`${process.env.REACT_APP_UCI_BOT_BASE_URL}/admin/bot/${botId}`;


export const findBotId = (url:string)=>{
  const urlParams = new URLSearchParams(url);
  return urlParams.get('botId');
}