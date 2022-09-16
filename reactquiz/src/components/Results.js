import resultService from '../services/results';
import Menu from './Menu';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import quizService from '../services/quiz';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

const Results = () => {
	const [results, setResults] = useState([]);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const loggedUserJSON = window.sessionStorage.getItem('loggedQuizUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			quizService.setToken(user.token);
			resultService.getResults().then((response) => setResults(response));
		} else {
			window.sessionStorage.clear();
			quizService.setToken(null);
			setUser(null);
			navigate('/');
		}
	}, []);

	const columns = [
		{ field: 'id', headerName: 'ID', width: 100 },
		{
			field: 'user',
			headerName: 'Username',
			width: 150,
			valueGetter: (params) => {
				return params.value.username;
			},
		},
		{
			field: 'score',
			headerName: 'Score',
			width: 150,
		},
		{
			field: 'time',
			headerName: 'Time',
			width: 150,
		},
		{
			field: 'date',
			headerName: 'Date',
			width: 200,
		},
	];

	return (
		<div>
			<Menu />
			{user === null ? (
				<div> </div>
			) : (
				<div>
					<Container sx={{ justifyContent: 'center', display: 'flex', mt:3 }}>
						<Stack spacing={2} justifyContent='center' alignItems='center'>
							<Typography variant='h2' color='white'>Results</Typography>

							<Box sx={{ height: 500, width: 750, backgroundColor: 'white' }}>
								<DataGrid
									rows={results}
									columns={columns}
									pageSize={5}
									rowsPerPageOptions={[5]}
									disableSelectionOnClick
									sx={{
										boxShadow: 20,
										border: 3,
										borderColor: 'black',
										'& .MuiDataGrid-cell:hover': {
											color: 'purple',
										},
									}}
								/>
							</Box>
						</Stack>
					</Container>
				</div>
			)}
		</div>
	);
};

export default Results;
