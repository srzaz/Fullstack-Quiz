import React from 'react';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const QuestionScore = ({ question, scoreArray }) => {
	//multiple choice score check
	if (question.type === 'multiple') {
		if (scoreArray[question.id].correct === false) {
			return (
				<div>
					<Card>
						<CardContent>
							<Typography variant='subtitle2'>{question.category}</Typography>
							<Typography variant='subtitle1'>{question.id + 1}. {question.question}</Typography>
							<Stack
								direction='row'
								divider={<Divider orientation='vertical' flexItem />}
								spacing={2}
							>
								{question.incorrect_answers.map((ans, i) => (
									<>
										{ans === question.correct_answer && (
											<Alert
												icon={false}
												severity='success'
												key={i}
												sx={{ mt: 1, mb: 1 }}
											>
												{ans}
											</Alert>
										)}
										{ans === scoreArray[question.id].ans && (
											<Alert
												icon={false}
												severity='error'
												key={i}
												sx={{ mt: 1, mb: 1 }}
											>
												{ans}
											</Alert>
										)}
										{ans !== scoreArray[question.id].ans &&
											ans !== question.correct_answer && (
												<Typography key={i}>{ans}</Typography>
											)}
									</>
								))}
							</Stack>
						</CardContent>
					</Card>
				</div>
			);
		} else {
			return (
				<div>
					<Card>
						<CardContent>
							<Typography variant='subtitle2'>{question.category}</Typography>
							<Typography variant='subtitle1'>{question.id + 1}. {question.question}</Typography>
							<Stack
								direction='row'
								divider={<Divider orientation='vertical' flexItem />}
								spacing={2}
							>
								{question.incorrect_answers.map((ans, i) =>
									ans === question.correct_answer ? (
										<Alert
											icon={false}
											severity='success'
											key={i}
											sx={{ mt: 1, mb: 1 }}
										>
											{ans}
										</Alert>
									) : (
										<Typography key={i}>{ans}</Typography>
									)
								)}
							</Stack>
						</CardContent>
					</Card>
				</div>
			);
		}
	}

	//bool score check
	if (question.type === 'boolean') {
		if (question.ans === 'True') {
			if (question.correct === true) {
				return (
					<div>
						<Card>
							<CardContent>
								<Typography variant='subtitle2'>{question.category}</Typography>
								<Typography variant='subtitle1'>{question.question}</Typography>
								<Alert icon={false} severity='success' sx={{ mt: 1, mb: 1 }}>
									True
								</Alert>
								<Typography>False</Typography>
							</CardContent>
						</Card>
					</div>
				);
			} else {
				return (
					<div>
						<Card>
							<CardContent>
								<Typography variant='subtitle2'>{question.category}</Typography>
								<Typography variant='subtitle1'>{question.question}</Typography>
								<Alert icon={false} severity='success' sx={{ mt: 1, mb: 1 }}>
									True
								</Alert>
								<Alert icon={false} severity='error' sx={{ mt: 1, mb: 1 }}>
									False
								</Alert>
							</CardContent>
						</Card>
					</div>
				);
			}
		} else {
			if (question.correct === true) {
				return (
					<div>
						<Card>
							<CardContent>
								<Typography variant='subtitle2'>{question.category}</Typography>
								<Typography variant='subtitle1'>{question.question}</Typography>
								<Typography>True</Typography>
								<Alert icon={false} severity='success' sx={{ mt: 1, mb: 1 }}>
									False
								</Alert>
							</CardContent>
						</Card>
					</div>
				);
			} else {
				return (
					<div>
						<Card>
							<CardContent>
								<Typography variant='subtitle2'>{question.category}</Typography>
								<Typography variant='subtitle1'>{question.question}</Typography>

								<Typography>True</Typography>
								<Alert icon={false} severity='success' sx={{ mt: 1, mb: 1 }}>
									False
								</Alert>
							</CardContent>
						</Card>
					</div>
				);
			}
		}
	}
};

const ShowScore = ({ score, name, time, scoreArray, quiz }) => {
	return (
		<div>
			<Container sx={{ justifyContent: 'center' }}>
				<Typography variant='h5' sx={{ color: 'white', mb: 2, mt: 2 }}>
					Congratulations, {name}! You got {score} correct in {time} seconds!
				</Typography>
				<Stack spacing={2} divider={<Divider flexItem />} sx={{ mb: 3 }}>
					{quiz.map((question) => (
						<Card
							key={question.id}
							sx={{ mb: 1.5, boxShadow: 2, border: 3, borderColor: 'black' }}
						>
							<QuestionScore
								id={question.id}
								question={question}
								scoreArray={scoreArray}
							/>
						</Card>
					))}
				</Stack>
			</Container>
		</div>
	);
};

export default ShowScore;
