import {
    Box,
    Flex,
    Input,
    InputLeftElement,
    Tab,
    TabList,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';

interface FlexContainerProps {
    isMobile?: boolean;
}

interface IStyledProps {
    isMobile?: boolean;

    config: {
        heading: {
            width: string;
        };
        tab: {
            bots: {
                borderRadius: string;
            };
        };
        search: {
            margin: string;
            borderRadius: string;
            iconPadding: string;
            outline: string;
        };
    };
}

export const StyledFlex = styled(Flex)`
    width: 85vw;
    height: 100vh;

    @media (max-width: 768px) {
        width: 100vw;
    }
`;

export const StyledBox = styled(Box)<FlexContainerProps>`
    flex: 1;
`;

export const StyledMainContainer = styled(Box)<FlexContainerProps>`
    width: ${props => (props.isMobile ? '100%' : '35%')};
    display: flex;
    height: 100%;
    width: 100%;
`;

export const StyledBackBox = styled(Box)<FlexContainerProps>`
    background: ${props => props.theme.background};
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const StyledTabList = styled(TabList)`
    display: flex;
    justify-content: center;
    overflow: hidden;
`;

export const StyledTab = styled(Tab)<IStyledProps>`
    color: ${props => props.theme?.color};
    margin-left: 1.5vw;
    margin-right: 1.5vw;
    font-weight: bold;
    text-align: center;
    font-size: ${props => props.theme?.fontSize};
    padding: ${props => (props.isMobile ? '0.5vw' : '0.7vw')};
    /* background-color: ${props => props.theme?.mainBackground}; */

    @media screen and (max-width: 768px) {
        margin: 0 4.5vw 0 4.5vw;
        padding: 1.5vw;
    }
`;

export const StyledChatList = styled(Box)`
    width: 120%;
    height: 90.5vh;
    overflow-y: scroll;
    margin-left: -18px;

    @media screen and (max-width: 768px) {
        width: 110%;
    }
`;

export const StyledSearchBox = styled(Box)<FlexContainerProps>`
    margin: ${props =>
        props.isMobile ? '2vw 4vw 2vw 4vw' : '1vw 1.5vw 0vw 1.5vw'};
    padding-bottom: 0.3vw;
    @media screen and (max-width: 768px) {
        padding-bottom: 1.5vw;
    }
`;

export const StyledInput = styled(Input)<IStyledProps>`
    background: ${props => props.theme?.mainBackground};
    border: none;
    outline: ${props => props.config?.search?.outline};
    color: ${props => props.theme?.color};
    padding: 25px 0px 20px 0px;
    padding-left: 50px;
`;

export const StyledInputLeftElement = styled(InputLeftElement)<IStyledProps>`
    justify-content: center;
    align-items: center;
    padding: ${props => props.config?.search?.iconPadding};
`;

export const LoadMoreButton = styled.div`
    position: fixed;
    bottom: 40px;
    left: 13%;
    transform: translateX(-50%);
    z-index: 1;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        left: 50%;
    }

    > div {
        background-color: blue;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const LoadMoreIcon = styled(FontAwesomeIcon)`
    font-size: 2em;
    color: white;
`;
