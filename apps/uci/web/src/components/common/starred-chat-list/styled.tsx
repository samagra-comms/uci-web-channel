import styled from 'styled-components'; 
import { theme } from '@/config';
import Image from 'next/image';
// @ts-ignore
import { Bubble } from 'chatui';

export const ImageDiv = styled.div`
  width: ${theme.width.small};
  margin-right: ${theme.margin.small};
  text-align: center;
`;

export const StyledImage = styled(Image)`
  border-radius: 50%;
`;

export const StyledBubble = styled(Bubble)`
  p {
    font-size: ${theme.textStyles.medium.fontSize};
  }
  span {
    color: var(--grey);
    font-size: ${theme.textStyles.small.fontSize};
  }
`;

export const StyledBubbleImage = styled(Bubble)`
  div {
    padding: ${theme.padding.medium};
  }
  span {
    color: var(--grey);
    font-size: ${theme.textStyles.small.fontSize};
  }
`;

export const StyledBubbleOptions = styled(Bubble)`
  div {
    display: flex;
  }
  span {
    font-size: ${theme.textStyles.medium.fontSize};
  }
  div:nth-child(3) {
    margin-top: ${theme.margin.medium};
  }
  span:last-child {
    color: var(--grey);
    font-size: ${theme.textStyles.small.fontSize};
  }
`;

export const Span = styled.span`
    font-size: ${theme.textStyles.medium.fontSize};
`;
