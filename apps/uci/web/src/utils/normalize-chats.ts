import { filter, map, sortBy, toUpper } from 'lodash';
import moment from 'moment';

export const normalizedChat = (chats: any): any => {
    const sortedChats = sortBy(
        filter(
            chats?.map((chat: any) => {
                return {
                    ...chat,
                    disabled: true,
                    text: chat?.payload?.text,
                    username: chat?.userId,
                    position: chat?.messageState === 'SENT' ? 'left' : 'right',
                    isIgnore:
                        toUpper(chat?.payload?.text) ===
                        toUpper(
                            // @ts-ignore
                            JSON.parse(localStorage.getItem('currentUser'))
                                ?.startingMessage,
                        ),
                    // toUpper(currentUser?.startingMessage),
                    time: moment(
                        chat.sentTimestamp || chat.repliedTimestamp,
                    ).valueOf(),
                };
            }),
            { isIgnore: false },
        ),
        ['time', 'messageState'],
    );
    //   console.log("debug:",{sortedChats});
    return map(sortedChats, (sortedChat, index) => {
        if (
            sortedChat?.payload?.buttonChoices &&
            sortedChats?.[index + 1]?.messageState === 'REPLIED'
        ) {
            return {
                ...sortedChat,
                payload: {
                    ...sortedChat?.payload,
                    buttonChoices: map(
                        sortedChat?.payload?.buttonChoices,
                        choice => {
                            return {
                                ...choice,
                                active:
                                    choice?.key ==
                                    sortedChats?.[index + 1]?.payload?.text,
                            };
                        },
                    ),
                },
                disabled: index !== Number(sortedChats?.length) - 1,
            };
        }
        return {
            ...sortedChat,
            disabled: index !== Number(sortedChats?.length) - 1,
        };
    });
};
