//@ts-ignore
import styled, { css } from 'styled-components';
import { config } from '@/config';

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
            from(#ffffff),
            to(#ffffff)
        );
    }

    ${props =>
        props.active &&
        css`
            background-color: ${({ theme }) => theme?.innerBackground};
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

export const AvatarContainer = styled.div`
    height: ${config?.chatItem?.avatar?.height};
    width: ${config?.chatItem?.avatar?.width};
    border-radius: ${config?.chatItem?.avatar?.borderRadius};
    overflow: hidden;
    margin: ${config?.chatItem?.margin};
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

export const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ChatItemText = styled.div`
    flex: 1;
    height: 100%;
    margin: ${config?.chatItem?.margin};
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.color};
    overflow: hidden;
`;

export const UserName = styled.div<{ isBot: boolean }>`
    flex: 8;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize};
`;

export const Paragraph = styled.p`
    text-overflow: hidden;
    overflow-x: hidden;
    white-space: nowrap;
    margin-bottom: 0;
    font-size: ${({ theme }) => theme?.fontSize};
    font-weight: 600;
    color: ${({ theme }) => theme?.color};

    ${props =>
        props.expired &&
        css`
            color: ${({ theme }) => theme.color};
            text-decoration: line-through;
            opacity: ${({ theme }) => theme.opacity};
        `}
`;
