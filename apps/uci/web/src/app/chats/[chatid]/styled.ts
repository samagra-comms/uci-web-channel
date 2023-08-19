// @ts-ignore
import { Box, Flex } from '@chakra-ui/react';
import styled from 'styled-components';

export const Span = styled.span`
    color: ${(props: { theme: { color: any } }) => props.theme.color};
    margin: ${(props: { theme: { margin: any } }) => props.theme.margin};
    font-size: ${(props: { theme: { fontSize: any } }) => props.theme.fontSize};
    color: ${(props: { theme: { color: any } }) => props.theme.color};
`;

export const StyledBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const FlexContainer = styled(Flex)`
    width: ${props => props.mainFlexWidth};
    display: flex;

    @media (max-width: 767px) {
        display: ${props => (props.isHomepage ? 'none' : 'flex')};
    }

    @media (min-width: 768px) {
        display: flex;
    }
`;

export const MainFlex = styled(Flex)`
    background-color: var(--primarydarkblue);
    flex-direction: column;
    height: 100vh;
    width: 100%;
`;

export const TopSection = styled(Box)`
    height: ${props => props.config?.ChatWindow?.topbar?.height};
    background: ${props => props.theme?.innerBackground};
    font-weight: 700;
    display: flex;
    padding: 0px 20px;
`;

export const ChatWindow = styled(Box)`
    padding: ${props => props.config?.chatWindow?.window?.padding};
    width: ${props => props.config?.chatWindow?.window?.width};
    background: ${props => props.theme?.innerBackground};
    padding-top: 0.6vw;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: 0;
`;

export const BackBox = styled(Box)`
    border-radius: ${props =>
        props.config?.chatWindow?.innerWindow?.borderRadius};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const StyledFlex = styled(Flex)`
    flex: 9;
    justify-content: space-between;
    align-items: center;
`;

export const StyledCenteredFlex = styled(Flex)`
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const StyledAvatarContainer = styled(Box)`
    width: 100%;
    margin: ${props => props.config?.chatWindow?.topbar?.margin};
    display: flex;
    align-items: center;
`;

export const InnerRing = styled(Box)`
    border: ${props => props.config?.chatWindow?.topbar?.iconBorder};
    width: 65px;
    height: 55px;
    border-radius: 50%;
    margin-right: 10px;
`;

export const AvatarImage = styled.img`
    width: 75px;
    height: 55px;
`;

export const CenteredFlex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const StyledText = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: gray.500;
`;
