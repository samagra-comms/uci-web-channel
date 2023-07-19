export const config = {
    socket: {
        auth: process.env.NEXT_PUBLIC_AUTH,
        mobile: process.env.NEXT_PUBLIC_MOBILE,
        url: process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL || '',
    },
    list: [
        {
            botList: process.env.NEXT_PUBLIC_BOT_LIST || '{}',
        }
    ],
}