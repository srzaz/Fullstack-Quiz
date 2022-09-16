import { useState, useEffect } from 'react';
import quizService from '../services/quiz';
import QuizForm from './QuizForm';
import Menu from './Menu';
import ShowScore from './ShowScore';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Quiz = () => {
	//User answers
	const [allAnswers, setAllAnswers] = useState(Array.apply('', Array(10)));
	//Final score
	const [score, setScore] = useState(null);
	//The quiz objects array are stored here
	const [quiz, setQuiz] = useState([]);
	//quiz timer
	const [timer, setTimer] = useState(0);
	//Name of user
	const [user, setUser] = useState(null);

	//bool value for whether the user has submitted, necessary for conditional render
	const [hasSubmitted, setHasSubmitted] = useState(false);
	//Stores the user's final answer, the correct answer, and whether the answer was correct
	const [scoreArray, setScoreArray] = useState([]);
	//Final time
	const [finalTime, setFinalTime] = useState(0);
	const [ready, setReady] = useState(false);

	//random integer for multiple choice display
	const getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	};

	useEffect(() => {
		const loggedUserJSON = window.sessionStorage.getItem('loggedQuizUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			quizService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		quizService.getQuestions().then((response) => {
			response.results.forEach((o, i) => {
				o.id = i;
				o.question = o.question.replace(/&quot;/g, '"');
				o.question = o.question.replace(/&#039;/g, "'");
				o.question = o.question.replace(/&amp;/g, '&');
			});

			//randomize answers
			const temp = response.results.map((question) => {
				if (question.type === 'multiple') {
					question.incorrect_answers.splice(
						getRandomInt(3),
						0,
						question.correct_answer
					);
				}
				question.incorrect_answers = question.incorrect_answers.map((ans) => {
					ans = ans.replace(/&quot;/g, '"');
					ans = ans.replace(/&#039;/g, "'");
					ans = ans.replace(/&amp;/g, '&');
					return ans;
				});
				return question;
			});
			setQuiz(temp);
			setReady(true);
		});
	}, []);
	//timer for quiz
	setTimeout(() => setTimer(timer + 1), 1000);

	if (!hasSubmitted && !score) {
		return (
			<div>
				<Menu />
				<Container>
					<Typography
						variant='h3'
						sx={{
							mt: 1,
							mb: 1,
							ml: 1,
							fontWeight: 'bold',
							color: 'white',
							position: 'fixed',
							left: 2,
						}}
					>
						Timer: {timer}
					</Typography>

					<div className='app'>
						<QuizForm
							quiz={quiz}
							allAnswers={allAnswers}
							setAllAnswers={setAllAnswers}
							setHasSubmitted={setHasSubmitted}
							setScore={setScore}
							setFinalTime={setFinalTime}
							setScoreArray={setScoreArray}
							timer={timer}
							ready={ready}
							user={user}
						/>
					</div>
				</Container>
			</div>
		);
	} else {
		return (
			<div>
				<Menu />
				<ShowScore
					score={score}
					name={user.username}
					time={finalTime}
					scoreArray={scoreArray}
					quiz={quiz}
				/>
			</div>
		);
	}
};

export default Quiz;
