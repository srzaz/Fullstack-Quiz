import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Notification = ({ message, isSuccess }) => {
	if (message === null) {
		return null;
	} else if (isSuccess) {
		return (
			<div>
				<Alert
					iconMapping={{
						success: <CheckCircleOutlineIcon fontSize='inherit' />,
					}}
				>
					<AlertTitle>Success</AlertTitle>
					{message}
				</Alert>
			</div>
		);
	} else {
		return (
			<div>
				<Alert severity='error'>
					<AlertTitle>Error</AlertTitle>
					{message}
				</Alert>
			</div>
		);
	}
};
export default Notification;
