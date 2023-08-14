//@ts-ignore
import styled, { css } from "styled-components";

export const Container = styled.button<{ active: boolean }>`

  display: flex;
  align-items: center;
  border-bottom: 0px solid #eee;
  cursor: pointer;
  margin-bottom: 0.5vw;
  background: ${(props: { theme: { innerBackground: any } })=>props.theme.innerBackground};

  ${(props: { active: any }) =>
  props.active
  ? css`
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  padding: 0 16px;
  border-radius: 8px;
  &:hover {
    background-color:${(props: { theme: { innerBackground: any } })=>props.theme.innerBackground};
  transform: translateY(-2px);
    }
        `
  : css`
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  padding: 0 16px;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  animation: fadeIn 0.5s ease-in-out;
  border-radius: 8px; 
  &:hover {
  background-color: ${(props: { theme: { innerBackground: any } })=>props.theme.innerBackground};
  transform: translateY(-2px);
    }
        `}
`;

export const AvatarContainer = styled.div`
    height: 48px;
  width: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 16px;
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
  margin-left: 16px;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  color: ${(props: { theme: { color: any } })=>props.theme.color}; 
`;

export const UserName = styled.div<{ isBot: boolean }>`
  ${(props: { isBot: any; }) =>
        props.isBot ? css`
    flex: 8;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: ${(props: { theme: { fontSize: any } })=>props.theme.fontSize};
    ` : css`
    flex: 1;
  display: flex;
  align-items: center;
  color: #888; 
    `}
`;

export const Paragraph = styled.p<{ expired: boolean }>`

text-overflow: ellipsis;
  max-width: calc(100% - 48px); 
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 0;

  ${(props: { expired: any }) =>
        props.expired
            ? css`
  color: ${(props: { theme: { color: any } })=>props.theme.color};
  text-decoration: line-through;
  font-size:  ${(props: { theme: { fontSize: any } })=>props.theme.fontSize};
  opacity: ${(props: { theme: { opacity: any } })=>props.theme.opacity};
        `
            : css`
  font-size: ${(props: { theme: { fontSize: any } })=>props.theme.fontSize};
  font-weight: 600;
  color: ${(props: { theme: { color: any } })=>props.theme.color};
        `}
`;