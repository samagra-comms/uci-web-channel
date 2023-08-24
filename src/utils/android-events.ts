export const logToAndroid = (text: string) => {
  window && window?.androidInteract?.log(text);
};

export const sendEventToAndroid = (key: string, value: any) => {
  window && window?.androidInteract?.onEvent(key, value);
};

export const triggerEventInAndroid = (key: string, data?: any) => {
  switch (key) {
    case "onMediaReceived":
      window &&
        window?.androidInteract?.onMediaReceived(data.botId, data.msgId);
      break;
    case "onTriggerLogout":
      window && window?.androidInteract?.onTriggerLogout();
      break;
    case "onChatCompleted":
      window && window?.androidInteract?.onChatCompleted?.(data.id, data.msgs);
      break;
    case "onMsgSaveUpdate":
      window && window?.androidInteract?.onMsgSaveUpdate(data);
      break;
    case "onBotListingScreenFocused":
      window && window?.androidInteract?.onBotListingScreenFocused(data);
      break;
    case "onImageDownload":
      window && window?.androidInteract?.onImageDownload(data.id, data.url);
      break;
    case "onVideoDownload":
      window && window?.androidInteract?.onImageDownload(data.id, data.url);
      break;
    case "onPdfDownload":
      window && window?.androidInteract?.onImageDownload(data.id, data.url);
      break;
    case "onBotDetailsLoaded":
      window && window?.androidInteract?.onBotDetailsLoaded(data);
      break;

    case "onDestroyScreen":
      window && window?.androidInteract?.onDestroyScreen();
      break;
  }
};
