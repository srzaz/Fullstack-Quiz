import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Menu = () => {
	const style = {
		paddingRight: 5,
		textDecoration: 'none',
		color: 'white',
	};
	return (
		<AppBar
			position='static'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				boxShadow: 20,
				backgroundColor: 'rgba(0, 0, 0,0.5)',
			}}
		>
			<Container
				sx={{
					justifyContent: 'center',
					display: 'flex',
					mb: 1,
					mt: 1,
				}}
			>
				<Link style={style} to='/'>
					<Typography
						variant='h4'
						sx={{
							flexGrow: 1,
							float: 'left',
							ml: 5,
							fontWeight: 'bold',
							textShadow: '2px 2px black',
							transition: '0.2s',
							':hover': {
								color: '#b1ffbc',
								position: 'relative',
								top: 1,
								right: 1,
								textShadow: '3px 3px black',
							},
						}}
					>
						Home
					</Typography>
				</Link>
				<Link style={style} to='/quiz'>
					<Typography
						variant='h4'
						sx={{
							flexGrow: 1,
							float: 'left',
							ml: 5,
							fontWeight: 'bold',
							textShadow: '2px 2px black',
							transition: '0.2s',
							':hover': {
								color: '#b1ffbc',
								position: 'relative',
								top: 1,
								left: 1,
								textShadow: '3px 3px black',
							},
						}}
					>
						Quiz
					</Typography>
				</Link>
				<Link style={style} to='/results'>
					<Typography
						variant='h4'
						sx={{
							flexGrow: 1,
							float: 'left',
							ml: 5,
							fontWeight: 'bold',
							textShadow: '2px 2px black',
							transition: '0.2s',
							':hover': {
								color: '#b1ffbc',
								position: 'relative',
								top: 1,
								left: 1,
								textShadow: '3px 3px black',
							},
						}}
					>
						Results
					</Typography>
				</Link>
				<Link style={style} to='/account'>
					<Typography
						variant='h4'
						sx={{
							flexGrow: 1,
							float: 'left',
							ml: 5,
							fontWeight: 'bold',
							textShadow: '2px 2px black',
							transition: '0.2s',
							':hover': {
								color: '#b1ffbc',
								position: 'relative',
								top: 1,
								left: 1,
								textShadow: '3px 3px black',
							},
						}}
					>
						Account
					</Typography>
				</Link>
			</Container>
		</AppBar>
	);
};

export default Menu;
