// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getMsgType = (msg: any): string => {
    if (msg?.payload?.buttonChoices || msg?.choices) return 'options';
    if (msg?.imageUrl) return 'image';
    if (msg?.videoUrl) return 'video';
    if (msg?.audioUrl) return 'audio';
    if (msg?.fileUrl) return 'file';
    if (msg?.payload?.media) {
        switch (msg?.payload?.media?.category) {
            case 'IMAGE':
            case 'IMAGE_URL':
                return 'image';
            case 'VIDEO':
            case 'VIDEO_URL':
                return 'video';
            case 'FILE':
            case 'FILE_URL':
                return 'file';
            case 'AUDIO':
            case 'AUDIO_URL':
                return 'audio';
            default:
                return 'text';
        }
    }
    return 'text';
};
