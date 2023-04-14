import React, { FC } from 'react';
import { Backdrop, Stack } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './index.module.css';

const FullScreenLoader: FC<{ loading: boolean }> = ({ loading }) => (
	<Backdrop sx={{ color: '#fff', zIndex: 99999 }} open={loading}>
		<Stack gap={2} alignItems="center">
			{/* <CircularProgress color="primary" /> */}
			<div id="loader" className={`${styles.spinner}`}></div>
		</Stack>
	</Backdrop>
);

export default FullScreenLoader;