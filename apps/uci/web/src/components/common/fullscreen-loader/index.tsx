import React, { FC } from 'react';
import styles from './index.module.css';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { theme } from '@/config';

export const FullScreenLoader: FC<{ loading: boolean }> = ({ loading }) => (

	<Modal isCentered isOpen={loading} onClose={() => null} >
		<ModalOverlay
			bg={theme.modal.bgColor}
			backdropFilter={theme.modal.backdropFilter}
		/>
		<ModalContent className='modal-content'>
			<div id="loader" className={`${styles.spinner}`}></div>
		</ModalContent>
	</Modal>
);

