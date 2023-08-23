export type ChatUiMsgType = {
    type: 'image' | 'text' | 'audio' | 'file' | 'video';
    content: { text: string; data: any };
    position: 'right' | 'left';
};
