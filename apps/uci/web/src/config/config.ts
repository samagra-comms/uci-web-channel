import { botImage, profilePic } from '@/assets';
import {
    faChevronLeft,
    faComment,
    faPaperPlane,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';

export const config = {
    socket: {
        auth: process.env.NEXT_PUBLIC_AUTH,
        mobile: process.env.NEXT_PUBLIC_MOBILE,
        url: process.env.NEXT_PUBLIC_TRANSPORT_SOCKET_URL || '',
    },
    list: [
        {
            botList: process.env.NEXT_PUBLIC_BOT_LIST || '{}',
        },
    ],
    starredlist: {
        video_cover:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAeFBMVEUyMjL///8vLy/Q0NBJSUlAQEA8Oz85OD0tLS0qKio1Nzs5OTz6+vo5OTnZ2dkzMzPw8PBkZGRGRkaAgIDo6OioqKgkJCR6enqurq5SUlLMzMyFhYXh4eHW1ta7u7tHR0dcXFybm5twcHC/v7+UlJRXWFeVlZVsbGwZSzceAAAD0UlEQVR4nO3ca3OiMBiGYYOoPUQNihVBrQfc/v9/uEntslRBwmFk3jfPNbOf2tlyT0oCgTp4m0wm75Mb46tRkfH40Vf/f7nczQ97L/aW0d8xLfxJ1+N+n4wnFcejvzH//+l/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgOfw+j6AfswXcxfLvcUqnb70fRTP5/lDebx8ODfkuluI3Xrg2pB/dwu137y4NeTXbjPkI6eG/F+3CKPPj74P5omybiGGiefO73quW6jo8Nr38TxLvlvI3dJz5Cz/1a2H/Oi7sZbfdAsxWzpx+XbXrSd2F9by+24h4yX/ib2g20zs01fm5YXdQsQJ87O8pFuo1YH15VtZt17LT6+Mh7y02ww544n9Qbdey08jruEPu8U2+mK6pD3uFnK2HLC8V6no1uX7A8et5spuIXapz2/ILbr15duG3Vlu0y3kMJkzG3KrbnOWB7zOcstuPbEnrNZy225zXx4w2oqx79aXb4z22Ot0C7UPuDw8rdWtJ/Z0xGNir9fN5yatbrc+y9Mpg/D63fryjcFZ3qBbyF1CfmJv0m3WcuqPVZp165u0ZEF6yJt267Wc9H15425zkzalu5Y37zZr+YXsWt6mW4htQnUtb9ctwlVAcyumZbdey9dzihN7225z+XYhOOTtu82LUAtyE3sX3WbDldpa3km3eUWC2GOVbrq/330jdZZ31W2epC3mfdfY66xbX8Ss3ezebwj9onfWHdPaZO6oOzwHtN786qY7PC36Dqmpi24VnWgN9qCLbrlNPFrXLEbrbhldKN6Dt+0eHmm+BNKuW54X5M7sq1bdwyXNwR606g7PJ7Lbii26VTLt++BbaNqtjgHdwR407ZbbP4SfGRjNuvcHimt2XpPuYeqT/h036nereEP8GbBRu3u2pLS9UKpmtzqfSG0flqrXHSb032y5qtMtjwH1aTxj3y1nK+Jrdp5995n8mp1n222e/THKtuxWMad3sA2r7nDp932cXbPoVvs1+cvSO9V/PxamBLdLK1V1y4jPmp1X0b1b+aym8czj7pjfH8z9eNS9S8hul1Yq71aUt0srlXarZETo9YXaSrpVxOQ+u0xhtwyPjG69ChV273mu2XkF3bPjhueanXfXLYfU/2TGym33LNlQei2psd/dKl478oF7v7pVSvkRZy25brn6Yj+NZ7JuuY24r9l5Wfc5YPX5DVV+umepA2t23ne3ir9cWLPzTHeYbPo+jKfz/HPszIfk5nifJ24fQWRn6s6aDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbPwFoto0lZUp3cEAAAAASUVORK5CYII=',
    },
    heading: {
        text: 'Welcome to UCI',
        size: 'md',
        margin: '0px 0px 0px 0px',
        width: '100%',
    },
    tab: {
        bots: {
            text: 'Bots',
            borderRadius: '0.5vw',
        },
        Starredchat: {
            text: 'Starred Chat',
            borderRadius: 'md',
        },
    },

    icon: {
        chat: {
            colorScheme: 'teal.500',
            size: 'xl',
            variant: 'solid',
            label: 'Chat',
            margin: '0 0 0 20px',
            icon: faComment,
        },
    },

    search: {
        placeholder: 'Search',
        size: 'lg',
        variant: 'none',
        margin: '0vw 0vw 4vw 3vw',
        borderRadius: '6vw',
        icon: faSearch,
        iconPadding: '10px 0 0px 20px',
        outline: 'none',
    },

    chatList: {},

    chatItem: {
        width: '100%',
        height: '100%',
        expiredColor: 'white',
        fontWeight: 'bold',
        padding: '1vw',
        opacity: '0.6',
        margin: '0 0 0 20px',
        avatar: {
            borderRadius: '50%',
            height: '48px',
            width: '48px',
        },
    },

    message: {
        icon: botImage,
        iconSize: 10,
        userInput: {
            position: 'left',
            background: 'white',
            padding: '1vw',
            borderRadius: '0.5vw',
        },
        botMsg: {
            fontSize: 'lg',
            starredColor: 'red',
            borderRadius: '1vw',
            padding: '1vw',
            margin: '0 2vw 0 1vw',
        },
        listItem: {},
    },
    chatWindow: {
        margin: '0vw',
        borderRadius: '0vw',
        topbar: {
            icon: faChevronLeft,
            iconSize: 'sm',
            textMargin: '0 0 0 10px',
            fontSize: 'md',
            image: profilePic,
            height: '200px',
            padding: '10px 0 10px 20px',
        },
        window: {
            padding: '0vw',
            width: '100%',
            height: '100%',
        },
        innerWindow: {
            borderRadius: '2vw',
            input: {
                icon: faPaperPlane,
            },
        },
    },
};
