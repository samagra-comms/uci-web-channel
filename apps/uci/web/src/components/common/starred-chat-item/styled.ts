import styled, { css } from "styled-components";
import { Box } from '@chakra-ui/react';
import { config } from '@/config';

export const Text = styled(Box)`
  flex: 1;
  height: 100%;
  margin-left: 2vw;
  padding: 0 1vh;
  display: flex;
  flex-direction: column;
`  ;

export const ChatButton = styled.button<{ active: boolean }>`
  ${props =>
    props.active ?
      css`
    height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px var(--lightgrey) dotted;
    background-color: white;
    font-weight: 600;`
      :
      css`
   height: 5rem;
   width: 100%;
   display: flex;
   align-items: center;
   border-bottom: 2px var(--lightgrey) dotted;
   background-color: white;
   font-weight: 600;
  `}
`;

export const AvatarImage = styled.div`
  height: 8vh;
  width: 8vh;
  border-radius: 50%;
  margin-left: 1vw;
  margin-right: 0;
`;

export const UserName = styled(Box) <{ active: boolean; phoneNumber: string | null }>`
  // Common styles for the user name container
   color: ${config?.chatItem?.fontColor};
   font-size: ${config?.chatItem?.fontSize};
   align-items: center;
   font-family: 'Mulish', sans-serif;
   font-weight: ${config?.chatItem?.fontWeight};

  ${props =>
    props.active &&
    css`
    `}
  
  ${props =>
    !props.phoneNumber &&
    css`
  flex: 8;
  display: flex;
  font-weight: 700;
    `}
  
  ${props =>
    props.phoneNumber &&
    css`
  flex: 1;
  display: flex;
    `}
`;