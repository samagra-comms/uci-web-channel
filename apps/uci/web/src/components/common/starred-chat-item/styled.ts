// @ts-ignore
import styled, { css } from 'styled-components';

interface Props {
    config: {
        chatItem: {
            margin: string;
            avatar: {
                height: string;
                width: string;
                borderRadius: string;
            };
        };
    };
}

export const Container = styled.button<{ active: boolean }>`
    display: flex;
    align-items: center;
    border: 0;
    cursor: pointer;
    width: 100%;
    height: 72px;
    padding: 16px 16px;

    font-weight: 600;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        background-image: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(#e9eff5),
            to(#ffffff)
        );
    }

    ${props =>
        props.active &&
        css`
            background-color: ${props => props.theme.innerBackground};
            height: 72px;

            &:hover {
                transform: translateY(-2px);
                background-image: -webkit-gradient(
                    linear,
                    left top,
                    left bottom,
                    from(#e9eff5),
                    to(#ffffff)
                );
            }
        `}
`;

export const AvatarContainer = styled.div<Props>`
    height: ${props => props.config.chatItem.avatar.height};
    width: ${props => props.config.chatItem.avatar.width};
    border-radius: ${props => props.config.chatItem.avatar.borderRadius};
    overflow: hidden;
    margin: ${props => props.config?.chatItem?.margin};
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

export const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ChatItemText = styled.div<Props>`
    flex: 1;
    height: 100%;
    margin: ${props => props.config.chatItem.margin};
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.color};
    overflow: hidden;
`;

export const UserName = styled.div<{ isBot: boolean }>`
    flex: 8;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: ${props => props.theme.fontSize};
`;

export const Paragraph = styled.p`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 0;
    font-size: ${props => props.theme.fontSize};
    font-weight: 600;
    color: ${props => props.theme.color};
`;
