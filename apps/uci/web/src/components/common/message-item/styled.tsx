// @ts-ignore
import styled from 'styled-components';
import { config, theme_styles } from '@/config';
import Image from 'next/image';

export const Span = styled.span`
    font-size: ${config?.message?.botMsg?.fontSize};
`;

// export const BubbleDiv = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: self-end;
// `;

// export const BubbleSpan = styled.span`
//   color: var(--grey);
//   font-size: ${theme_styles?.textStyles?.small?.fontSize};
// `;

export const Div = styled.div`
    padding: ${theme_styles?.padding?.medium};
`;

export const ContentDiv = styled.div`
    width: ${theme_styles?.width?.medium};
    margin-right: ${theme_styles?.margin?.small};
    text-align: center;
    border-radius: '200px';
`;

export const ContentImage = styled(Image)`
    width: ${theme_styles?.width?.medium};
    height: ${theme_styles?.width?.medium};
    border-radius: '200px';
`;

export const ChatContainer = styled.div`
    position: relative;
    padding: 1rem;
`;

export const ChatItem = styled.li`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-bottom: 40px;

    &.chat-right {
        justify-content: flex-end;

        .chat-avatar {
            margin-left: 20px;
            margin-right: 0;
        }
    }
`;

export const ChatAvatar = styled.div`
    margin-right: 20px;
    img {
        width: 60px;
        height: 60px;
        border-radius: 30px;
    }

    .chat-name {
        font-size: 0.75rem;
        color: #999999;
        text-align: center;
    }
`;

export const ChatText = styled.div`
    padding: 0.4rem 1rem;
    border-radius: 4px;
    background: #ffffff;
    font-weight: 300;
    line-height: 150%;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: 10px;
        left: -20px;
        border: 10px solid;
        border-color: transparent #ffffff transparent transparent;
    }

    &.chat-right {
        text-align: right;

        &:before {
            right: -20px;
            border-color: transparent transparent transparent #ffffff;
            left: inherit;
        }
    }
`;

export const ChatHour = styled.div`
    padding: 0;
    margin-bottom: 10px;
    font-size: 0.75rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 0 0 15px;

    > span {
        font-size: 16px;
        color: #9ec94a;
    }

    &.chat-right {
        margin: 0 15px 0 0;
    }
`;

export const BubbleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const BubbleSpan = styled.span`
    font-size: 0.75rem;
    color: #999999;
`;
