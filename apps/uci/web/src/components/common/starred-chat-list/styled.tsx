// @ts-ignore
import styled from 'styled-components';
import Image from 'next/image';
// @ts-ignore
import { Bubble } from 'chatui';

export const ImageDiv = styled.div`
    text-align: center;
`;

export const StyledImage = styled(Image)`
    border-radius: 50%;
`;

export const StyledBubble = styled(Bubble)`
    p {
    }
    span {
        color: var(--grey);
    }
`;

export const StyledBubbleImage = styled(Bubble)`
    div {
    }
    span {
        color: var(--grey);
    }
`;

export const StyledBubbleOptions = styled(Bubble)`
    div {
        display: flex;
    }
    span {
    }
    div:nth-child(3) {
    }
    span:last-child {
        color: var(--grey);
    }
`;

export const Span = styled.span``;
