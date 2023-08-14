// @ts-ignore
import styled from 'styled-components';
import { config, theme_styles } from '@/config';
import Image from 'next/image';

export const Span = styled.span`
  font-size: ${config?.message?.botMsg?.fontSize};
`;

export const BubbleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: self-end;
`;

export const BubbleSpan = styled.span`
  color: var(--grey);
  font-size: ${theme_styles?.textStyles?.small?.fontSize};
`;

export const Div = styled.div`
  padding: ${theme_styles?.padding?.medium};
`;

export const ContentDiv = styled.div`
  width: ${theme_styles?.width?.medium};
  margin-right: ${theme_styles?.margin?.small};
  text-align: center;
  border-radius: "200px";
`;

export const ContentImage = styled(Image)`
  width: ${theme_styles?.width?.medium};
  height: ${theme_styles?.width?.medium};
  border-radius: "200px";
`;
