import React, { FC } from 'react';
import styles from './index.module.css';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

export const FullScreenLoader: FC<{ loading: boolean }> = ({ loading }) => (
    <Modal isCentered isOpen={loading} onClose={() => null}>
        <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent className={`${styles.modalContent}`}>
            <div id="loader" className={`${styles.spinner}`}></div>
        </ModalContent>
    </Modal>
);
