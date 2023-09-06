// @ts-ignore
import { config } from '@/config';
import { Box, Flex } from '@chakra-ui/react';
import styled from 'styled-components';

interface FlexContainerProps {
    mainFlexWidth: string;
    isHomepage?: boolean;
}

export const Span = styled.span`
    color: ${({ theme }) => theme?.color};

    @media (max-width: 768px) {
        margin-left: 20px;
        max-height: 73px;
    }
`;

export const StyledBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const FlexContainer = styled(Flex)<FlexContainerProps>`
    width: ${props => props.mainFlexWidth};
    display: flex;
    background: ${({ theme }) => theme?.innerBackground};

    @media (max-width: 767px) {
        display: ${props => (props.isHomepage ? 'none' : 'flex')};
    }

    @media (min-width: 768px) {
        display: flex;
    }
`;

export const MainFlex = styled(Flex)`
    flex-direction: column;
    width: 100%;
    border-left: 1px solid #cdcdcd;
`;

export const TopSection = styled(Box)`
    font-weight: 700;
    display: flex;
    padding: 0 0 5px 20px;
    border-bottom: 1px solid #cdcdcd;

    @media (max-width: 767px) {
        padding: 10px;
    }
`;

export const ChatWindow = styled(Box)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const BackBox = styled(Box)`
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
    display: flex;
    align-items: center;
    margin: 10px 0px 0 30px;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: 100%;
        margin-left: 5px;
    }
`;

export const InnerRing = styled(Box)`
    border: ${config?.chatWindow?.topbar?.iconBorder};
    width: ${config?.chatWindow?.topbar?.imageHeight};
    height: ${config?.chatWindow?.topbar?.imageWidth};
    border-radius: 50%;
    margin-right: 10px;

    @media screen and (max-width: 768px) {
        width: ${config?.chatWindow?.topbar?.mobileImageWidth};
        height: ${config?.chatWindow?.topbar?.mobileImageHeight};
        margin-left: 0px;
    }
`;

export const AvatarImage = styled.img`
    width: 100%;
    height: 100%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        max-height: 100%;
    }
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

export const MainBox = styled(Box)`
    height: ${config?.chatWindow?.innerWindow?.height};
    overflow-y: scroll;

    @media (max-width: 767px) {
        height: ${config?.chatWindow?.innerWindow?.mobileHeight};
    }
`;
