import React, { FC } from 'react';
import styles from './index.module.css';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import config from './config.json';

const FullScreenLoader: FC<{ loading: boolean }> = ({ loading }) => {
  const { modal, modalContent } = config;

  return (
    <Modal isCentered={modal.isCentered} isOpen={loading} onClose={() => null}>
      <ModalOverlay bg={modal.background} backdropFilter={modal.backdropFilter} />
      <ModalContent style={modalContent}>
        <div id="loader" className={`${styles.spinner}`}></div>
      </ModalContent>
    </Modal>
  );
};

export default FullScreenLoader;
