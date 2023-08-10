import styled from 'styled-components';
import { config, theme } from '@/config';

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
  font-size: ${theme?.textStyles?.small?.fontSize};
`;

export const Div = styled.div`
  padding: ${theme?.padding?.medium};
`;

export const ContentDiv = styled.div`
  width: ${theme?.width?.medium};
  margin-right: ${theme?.margin?.small};
  text-align: center;
`;