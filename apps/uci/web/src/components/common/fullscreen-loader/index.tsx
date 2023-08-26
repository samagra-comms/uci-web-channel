import React, { FC, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { Spinner, Wrapper } from './styled';

export const FullScreenLoader: FC<{ loading: boolean }> = ({ loading }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Modal isCentered isOpen={isLoading || loading} onClose={() => null}>
            <ModalOverlay />
            <ModalContent className="modalContent">
                <Wrapper className="wrapper">
                    <Spinner className="spinner">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </Spinner>
                </Wrapper>
            </ModalContent>
        </Modal>
    );
};
