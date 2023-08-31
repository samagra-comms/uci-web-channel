//@ts-ignore
import styled, { css } from 'styled-components';

interface Props {
    active?: boolean;
    config?: {
        chatItem: {
            margin: string;
            textMargin: string;
            height: string;
            width: string;
            padding: string;
            avatar: {
                height: string;
                width: string;
                borderRadius: string;
            };
        };
    };
}

export const Container = styled.button<Props>`
    display: flex;
    align-items: center;
    border: 0;
    cursor: pointer;
    width: ${props => props.config?.chatItem?.width};
    height: ${props => props.config?.chatItem?.height};
    padding: ${props => props.config?.chatItem?.padding};
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        background-image: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(#ffffff),
            to(#ffffff)
        );
    }

    ${props =>
        props.active &&
        css`
            background-color: ${props => props.theme?.innerBackground};
            height: 72px;

            &:hover {
                transform: translateY(-2px);
                background-image: -webkit-gradient(
                    linear,
                    left top,
                    left bottom,
                    from(#ffffff),
                    to(#ffffff)
                );
            }
        `}
`;

export const AvatarContainer = styled.div<Props>`
    height: ${props => props.config?.chatItem?.avatar?.height};
    width: ${props => props.config?.chatItem?.avatar?.width};
    border-radius: ${props => props.config?.chatItem?.avatar?.borderRadius};
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
    margin: ${props => props.config?.chatItem?.textMargin};
    display: flex;
    flex-direction: column;
    color: ${props => props.theme?.color};
    overflow: hidden;
`;

export const UserName = styled.div<{ isBot: boolean }>`
    flex: 8;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: ${props => props.theme.fontSize};
`;

export const Paragraph = styled.p<{ expired: boolean }>`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 0;
    font-size: ${props => props.theme.fontSize};
    font-weight: 600;
    color: ${props => props.theme.color};

    ${props =>
        props.expired &&
        css`
            color: ${props => props.theme.color};
            text-decoration: line-through;
            opacity: ${props => props.theme.opacity};
        `}
`;
