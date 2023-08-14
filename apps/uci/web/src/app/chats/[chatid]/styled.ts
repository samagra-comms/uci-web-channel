// @ts-ignore
import styled from "styled-components";

export const Span = styled.span`
    color: ${(props: { theme: { color: any; }; })=>props.theme.color};
    margin: ${(props: { theme: { margin: any; }; })=>props.theme.margin};
    font-size: ${(props: { theme: { fontSize: any; }; })=>props.theme.fontSize};
    color: ${(props: { theme: { color: any; }; })=>props.theme.color};
`;

export const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

