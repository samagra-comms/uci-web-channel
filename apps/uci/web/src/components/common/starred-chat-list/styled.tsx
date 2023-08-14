// @ts-ignore
import styled from 'styled-components'; 
import { theme_styles } from '@/config';
import Image from 'next/image';
// @ts-ignore
import { Bubble } from 'chatui';

export const ImageDiv = styled.div`
  width: ${theme_styles.width.small};
  margin-right: ${theme_styles.margin.small};
  text-align: center;
`;

export const StyledImage = styled(Image)`
  border-radius: 50%;
`;

export const StyledBubble = styled(Bubble)`
  p {
    font-size: ${theme_styles.textStyles.medium.fontSize};
  }
  span {
    color: var(--grey);
    font-size: ${theme_styles.textStyles.small.fontSize};
  }
`;

export const StyledBubbleImage = styled(Bubble)`
  div {
    padding: ${theme_styles.padding.medium};
  }
  span {
    color: var(--grey);
    font-size: ${theme_styles.textStyles.small.fontSize};
  }
`;

export const StyledBubbleOptions = styled(Bubble)`
  div {
    display: flex;
  }
  span {
    font-size: ${theme_styles.textStyles.medium.fontSize};
  }
  div:nth-child(3) {
    margin-top: ${theme_styles.margin.medium};
  }
  span:last-child {
    color: var(--grey);
    font-size: ${theme_styles.textStyles.small.fontSize};
  }
`;

export const Span = styled.span`
    font-size: ${theme_styles.textStyles.medium.fontSize};
`;
