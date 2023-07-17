import React, { FC } from 'react';
import styles from './index.module.css';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { config } from '@/config';

export const FullScreenLoader: FC<{ loading: boolean }> = ({ loading }) => (

	<Modal isCentered isOpen={loading} onClose={() => null} >
		<ModalOverlay
			bg={config.fullscreeenLoader.modalBgColor}
			backdropFilter={config.fullscreeenLoader.modalBackdropFilter}
		/>
		<ModalContent className='modal-content'>
			<div id="loader" className={`${styles.spinner}`}></div>
		</ModalContent>
	</Modal>
);

