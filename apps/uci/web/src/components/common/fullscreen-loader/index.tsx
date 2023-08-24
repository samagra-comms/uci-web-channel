import React, { FC, useEffect, useState } from 'react';
import './index.css';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

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
            <ModalContent>
                <section className="wrapper">
                    <div className="spinner">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </section>
            </ModalContent>
        </Modal>
    );
};
