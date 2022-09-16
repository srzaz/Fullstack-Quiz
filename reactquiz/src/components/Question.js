import React from 'react';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const Question = ({ question, allAnswers, setAllAnswers }) => {
	//Each question has a current answer obj and state
	const [currentAnswer, setCurrentAnswer] = useState('');

	//answer handler
	const handleAnswer = (event) => {
		setCurrentAnswer(event.target.value);
		const currAnswer = event.target.value;
		//change the current answer in the full answer array
		const answersCopy = allAnswers.map((answer, index) =>
			index === question.id ? currAnswer : answer
		);
		setAllAnswers(answersCopy);
	};

	//replace string codes
	question.question = question.question.replace(/&quot;/g, '"');
	question.question = question.question.replace(/&#039;/g, "'");
	question.question = question.question.replace(/&amp;/g, '&');

	//determine the question type
	if (question.type === 'boolean') {
		return (
			<CardContent>
				<FormControl>
					<Typography variant='subtitle2'>{question.category}</Typography>
					<Typography variant='subtitle1'>{question.id + 1}. {question.question}</Typography>
					<RadioGroup value={currentAnswer} onChange={handleAnswer}>
						<FormControlLabel
							control={
								<Radio
									sx={{
										color: 'purple',
										'&.Mui-checked': {
											color: 'purple',
										},
									}}
								/>
							}
							value='True'
							label='True'
						/>
						<FormControlLabel
							control={
								<Radio
									sx={{
										color: 'purple',
										'&.Mui-checked': {
											color: 'purple',
										},
									}}
								/>
							}
							value='False'
							label='False'
						/>
					</RadioGroup>
				</FormControl>
			</CardContent>
		);
	}
	if (question.type === 'multiple') {
		return (
			<CardContent>
				<FormControl>
					<Typography variant='subtitle2'>{question.category}</Typography>
					<Typography variant='subtitle1'>{question.id + 1}. {question.question}</Typography>
					<RadioGroup value={currentAnswer} onChange={handleAnswer}>
						<Stack
							direction='row'
							divider={<Divider orientation='vertical' flexItem />}
							spacing={2}
						>
							{question.incorrect_answers.map((q, i) => (
								<FormControlLabel
									key={i}
									control={
										<Radio
											sx={{
												color: 'purple',
												'&.Mui-checked': {
													color: 'purple',
												},
											}}
										/>
									}
									value={q}
									label={q}
								/>
							))}
						</Stack>
					</RadioGroup>
				</FormControl>
			</CardContent>
		);
	}
};

export default Question;
