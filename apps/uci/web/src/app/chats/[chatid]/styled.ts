import styled from "styled-components";
import { config } from "@/config";

export const Span = styled.span`
    color: ${config.ChatWindow.topbar.color};
    margin: ${config.ChatWindow.topbar.textMargin};
    font-size: ${config.ChatWindow.topbar.fontSize};
`;

export const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

