import {
    Box,
    Flex,
    Heading,
    Input,
    InputLeftElement,
    Tab,
    TabList,
    Tabs,
} from '@chakra-ui/react';
import { styled } from 'styled-components';

export const StyledFlex = styled(Flex)`
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

export const StyledTopSection = styled.div`
    background-color: ${props => props.theme?.innerBackground};
    width: ${props => props.config?.heading?.width};
    height: 60px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 0px 20px;
`;

// export const StyledHeading = styled(Heading)`
// color: ${props => props.theme?.headingColor};
// margin: ${props => props.config?.heading?.margin};
// size: ${props => props.config?.heading?.size};
// `;

// export const FlexText = styled(Flex)`
//   flex: 9;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

export const StyledBox = styled(Box)`
    flex: 1;
    overflow: hidden;
    overflow-y: hidden;
`;

export const StyledMainContainer = styled(Box)`
    width: ${props => (props.isMobile ? '100%' : '35%')};
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: row;
    position: fixed;
    justify-content: center;
    align-items: flex-end;
    bottom: 0;
`;

export const StyledBackBox = styled(Box)`
    background: ${props => props.theme.background};
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const StyledTabList = styled(TabList)`
    display: flex;
    padding: 1rem 0;
    justify-content: center;
    border-radius: lg;
    overflow: hidden;
`;

export const StyledTab = styled(Tab)`
    color: ${props => props.theme?.color};
    _focus: {
        outline: none;
    }
    font-weight: bold;
    text-align: center;
    font-size: ${props => props.theme?.fontSize};
    padding: 0.7vw;
    border-bottom-width: 2px;
    border-radius: ${props => props.config?.tab?.bots?.borderRadius};
`;

export const StyledChatList = styled(Box)`
    max-height: 85vh;
    overflow-y: auto;
    margin-top: 70px;
    padding: 0 10px;
    overflow: auto;
    flex: 1;
`;

export const StyledSearchBox = styled(Box)`
    margin: ${props => props.config?.search?.margin};
    z-index: 200;
`;

export const StyledInput = styled(Input)`
    background: ${props => props.theme?.innerBackground};
    border: none;
    border-radius: ${props => props.config?.search?.borderRadius};
    outline: ${props => props.config?.search?.outline};
    color: ${props => props.theme?.color};
    padding: 25px 50px 25px 0px;
    padding-left: 50px;
`;

export const StyledInputLeftElement = styled(InputLeftElement)`
    justify-content: center;
    align-items: center;
    padding: ${props => props.config?.search?.iconPadding};
`;
