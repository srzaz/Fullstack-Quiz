import React from 'react';
import quizService from '../services/quiz';
import Question from './Question.js';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Animations from './mui-styled/Animations'

const QuizForm = ({
	quiz,
	allAnswers,
	setAllAnswers,
	setHasSubmitted,
	setScore,
	setFinalTime,
	setScoreArray,
	timer,
	ready,
	user,
}) => {
	const submitAnswer = (event) => {
		event.preventDefault();
		const finalTime = timer;
		//final score array, checks whether the answer is correct
		const finalScoreArr = allAnswers.map((answer, index) => ({
			correct: answer === quiz[index].correct_answer,
			id: index,
			correct_ans: quiz[index].correct_answer,
			ans: answer,
		}));

		//submission occurred
		setHasSubmitted(true);
		//set the score array for later display
		setScoreArray(finalScoreArr);

		const finalScore = allAnswers.filter(
			(answer, index) => answer === quiz[index].correct_answer
		);

		const newResult = {
			score: finalScore.length,
			time: finalTime,
			user: user._id,
		};

		setFinalTime(finalTime);
		setScore(finalScore.length);

		//post results to json
		quizService.postResults(newResult);
		
	};

	return (
		<div className="app">
			{ready ? (
				
				<Box sx={{ width: 750 }}>
					<form onSubmit={submitAnswer}>
						<Typography variant='h5' color='white' sx={{ mt: 1, mb: 1 }}>
							Welcome, {user.username}.
						</Typography>
						<Stack
							spacing={2}
							divider={<Divider flexItem />}
							sx={{ mt: 1, mb: 1 }}
						>
							{quiz.map((question) => (
								<Card
									key={question.id}
									sx={{
										
										boxShadow: 2,
										border: 3,
										borderColor: 'black',
									}}
								>
									<Question
										question={question}
										allAnswers={allAnswers}
										setAllAnswers={setAllAnswers}
									/>
								</Card>
							))}
						</Stack>
						<Button
							type='submit'
							variant='contained'
							fullWidth
							sx={{
								mb: 5,
								mt:2,
								bgcolor: 'black',
								height: '50px',
								':hover': {
									bgcolor: '#b1ffbc', // theme.palette.primary.main
									color: 'black',
								},
							}}
						>
							Submit
						</Button>
					</form>
				</Box>
			) : (
				<Animations />
			)}
		</div>
	);
};

export default QuizForm;
