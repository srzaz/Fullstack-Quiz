import React from 'react';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Results from './components/Results';
import Account from './components/Account';
import { Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<div>
			<div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/quiz' element={<Quiz />} />
					<Route path='/results' element={<Results />} />
					<Route path='/account' element={<Account />} />
				</Routes>
			</div>
		</div>
	);
};
export default App;
