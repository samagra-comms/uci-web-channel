import styled, { css } from "styled-components";
import { config } from "@/config";

export const Container = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ${(props) =>
        props.active
            ? css`
     height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  font-weight: 600;
  padding: 0 16px;
  border-radius: 8px;
  &:hover {
    background-color: #e5e5e5;
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
    background-color: white;
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
  color: #333; 
`;

export const UserName = styled.div<{ isBot: boolean }>`
  ${(props) =>
        props.isBot ? css`
    flex: 8;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
    ` : css`
    flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888; 
    `}
`;

export const Paragraph = styled.p<{ expired: boolean }>`

text-overflow: ellipsis;
  max-width: calc(100% - 48px); /* Adjust based on avatar width */
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 0;
  font-size: 16px;

  ${(props) =>
        props.expired
            ? css`
  color: ${config?.chatItem?.expiredColor};
  text-decoration: line-through;
  font-size:  ${config?.chatItem?.fontSize};
  opacity: ${config?.chatItem?.opacity};
        `
            : css`
      font-size: ${config?.chatItem?.fontSize};
  font-weight: 600;
  color: ${config?.chatItem?.fontColor};
        `}
`;