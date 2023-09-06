// @ts-ignore
import styled from 'styled-components';
import { config } from '@/config';
import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';

export const Span = styled.span`
    font-size: ${config?.message?.botMsg?.fontSize};
`;

export const Div = styled.div``;

export const ContentDiv = styled.div`
    text-align: center;
    border-radius: '200px';
`;

export const ContentImage = styled(Image)`
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

export const ChatAvatarDiv = styled.div`
    margin: 0 10px 0 10px;
    width: 65px;
    height: 75px;
`;

export const ChatAvatar = styled.img`
    border-radius: 30px;
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
    font-size: 0.75rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 10px 0 10px;
    color: ${({ theme }) => theme?.color};

    @media screen and (max-width: 768px) {
        margin-right: 10px;
        margin-left: 0px;
        margin-top: 0px;
    }

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

export const StyledChatContainer = styled.div`
    position: relative;
    padding: 1rem;

    @media screen and (max-width: 768px) {
        padding: 0.2rem;
        width: 100%;
    }
`;

export const ChatTextRight = styled.div`
    padding: ${config?.message?.padding};
    border-radius: 4px;
    background: #ffffff;
    font-weight: 300;
    line-height: 150%;
    position: relative;
    font-size: 0.9rem;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
        /* gap: 0px; */
    }
`;

export const StyledChatItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media screen and (max-width: 768px) {
        margin-left: -2px;
        width: 100%;
        padding: 5px;
    }

    img {
        width: ${config?.message?.userImage?.width};
        height: ${config?.message?.userImage?.height};
        border-radius: 30px;
    }

    .chat-text,
    .chat-text-right {
        padding: ${config?.message?.padding};
        border-radius: 4px;
        background: #ffffff;
        font-weight: 300;
        line-height: 150%;
        position: relative;
        font-size: 0.9rem;
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
    }
`;

export const ChatName = styled.div`
    font-size: 0.75rem;
    color: #999999;
    text-align: center;
`;

export const ChatBox = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

export const InnerRing = styled(Box)`
    border: ${config?.chatWindow?.topbar?.iconBorder};
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin-right: 10px;

    @media screen and (max-width: 768px) {
        height: 50px;
        width: 55px;
        margin-right: 15px;
    }
`;

export const AvatarImage = styled(Image)`
    height: 150px;
    width: 150px;
    border-radius: 50%;
`;

export const MainFlex = styled(Flex)`
    flex-direction: row;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;
