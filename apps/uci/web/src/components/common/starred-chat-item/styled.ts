// @ts-ignore
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
  ${(props: { active: any; }) =>
    props.active ?
      css`
    height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: white;
    margin-bottom: 5px;
    font-weight: 600;
    border-radius: 8px;
    color : ${(props: { theme: { color: any; }; }) => props.theme.color};
    background-color : ${(props: { theme: { innerBackground: any; }; }) => props.theme.innerBackground};
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
    animation: fadeIn 0.5s ease-in-out;
    &:hover{
      background-color: ${(props: { theme: { innerBackground: any } }) => props.theme.innerBackground};
      transform: translateY(-2px);
    }
    `
      :
      css`
   height: 5rem;
   width: 100%;
   display: flex;
   align-items: center;
   margin-bottom: 5px;
   background-color: white;
   font-weight: 600;
   border-radius: 8px;
   transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
   animation: fadeIn 0.5s ease-in-out;
   color : ${(props: { theme: { color: any } }) => props.theme.color};
    background-color : ${(props: { theme: { innerBackground: any; }; }) => props.theme.innerBackground};
    &:hover{
      background-color: ${(props: { theme: { innerBackground: any } }) => props.theme.innerBackground};
      transform: translateY(-2px);
    }
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
   color: ${(props: { theme: { color: any } }) => props.theme.color};
   font-size: ${(props: { theme: { fontSize: any } }) => props.theme.fontSize};
   align-items: center;
   font-family: 'Mulish', sans-serif;
   font-weight: ${config?.chatItem?.fontWeight};

  ${(props: { active: any; }) =>
    props.active &&
    css`
    `}
  
  ${(props: { phoneNumber: any }) =>
    !props.phoneNumber &&
    css`
  flex: 8;
  display: flex;
  font-weight: 700;
    `}
  
  ${(props: { phoneNumber: any }) =>
    props.phoneNumber &&
    css`
  flex: 1;
  display: flex;
    `}
`;