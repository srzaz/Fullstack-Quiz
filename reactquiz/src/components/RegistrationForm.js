import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

const RegistrationForm = ({
	handleRegistration,
	handleUsernameChange,
	handlePasswordChange,
	handleNameChange,
	name,
	username,
	password,
}) => {
	return (
		<div>
			<Container sx={{ justifyContent: 'center', display: 'flex' }}>
				<Stack justifyContent='center' alignItems='center'>
					<Avatar
						sx={{
							m: 1,
							bgcolor: 'black',
						}}
					>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						component='h2'
						variant='h5'
						color='black'
						textAlign='center'
					>
						Register
					</Typography>
				</Stack>
			</Container>
			<Box component='form' onSubmit={handleRegistration} sx={{ mt: 1 }}>
				<TextField
					margin='normal'
					required
					fullWidth
					autoFocus
					id='name'
					type='text'
					value={name}
					name='Name'
					label='name'
					onChange={handleNameChange}
				/>

				<TextField
					margin='normal'
					required
					fullWidth
					autoFocus
					id='username'
					type='text'
					value={username}
					name='Username'
					label='username'
					onChange={handleUsernameChange}
				/>

				<TextField
					margin='normal'
					required
					fullWidth
					autoFocus
					id='password'
					type='password'
					value={password}
					name='Password'
					label='password'
					onChange={handlePasswordChange}
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					autoFocus
					id='password'
					type='password'
					value={password}
					name='Password'
					label='password'
					onChange={handlePasswordChange}
				/>
				<Button
					variant='contained'
					sx={{
						mb: 1,
						bgcolor: 'black',
						':hover': {
							bgcolor: '#b1ffbc',
							color: 'black',
						},
					}}
					type='submit'
					fullWidth
				>
					register
				</Button>
			</Box>
		</div>
	);
};

RegistrationForm.propTypes = {
	handleRegistration: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	handleNameChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
};

export default RegistrationForm;
