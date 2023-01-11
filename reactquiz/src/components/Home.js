import { useState, useEffect } from 'react';
import Notification from './Notification';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import userService from '../services/user';
import quizService from '../services/quiz';
import loginService from '../services/login';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const Home = () => {
	const [message, setMessage] = useState(null);
	const [isSuccess, setSuccess] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [register, setRegister] = useState(false);
	const [name, setName] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const loggedUserJSON = window.sessionStorage.getItem('loggedQuizUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			quizService.setToken(user.token);
		} else {
			window.sessionStorage.clear();
			quizService.setToken(null);
			setUser(null);
			navigate('/');
		}
	}, []);

	const handleRegistration = async (event) => {
		event.preventDefault();

		try {
			const user = await userService.register({ username, name, password });
			console.log(user);
			setMessage(
				`${user.username} has been successfully registered. You are now able to login.`
			);
			setSuccess(true);
			setTimeout(() => {
				setMessage(null);
				setSuccess(true);
			}, 5000);
			setUsername('');
			setPassword('');
			setName('');
		} catch (exception) {
			setMessage('Invalid registration');
			setSuccess(false);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			setUsername('');
			setPassword('');
			setName('');
		}
	};

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });

			window.sessionStorage.setItem('loggedQuizUser', JSON.stringify(user));

			quizService.setToken(user.token);
			setMessage(`${user.username} has logged in successfully`);
			setSuccess(true);
			setTimeout(() => {
				setMessage(null);
				setSuccess(true);
			}, 5000);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setMessage('Wrong username/password');
			setSuccess(false);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			setUsername('');
			setPassword('');
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();

		try {
			window.sessionStorage.clear();
			quizService.setToken(null);
			setUser(null);
			setUsername('');
			setPassword('');
			setSuccess(true);
			setMessage(`${user.username} has logged out successfully`);
			navigate('/');
			setTimeout(() => {
				setMessage(null);
				setSuccess(true);
			}, 5000);
		} catch (exception) {
			setSuccess(false);
			setMessage('Error logging out, please refresh this page.');
			setTimeout(() => {
				setMessage(null);
				setSuccess(true);
			}, 5000);
		}
	};
	return (
		<div>
			<Notification message={message} isSuccess={isSuccess} />
			{user === null ? (
				register === false ? (
					<div>
						<Container
							sx={{
								justifyContent: 'center',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Stack>
								<LoginForm
									username={username}
									password={password}
									handleUsernameChange={({ target }) =>
										setUsername(target.value)
									}
									handlePasswordChange={({ target }) =>
										setPassword(target.value)
									}
									handleLogin={handleLogin}
								/>

								<Button
									variant='contained'
									onClick={() => {
										setRegister(true);
										setUsername('');
										setPassword('');
									}}
									sx={{
										mb: 1,
										bgcolor: 'black',
										':hover': {
											bgcolor: '#ec87c0', // theme.palette.primary.main
											color: 'black',
										},
									}}
								>
									register
								</Button>
							</Stack>
						</Container>
					</div>
				) : (
					<div>
						<Container sx={{ justifyContent: 'center', display: 'flex' }}>
							<Stack>
								<RegistrationForm
									username={username}
									password={password}
									name={name}
									handleUsernameChange={({ target }) =>
										setUsername(target.value)
									}
									handlePasswordChange={({ target }) =>
										setPassword(target.value)
									}
									handleNameChange={({ target }) => setName(target.value)}
									handleRegistration={handleRegistration}
								/>
								<Button
									variant='contained'
									sx={{
										mb: 1,
										bgcolor: 'black',
										':hover': {
											bgcolor: '#ec87c0',
											color: 'black',
										},
									}}
									onClick={() => {
										setRegister(false);
										setUsername('');
										setPassword('');
										setName('');
									}}
								>
									cancel
								</Button>
							</Stack>
						</Container>
					</div>
				)
			) : (
				<div>
					<Menu />
					<div className='app'>
						<Box sx={{ width: 750, padding: '10px', margin: '10px' }}>
							<Card
								sx={{
									marginTop: '10px',
									boxShadow: 2,
									border: 3,
									borderColor: 'black',
									padding: '10px',
								}}
							>
								<Container
									sx={{
										justifyContent: 'center',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Stack>
										<div>
											<Typography variant='h2' sx={{ fontSize: '2.125rem' }}>
												Welcome to 10 Questions, {user.name}. 10 random
												questions pulled from opendtb.com. Uses React and
												Material UI for frontend. Nodejs and Mongoose for
												backend.
											</Typography>
										</div>
									</Stack>
								</Container>
							</Card>
						</Box>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
